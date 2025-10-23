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
	Verbose       bool
	includeDrafts bool
	InDir         string
	OutDir        string
	Site          *site.Site
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
	if me.Verbose {
		fmt.Printf("wrote %s\n", filename)
	}
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

func (me *SiteRender) WriteDirectoryIndexPage(ctx context.Context, inDir, outDir string) error {
	relDir, err := filepath.Rel(me.InDir, inDir)
	if err != nil {
		return err
	}
	outfile := filepath.Join(me.OutDir, relDir, "index.html")
	//log.Printf("Write directory index %s", outfile)
	title := fmt.Sprintf("%s", relDir)
	_pages, err := GetPages(me.InDir, inDir, me.includeDrafts)
	if err != nil {
		return err
	}
	pages := site.SortPages(_pages)

	comp := site.DirectoryIndex(*me.Site, title, pages)
	return me.WriteComponent(ctx, comp, outfile)
}

func (me *SiteRender) WriteTagsIndex(ctx context.Context, title string) error {
	outfile := filepath.Join(me.OutDir, "tags.html")
	comp := site.TagIndex(*me.Site, title)
	return me.WriteComponent(ctx, comp, outfile)
}

type Options struct {
	Verbose   bool
	DevServer bool
	InDir     string
	OutDir    string
	BindAddr  string
}

func main() {

	gen := false
	opts := &Options{
		OutDir:   "docs",
		InDir:    "content",
		BindAddr: ":8888",
	}

	flag.StringVar(&opts.InDir, "in", opts.InDir, "input directory")
	flag.StringVar(&opts.OutDir, "out", opts.OutDir, "output directory")
	flag.BoolVar(&opts.DevServer, "dev", opts.DevServer, "start dev server")
	flag.BoolVar(&gen, "gen", gen, "generate and exit")
	flag.BoolVar(&opts.Verbose, "verbose", opts.Verbose, "be verbose")
	flag.StringVar(&opts.BindAddr, "bind", opts.BindAddr, "dev http server bind address")
	flag.Parse()

	err := genSite(opts)
	if err != nil {
		log.Fatalf("GenServer %s", err)
	}

	if gen {
		log.Printf("exiting after generation.")
		os.Exit(0)
	}

	if opts.DevServer {
		log.Printf("Serving %s on %s ...", opts.OutDir, opts.BindAddr)
		fs := http.FileServer(http.Dir(opts.OutDir))
		http.Handle("/", fs)

		err := http.ListenAndServe(opts.BindAddr, nil)
		if err != nil {
			log.Fatalf("ListenAndServe: %s: %s", opts.BindAddr, err)
		}
	}
}

type FileEntry struct {
	Path string
	Info fs.FileInfo
}

func GetPages(rootdir, dir string, includeDrafts bool) ([]*site.PageMetadata, error) {
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

		if includeDrafts == false && fm.Draft == true {
			log.Printf("skipping draft page %s", ent.Path)
			continue

		}

		relPath, err := filepath.Rel(rootdir, ent.Path)
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
		// fmt.Printf("Page %s Url:%q RelPath:%q\n",
		// 	page.Filename, page.Url, page.RelPath)
		ret = append(ret, page)
	}

	return ret, nil
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
