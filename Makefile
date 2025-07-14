.PHONY: deps dev build image clean

GOCMD=go
IMAGE := r.mills.io/prologic/zs
TAG := latest

all: build

deps:
	$(GOCMD) install go.mills.io/zs@latest
	$(GOCMD) install github.com/tdewolff/minify/v2/cmd/minify@latest

dev : DEBUG=1
dev : build
	zs serve -root public

build:
	rm -rf docs
	zs build
	mv .pub/ docs/

ifeq ($(PUBLISH), 1)
image:
	docker buildx build --platform linux/amd64,linux/arm64 --push -t $(IMAGE):$(TAG) .
else
image:
	docker build  -t $(IMAGE):$(TAG) .
endif

clean:
	git clean -f -d -X
