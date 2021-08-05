.PHONY: post

#THEME = ananke
THEME = ananke

#HUGO = $(HOME)/go/bin/hugo
#HUGO = /usr/local/bin/hugo
HUGO = ./bin/hugo

#HUGO_URL = https://github.com/gohugoio/hugo/releases/download/v0.87.0/hugo_0.87.0_Linux-64bit.tar.gz
HUGO_URL_BASE = https://github.com/gohugoio/hugo/releases/download
HUGO_URL = $(HUGO_URL_BASE)/v0.87.0/hugo_extended_0.87.0_Linux-64bit.tar.gz
HUGO_BASENAME = hugo_extended_0.87.0_Linux-64bit.tar.gz
#HUGO_FLAGS := --baseURL http://192.168.33.2

help:
	#
	# gen          generate hugo website
	# clean        clean up output data
	# dev          start dev server
	# post         create a new post
	# commit       commit code changes
	# publish (p)  gen and commit
	#
	#
	# you likely want 'make p' (make publish)
gen: $(HUGO)
	@echo building site..
	$(HUGO) -t $(THEME) -d ./docs
	git add -A docs
	git status
	@echo


dev:
	git status
	$(HUGO) server $(HUGO_FLAGS) --bind 0.0.0.0 -w -d ../tmp --theme=$(THEME)  --buildDrafts

post:
	cp content/template.md post/example.md

p: publish
	# 
	# Done

publish: gen commit push
	# 
	# Done


push:
	git push
commit:
	git add .
	-git commit -a -m' auto commit'

./bin/hugo:
	curl -LsO $(HUGO_URL)
	tar vzxf $(HUGO_BASENAME)
	mv hugo ./bin/hugo
	rm -f hugo_$(HUGO_VERSION)_Linux-64bit.tar.gz
	chmod +x ./bin/hugo
