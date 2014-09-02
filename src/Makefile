all:
	@echo building site..
	hugo -t hyde --buildDrafts
	rsync -ar public/ ../
