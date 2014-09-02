all:
	@echo building site..
	hugo -t hyde -D -d ../data
	rsync -ar ../data/ ../
	git add -A ../
	git status
