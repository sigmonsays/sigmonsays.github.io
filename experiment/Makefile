.PHONY: help
help: ## Show this help screen
	@grep -E '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

b: build
g: gen
d: dev

compile: ## compile
	go install .

build: install gen ## build and gen
	website && echo
	cp site/site.css public/site.css

gen: ## generate
	go generate ./site

dev: gen compile ## run dev build
	reflex -s -r '(\.go$$|\.md$$)' -- make build-and-run

build-and-run: compile ## build and run
	website -dev
