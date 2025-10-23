package site

import (
	"slices"
	"strings"
)

type Site struct {
	AllTags []string
	Pages   []*PageMetadata
	TagSet  map[string]*TagSet
}

// sort by date, newest at top
func SortPages(pages []*PageMetadata) []PageMetadata {
	ret := make([]PageMetadata, 0)
	for _, page := range pages {
		ret = append(ret, *page)
	}

	slices.SortFunc(ret, func(a, b PageMetadata) int {
		return strings.Compare(b.FrontMatter.Date, a.FrontMatter.Date)
	})

	return ret
}

func (me *Site) GetPages(max int) []PageMetadata {
	ret := SortPages(me.Pages)
	if max == 0 || len(ret) < max {
		return ret
	}

	return ret[:max]
}

type TagSet struct {
	Tag   string
	Pages []*PageMetadata
}

func (me *TagSet) GetPages() []PageMetadata {
	return SortPages(me.Pages)
}

type PageMetadata struct {
	ID          string
	Filename    string
	RelPath     string
	Url         string
	Title       string
	FrontMatter *FrontMatter
	Markdown    []byte
}

type FrontMatter struct {
	Title   string   `yaml:"title"`
	Summary string   `yaml:"summary"`
	Date    string   `yaml:"date"`
	Tags    []string `yaml:"tags"`
}
