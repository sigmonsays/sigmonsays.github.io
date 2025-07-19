.PHONY: deps dev build image clean

help: ## Show this help screen
	@grep -E '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

IMAGE := r.mills.io/prologic/zs
TAG := latest

all: build

p: publish
b: build
d: dev

deps: ## install deps
	go install go.mills.io/zs@latest
	go install github.com/tdewolff/minify/v2/cmd/minify@latest

dev : DEBUG=1
dev : build ## start dev serve
	#zs serve --root public
	zs serve

publish: build ## build and publish
	git add .
	git commit -a -m' publishing changes'
	git push

build: ## build site
	rm -rf docs
	.zs/pages_json  . | jq > pages.json
	make -C tags gentags
	zs build
	mv .pub/ docs/
	rm -rf docs/docs

ifeq ($(PUBLISH), 1)
image:
	docker buildx build --platform linux/amd64,linux/arm64 --push -t $(IMAGE):$(TAG) .
else
image:
	docker build  -t $(IMAGE):$(TAG) .
endif

clean:
	git clean -f -d -X
