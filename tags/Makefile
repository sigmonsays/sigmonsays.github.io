.PHONY: help
help: ## Show this help screen
	@grep -E '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

tags=$(shell list-tags.sh)

gentags: $(tags) ## generate tags

$(tags): ## create tag.md file
	@sed "s,template,$@,g" template.md > $@.md

list-tags: ## list all tags
	list-tags.sh
