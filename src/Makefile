THEME = hyde

all:
	@echo building site..
	hugo -t $(THEME) -d ../data
	rsync -ar ../data/ ../
	git add -A ../
	git status

clean:
	rm -rf ../data

dev:
	git status
	hugo server -w -d ../tmp --theme=$(THEME)  --buildDrafts

post:
	hugo new post/example.md

