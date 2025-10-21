package site

type Site struct {
	AllTags []string
	Pages   []*PageMetadata
}

type PageMetadata struct {
	Filename    string
	Url         string
	Title       string
	FrontMatter *FrontMatter
	Markdown    []byte
}

type FrontMatter struct {
	Title       string   `yaml:"title"`
	Description string   `yaml:"description"`
	Date        string   `yaml:"date"`
	Tags        []string `yaml:"tags"`
}
