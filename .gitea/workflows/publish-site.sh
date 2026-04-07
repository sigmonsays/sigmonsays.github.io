#!/usr/bin/env bash





echo "git branch:"
git branch
git branch -la

# Compile
go install ./website/

# Generate
make gen


# configure remote
pwd
if ! git remote get-url upstream ; then
    git remote add upstream git@github.com:sigmonsays/sigmonsays.github.io
fi
git remote -v

ymd="$(date +%Y-%m-%d)"




# Cleanup
rm -f /tmp/deploy_key
