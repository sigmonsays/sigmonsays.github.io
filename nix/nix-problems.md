---
title: "Nix Problems"
date: todo
---


# inkscape segfault on opening a file

axidraw is not available in nixos, so I need to figure out how to get virtualenv working, which
isn't that hard. I managed.

inkscape crashes every time I open a file on nix. This does not happen on ubuntu or MacOS.

There seems to be a problem related to GTK3 but it's not fixed in nixpkgs stable or unstable

https://github.com/NixOS/nixpkgs/issues/249616

https://gitlab.com/inkscape/inbox/-/issues/9843
