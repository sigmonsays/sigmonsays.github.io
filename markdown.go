package main

import (
	"strings"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"go.abhg.dev/goldmark/wikilink"

	htmlr "github.com/yuin/goldmark/renderer/html"
)

// converts markdown to HTML
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
