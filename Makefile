.PHONY: help
help: ## Show this help screen
	@grep -E '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

b: build
g: gen
d: dev
p: publish

compile: gent ## compile
	go install .

gen: ## generate site
	rm -rf docs
	mkdir -p docs
	website -gen && echo
	cp site/site.css docs/site.css
	rsync -ar ./overlay/ ./docs/
	#rsync -ar ./content/dotfiles/emacs/ ./docs/dotfiles/emacs/

test: gen compile run ## test run

gent: ## generate templates
	go generate ./site

publish: compile gen ## run dev build
	git add docs
	git commit -a -m' publish '
	git push

dev: ## run dev build
	# use -v with reflex for debug
	reflex -v -s -r '(\.go$$|\.md$$|\.templ$$)' -R 'docs/*' -R 'site/.*_templ.go' -- make rerun
	#run-dev

rerun: gent compile gen run ## build and run
	# rerun $@

run: ## run
	website -dev
