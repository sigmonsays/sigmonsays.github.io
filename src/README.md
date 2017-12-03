
- docs - http://hugo.spf13.com/overview/quickstart/

   - using with github - http://hugo.spf13.com/tutorials/github_pages_blog

install
------------------
- install hugo
  go get github.com/spf13/hugo

- themes
   git clone --recursive https://github.com/spf13/hugoThemes themes

basics
------------------

- make a new file
   hugo new post/first.md


- dev server

   hugo server --theme=hyde --buildDrafts

directory layout
------------------

This directory is src

    src
      ├── archetypes
      ├── content
      │   ├── notes
      │   ├── post
      │   └── static
      ├── layouts
      ├── post -> content/post/
      ├── static
      └── themes
          └── hyde
              ├── archetypes
              ├── images
              ├── layouts
              │   ├── archive
              │   ├── _default
              │   └── partials
              └── static
                  └── css

      18 directories


