THEME = hyde

#HUGO_FLAGS := --baseURL http://192.168.33.2

all:
	@echo building site..
	hugo -t $(THEME) -d ../data
	rsync -ar ../data/ ../
	git add -A ../
	git status
	@echo
	@echo open http://sigmonsays.github.io in your web browser..

clean:
	rm -rf ../data

dev:
	git status
	hugo server $(HUGO_FLAGS) --bind 0.0.0.0 -w -d ../tmp --theme=$(THEME)  --buildDrafts

post:
	hugo new post/example.md

