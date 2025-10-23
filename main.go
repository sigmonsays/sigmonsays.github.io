package main

import (
	"bytes"
	"context"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/sigmonsays/website/site"
	"gopkg.in/yaml.v3"

	"github.com/a-h/templ"
)

type SiteRender struct {
	OutDir string
	Site   *site.Site
}

func (me *SiteRender) WriteComponent(ctx context.Context, c templ.Component, filename string) error {
	out, err := templ.ToGoHTML(ctx, c)
	if err != nil {
		return err
	}
	// create leading directory
	dir := filepath.Dir(filename)
	os.MkdirAll(dir, 0755)

	err = os.WriteFile(filename, []byte(out), 0644)
	if err != nil {
		return err
	}
	fmt.Printf("wrote %s\n", filename)
	return nil
}

func (me *SiteRender) WriteIndexPage(ctx context.Context, title string) error {
	outfile := filepath.Join(me.OutDir, "index.html")
	comp := site.Index(*me.Site, title)
	return me.WriteComponent(ctx, comp, outfile)
}

func (me *SiteRender) WriteArchivePage(ctx context.Context, title string) error {
	outfile := filepath.Join(me.OutDir, "archive.html")
	comp := site.Archive(*me.Site, title)
	return me.WriteComponent(ctx, comp, outfile)
}

func (me *SiteRender) WriteTagPage(ctx context.Context, tag string, pages []site.PageMetadata) error {
	outfile := filepath.Join(me.OutDir, "tag", tag+".html")
	comp := site.PagesWithTag(*me.Site, pages, tag)
	return me.WriteComponent(ctx, comp, outfile)
}

func (me *SiteRender) WritePage(ctx context.Context, page *site.PageMetadata, title string, body string) error {
	outName := strings.TrimSuffix(page.RelPath, ".md") + ".html"
	outfile := filepath.Join(me.OutDir, outName)
	comp := site.Page(*me.Site, *page, title, body)
	return me.WriteComponent(ctx, comp, outfile)
}

func main() {

	devServer := false
	inDir := "content"
	outDir := "docs"
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

type FileEntry struct {
	Path string
	Info fs.FileInfo
}

func GetPages(dir string) ([]*site.PageMetadata, error) {
	ret := make([]*site.PageMetadata, 0)
	entries := make([]*FileEntry, 0)
	walkfn := func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return nil
		}
		e := &FileEntry{
			Path: path,
			Info: info,
		}
		entries = append(entries, e)
		return nil
	}
	err := filepath.Walk(dir, walkfn)
	if err != nil {
		return nil, err
	}

	for _, ent := range entries {
		e := ent.Info
		if e.IsDir() || !strings.HasSuffix(e.Name(), ".md") {
			continue
		}

		md, err := os.ReadFile(ent.Path)
		if err != nil {
			log.Printf("read %s: %v", ent.Path, err)
			continue
		}

		// Parse front matter
		fm, bodyMD, err := parseFrontMatter(md)
		if err != nil {
			log.Printf("front matter %s: %v", ent.Path, err)
			continue
		}

		relPath, err := filepath.Rel(dir, ent.Path)
		if err != nil {
			fmt.Printf("ERROR: RelPath: %s", err)
		}

		pageId := strings.TrimSuffix(relPath, ".md")
		pageUrl := "/" + pageId + ".html"

		page := &site.PageMetadata{
			Filename:    ent.Path,
			RelPath:     relPath,
			ID:          pageId,
			Url:         pageUrl,
			Title:       fm.Title,
			Markdown:    bodyMD,
			FrontMatter: fm,
		}
		fmt.Printf("Page %s Url:%q RelPath:%q\n",
			page.Filename, page.Url, page.RelPath)
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
		Pages:  pages,
		TagSet: make(map[string]*site.TagSet, 0),
	}

	siteRender := &SiteRender{
		OutDir: outDir,
		Site:   siteObj,
	}

	// build tag mapping
	for _, page := range pages {
		for _, tag := range page.FrontMatter.Tags {
			tagset, found := siteObj.TagSet[tag]
			if !found {
				tagset = &site.TagSet{
					Tag: tag,
				}
				siteObj.TagSet[tag] = tagset
			}
			tagset.Pages = append(tagset.Pages, page)
		}
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

	// write each page html
	for _, page := range pages {

		body, err := markdownToHTML(page.Markdown)
		if err != nil {
			log.Printf("markdown convert %s: %v", page.Filename, err)
			continue
		}

		err = siteRender.WritePage(ctx, page, page.FrontMatter.Title, body)
		if err != nil {
			log.Printf("render page %s: %v", page.Filename, err)
			continue
		}

	}

	// generate index
	err = siteRender.WriteIndexPage(ctx, "sigmonsays")
	if err != nil {
		return err
	}

	// generate archive
	err = siteRender.WriteArchivePage(ctx, "archive")
	if err != nil {
		return err
	}

	// generate a page for each tag
	for tag, tagset := range siteObj.TagSet {

		err := siteRender.WriteTagPage(ctx, tag, tagset.GetPages())
		if err != nil {
			return err
		}

	}

	return nil
}

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
