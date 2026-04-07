#!/usr/bin/env bash

export HOME=/home/sig
. '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'

#set -x
#which go
#pwd
#ls -la

# Compile
go install ./website/

# Generate
make gen

# Push
