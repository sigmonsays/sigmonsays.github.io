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

# Configure git
echo "$GH_PRIV_KEY" > /tmp/deploy_key
chmod 600 /tmp/deploy_key
export GIT_SSH_COMMAND="ssh -i /tmp/deploy_key -o IdentitiesOnly=yes"

# configure remote
if ! git remote get-url upstream ; then
    git remote add upstream git@github.com:sigmonsays/sigmonsays.github.io
    git push --all upstream
fi


git remote get-url upstream
git push upstream
