package main

import (
	"bytes"
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/sigmonsays/website/site"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"go.abhg.dev/goldmark/wikilink"
	"gopkg.in/yaml.v3"

	"github.com/a-h/templ"

	htmlr "github.com/yuin/goldmark/renderer/html"
)

// parseFrontMatter extracts YAML front matter and the remaining markdown content.
func parseFrontMatter(md []byte) (*site.FrontMatter, []byte, error) {
	fm := &site.FrontMatter{}

	content := bytes.TrimSpace(md)
	if !bytes.HasPrefix(content, []byte("---")) {
		return fm, md, nil // no front matter, return as-is
	}

	parts := bytes.SplitN(content, []byte("---"), 3)
	if len(parts) < 3 {
		return fm, md, nil // malformed front matter
	}

	fmData := bytes.TrimSpace(parts[1])
	body := bytes.TrimSpace(parts[2])

	if err := yaml.Unmarshal(fmData, &fm); err != nil {
		return fm, md, fmt.Errorf("parse front matter: %w", err)
	}

	return fm, body, nil
}

func markdownToHTML(md []byte) (string, error) {
	mdr := goldmark.New(
		goldmark.WithExtensions(
			extension.GFM,
			&wikilink.Extender{},
		),
		goldmark.WithRendererOptions(htmlr.WithUnsafe()),
	)
	var sb strings.Builder
	if err := mdr.Convert(md, &sb); err != nil {
		return "", err
	}
	return sb.String(), nil
}

func renderPageIndex(ctx context.Context, sitemd *site.Site, title string) (string, error) {
	comp := site.Index(*sitemd, title)
	out, err := templ.ToGoHTML(ctx, comp)
	if err != nil {
		return "", err
	}
	return string(out), nil
}

func renderPage(ctx context.Context, sitemd *site.Site, title string, body string) (string, error) {
	comp := site.Page(*sitemd, title, body)
	out, err := templ.ToGoHTML(ctx, comp)
	if err != nil {
		return "", err
	}
	return string(out), nil
}

func main() {

	devServer := false
	inDir := "content"
	outDir := "public"
	flag.BoolVar(&devServer, "dev", devServer, "dev start")
	flag.Parse()

	err := genSite(inDir, outDir)
	if err != nil {
		log.Fatalf("GenServer %s", err)
	}

	if devServer {
		fs := http.FileServer(http.Dir(outDir))
		http.Handle("/", fs)

		log.Println("Serving on http://localhost:8080 ...")
		err := http.ListenAndServe(":8080", nil)
		if err != nil {
			log.Fatal(err)
		}

	}
}

func GetPages(dir string) ([]*site.PageMetadata, error) {
	ret := make([]*site.PageMetadata, 0)
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	for _, e := range entries {
		if e.IsDir() || !strings.HasSuffix(e.Name(), ".md") {
			continue
		}

		srcPath := filepath.Join(dir, e.Name())
		md, err := os.ReadFile(srcPath)
		if err != nil {
			log.Printf("read %s: %v", srcPath, err)
			continue
		}

		// Parse front matter
		fm, bodyMD, err := parseFrontMatter(md)
		if err != nil {
			log.Printf("front matter %s: %v", srcPath, err)
			continue
		}

		// todo: Support relative paths in sub directories
		pageUrl := "/" + strings.TrimSuffix(e.Name(), ".md")

		page := &site.PageMetadata{
			Filename:    srcPath,
			Url:         pageUrl,
			Title:       fm.Title,
			Markdown:    bodyMD,
			FrontMatter: fm,
		}
		ret = append(ret, page)
	}

	return ret, nil
}

func genSite(inDir, outDir string) error {
	ctx := context.Background()

	err := os.MkdirAll(outDir, 0755)
	if err != nil {
		return err
	}

	pages, err := GetPages(inDir)
	if err != nil {
		return err
	}

	siteObj := &site.Site{
		Pages: pages,
	}

	// generate index
	buf, err := renderPageIndex(ctx, siteObj, "sigmonsays")
	if err != nil {
		return err
	}
	outfile := filepath.Join(outDir, "index.html")
	err = os.WriteFile(outfile, []byte(buf), 0644)
	if err != nil {
		return err
	}

	// populate tags from all markdown files
	tags := make(map[string]int, 0)
	for _, page := range pages {
		for _, tag := range page.FrontMatter.Tags {
			count, _ := tags[tag]
			tags[tag] = count + 1
		}
	}
	for tag, count := range tags {
		siteObj.AllTags = append(siteObj.AllTags, tag)
		fmt.Printf("tag:%s page-count:%d\n", tag, count)
	}

	for _, page := range pages {
		srcPath := page.Filename

		body, err := markdownToHTML(page.Markdown)
		if err != nil {
			log.Printf("markdown convert %s: %v", srcPath, err)
			continue
		}

		htmlStr, err := renderPage(ctx, siteObj, page.FrontMatter.Title, body)
		if err != nil {
			log.Printf("render page %s: %v", srcPath, err)
			continue
		}

		outName := strings.TrimSuffix(filepath.Base(page.Filename), ".md") + ".html"
		outPath := filepath.Join(outDir, outName)
		if err := os.WriteFile(outPath, []byte(htmlStr), 0644); err != nil {
			log.Printf("write %s: %v", outPath, err)
			continue
		}
		fmt.Printf("wrote %s\n", outPath)
	}
	return nil
}
