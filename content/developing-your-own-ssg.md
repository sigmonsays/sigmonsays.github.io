---
title: "developing your own SSG"
date: 2026/03/13
draft: true
tags: [ "ssg", "golang" ]
---

developing your own SSG with go is actually really simple when you leverage existing libraries

# High level steps

<!-- mtoc-start -->

* [Collect pages](#collect-pages)
* [Parse Frontmatter](#parse-frontmatter)
* [Convert Markdown to HTML](#convert-markdown-to-html)
* [Render the site](#render-the-site)

<!-- mtoc-end -->

# Collect pages

Read every page and its frontmatter into an array and return it

```go
func GetPages(rootdir, dir string, includeDrafts bool) ([]*site.PageMetadata, error) {
	ret := make([]*site.PageMetadata, 0)
	entries := make([]*site.FileEntry, 0)
	walkfn := func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return nil
		}

		e := &site.FileEntry{
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

		// skip pages without a title
		if fm.Title == "" {
			log.Printf("skipping page without title %s", ent.Path)
			continue
		}

		relPath, err := filepath.Rel(rootdir, ent.Path)
		if err != nil {
			fmt.Printf("ERROR: RelPath: %s", err)
		}

		pageId := strings.TrimSuffix(relPath, ".md")
		pageUrl := "/" + pageId + ".html"

		page := &site.PageMetadata{
			FileEntry:   ent,
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


```
# Parse Frontmatter

Parsing the frontmatter is a simple step but it allows you to extract key metadata from the header
of each markdown file. This gives you a spot to store page title, date, tags, draft flag, or anything
else you imagine.


```go

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

        fm.SetDefaults()

        return fm, body, nil
    }
```


# Convert Markdown to HTML

This function converts the markdown to HTML

```go
// converts markdown to HTML
func markdownToHTML(md []byte) (string, error) {
	mdr := goldmark.New(
		goldmark.WithParserOptions(
			parser.WithAutoHeadingID(), // read note
		),
		goldmark.WithExtensions(
			extension.GFM,
			&wikilink.Extender{},
			&anchor.Extender{
				Texter: anchor.Text("_"),
			},
		),
		goldmark.WithRendererOptions(htmlr.WithUnsafe()),
	)
	var sb strings.Builder
	if err := mdr.Convert(md, &sb); err != nil {
		return "", err
	}
	return sb.String(), nil
}
```

# Render the site

Putting it all together requires some extra steps to handle tags and directory indexes but we could easily gut those features
if need be.

See here for full code https://github.com/sigmonsays/website-ssg-template/blob/dev/website/gensite.go

we basically loop each page and render its markdown, writing the HTML out

```go

	// write each page html
	for _, page := range pages {

		body, err := markdownToHTML(page.Markdown)
		if err != nil {
			log.Printf("markdown convert %s: %v", page.Filename, err)
			continue
		}
		switch page.FrontMatter.Layout {
		case "page":
			err = siteRender.WritePage(ctx, page, page.FrontMatter.Title, body)
			if err != nil {
				log.Printf("render page %s: %v", page.Filename, err)
				continue
			}
		case "directory":
			dir := filepath.Join(inDir, page.FrontMatter.Directory)
			err = siteRender.WriteDirectory(ctx, page, page.FrontMatter.Title, body, dir)
			if err != nil {
				log.Printf("render directory %s: %v", page.Filename, err)
				continue
			}
		}

	}
```

Finally there is some additional methods to
- write a index page
- write a directory listing page
- write an archive page
- write a page per tag
- write a tags page
