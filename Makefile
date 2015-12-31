all:
	$(MAKE) -C src

setup:
	go get -u github.com/spf13/hugo

new:
	$(MAKE) -C src post

post dev:
	$(MAKE) -C src $@
