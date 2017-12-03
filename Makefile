all:
	find src -type f > allfiles.txt
	$(MAKE) -C src

help:
	@echo 
	@echo possible targets
	@echo 
	@echo " all          regenerates website"
	@echo " setup        does initial setup of hugo"
	@echo " new          makes a new post"
	@echo " post         creates a post"
	@echo " dev          starts a dev server"
	@echo

setup:
	go get -u github.com/spf13/hugo

new:
	$(MAKE) -C src post

# aliases
post dev:
	$(MAKE) -C src $@
