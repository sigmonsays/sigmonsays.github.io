all:
	$(MAKE) -C src

post dev:
	$(MAKE) -C src $@
