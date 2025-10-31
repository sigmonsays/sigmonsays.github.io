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

test: gen compile run ## test run

gent: ## generate templates
	go generate ./site

publish: compile gen ## run dev build
	git add docs
	git commit -a -m' publish '
	git push

dev: compile ## run dev build
	reflex -s -r '(\.go$$|\.md$$|\.templ$$)' -- make run

run: ## run
	website -dev
