package site

import (
	"io/fs"
	"slices"
	"strings"
)

type FileEntry struct {
	Path string
	Info fs.FileInfo
}

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

type TagSet struct {
	Tag   string
	Pages []*PageMetadata
}

func (me *TagSet) GetPages() []PageMetadata {
	return SortPages(me.Pages)
}

type FrontMatter struct {
	Title     string   `yaml:"title"`
	Summary   string   `yaml:"summary"`
	Date      string   `yaml:"date"`
	Draft     bool     `yaml:"draft"`
	SkipIndex bool     `yaml:"skip_index"`
	Tags      []string `yaml:"tags"`
	Layout    string
	Directory string
}

func (me *FrontMatter) SetDefaults() {
	if me.Layout == "" {
		me.Layout = "page"
	}
}
