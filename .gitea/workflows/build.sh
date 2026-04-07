#!/usr/bin/env bash

echo "HOME: $HOME"

. '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'

set -x
go install ./website
