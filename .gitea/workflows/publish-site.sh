#!/usr/bin/env bash

export HOME=/home/sig
export PATH="$HOME/go/bin:$PATH"
. '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'


# Configure git to push
echo "$GH_PRIV_KEY" > /tmp/deploy_key
chmod 600 /tmp/deploy_key
export GIT_SSH_COMMAND="ssh -i /tmp/deploy_key -o IdentitiesOnly=yes"

git config --local user.email "sig@picklerick.it"
git config --local user.name "sig"

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


git commit -a -m" automated commit on $ymd"

git pull upstream master
git push upstream master

# Cleanup
rm -f /tmp/deploy_key
