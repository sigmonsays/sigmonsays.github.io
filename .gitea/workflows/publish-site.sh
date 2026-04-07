#!/usr/bin/env bash

export HOME=/home/sig
export PATH="$HOME/go/bin:$PATH"
. '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'

set -x
#which go
#pwd
#ls -la

# Compile
go install ./website/

# Generate
make gen

# configure remote
if ! git remote get-url upstream ; then
    git remote add upstream git@github.com:sigmonsays/sigmonsays.github.io
    git push --all upstream
fi

git remote get-url upstream
git push upstream
