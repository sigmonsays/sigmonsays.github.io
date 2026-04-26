---
title: "nix-tool"
date: 2026/04/26
tags: [ "nix" ]
---
<!-- mtoc-start -->

* [nix-tool](#nix-tool)
* [Usage](#usage)
* [Examples](#examples)
* [The script](#the-script)

<!-- mtoc-end -->

# nix-tool

nix-tool is a simple wrapper script I have been using to make things simpler on nix/nixos hosts.

The use case is I have macos with nix, a bunch of ubuntu VMs with nix installed and nixos. They
all have different ways of executing the same task.

So this script is here to provide some helpers and uniformity

# Usage

```
nix-tool
Usage: nix-tool cmd
cmd
    update    flake update
    switch    build and switch to latest build
    boot      build boot (requires reboot)
    build     build local but do not switch
    diff      build and diff
    gc        garbage collection
    optimize  optimize nix store
    du        show disk usage for /nix/store
    clean     clean local build
    fmt       format .nix using alejandra
    nix-info  show nix info
    graph     generate a graph
```

# Examples


Get disk space of /nix

    $ nix-tool du
    53.9 GiB nix

Set current configuration to version from current git checkout

    nix-tool switch

Set boot configuration to version from current git checkout

    nix-tool boot

Cleanup garbage

    nix-tool gc

# The script

```bash
#!/usr/bin/env bash

function chdir_nix {
	cd $HOME/nix
}

function is_nixos {
	stat /etc/NIXOS >/dev/null 2>&1
}
function help_cmd {
	local b="$(basename "$0")"
	cat <<EOF
Usage: $b cmd
cmd
    update    flake update
    switch    build and switch to latest build
    boot      build boot (requires reboot)
    build     build local but do not switch
    diff      build and diff
    gc        garbage collection
    optimize  optimize nix store
    du        show disk usage for /nix/store
    clean     clean local build
    fmt       format .nix using alejandra
    nix-info  show nix info
    graph     generate a graph
EOF
}
function update_cmd {
	nix flake update
}
function flake_arg {
	local flake="$2"
	if [ -z "$flake" ]; then
		flake="."
	else
		flake="./${flake}#${flake}"
	fi
	echo "$flake"
}
function switch_cmd {
	local flake="$( flake_arg "$2")"

	if is_nixos; then
		sudo nixos-rebuild switch --flake "$flake"
	else
		home-manager switch --flake "$flake"
	fi
}
function boot_cmd {
	if ! is_nixos; then
		echo "boot only makes sense on nixos"
		exit 1
	fi
	sudo nixos-rebuild boot --flake .
}
function build_cmd {
	if is_nixos; then
		sudo nixos-rebuild build --flake .
	else
		home-manager build --flake .
	fi
}
function diff_cmd {
	update_cmd "$@"
	build_cmd "$@"
	if is_nixos; then
		nix-shell -p nvd --run "nvd diff /run/current-system result" | tee nvd-diff.txt
	else
		CURRENT_HOME="$HOME/.local/state/home-manager/gcroots/current-home"
		nix-shell -p nvd --run "nvd diff $CURRENT_HOME result" | tee nvd-diff.txt
	fi
	rm -f result
	date +%Y-%m-%d >updated.txt
}
function gc_cmd {
	if is_nixos; then
		sudo rm -rf /tmp/nixos-rebuild.*
		sudo nix-env --delete-generations 14d
		sudo nix-collect-garbage -d
		nix-collect-garbage -d
	else
		nix-collect-garbage -d
	fi
	du_cmd
}
function optimize_cmd {
	nix-store --optimize
}
function du_cmd {
	gdu -ns /nix | head
}
function clean_cmd {
	rm -vf result
}
function fmt_cmd {
	alejandra .
}
function nix_info_cmd {
	nix-shell -p nix-info --run "nix-info -m"
}
function graph_cmd {
	local flake="$( flake_arg "$1")"
	# .#nixosConfigurations.desktop3.graph
	nix eval \
		--json \
		"$flake" \
		| nix run 'nixpkgs#fx'
}

function main {
	local cmd="$1"
	[ -z "$cmd" ] && cmd=help

	chdir_nix

	case "$cmd" in
	build) build_cmd "$@" ;;
	clean) clean_cmd "$@" ;;
	diff) diff_cmd "$@" ;;
	fmt) fmt_cmd "$@" ;;
	gc) gc_cmd "$@" ;;
	optimize) optimize_cmd "$@" ;;
	du) du_cmd "$@" ;;
	switch) switch_cmd "$@" ;;
	boot) boot_cmd "$@" ;;
	update) update_cmd "$@" ;;
	nix-info) nix_info_cmd "$@" ;;
	graph) graph_cmd "$@" ;;
	help) help_cmd "$@" ;;
	*) help_cmd "$@" ;;
	esac
}

main "$@"


```
