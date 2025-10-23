package site

import "sort"

func (me *Site) GetPages(max int) []PageMetadata {
	ret := SortPages(me.Pages)
	if max == 0 || len(ret) < max {
		return ret
	}

	return ret[:max]
}

func (me *Site) GetTags() []string {
	ret := make([]string, 0)
	for tag, _ := range me.TagSet {
		ret = append(ret, tag)
	}
	sort.Strings(ret)
	return ret
}
