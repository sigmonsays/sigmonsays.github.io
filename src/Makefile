.PHONY: post
	
THEME = hyde-hyde

#HUGO = $(HOME)/go/bin/hugo
HUGO = /usr/local/bin/hugo

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
gen:
	@echo building site..
	$(HUGO) -t $(THEME) -d ../data
	rsync -ar ../data/ ../
	git add -A ../
	git status
	@echo

clean:
	rm -rf ../data

dev:
	git status
	hugo server $(HUGO_FLAGS) --bind 0.0.0.0 -w -d ../tmp --theme=$(THEME)  --buildDrafts

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
