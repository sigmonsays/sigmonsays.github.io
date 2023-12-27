+++
date = "2023-12-27T06:07:08-07:00"
draft = false
title = "nix tip: nvd to see what is going to change"
tags = [ "nix" ]

+++

have you ever wanted to see what packages are going to change before updating them on nix?

Well read on to find out how to do this with home-manager and nixos

First, there is a few different ways i came across

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [A naive approach](#a-naive-approach)
- [nix store diff-closure](#nix-store-diff-closure)
- [nvd](#nvd)
- [nix-diff](#nix-diff)

<!-- markdown-toc end -->


# A naive approach

I wondered since everything is in the nix store, why not just diff it?

So as an experiment I set off to do just that

first step is to clear out any garbage

     nix-collect-garbage

then capture a listing of the nix store

    ls -1 /nix/store > before.txt
    
finally do an update and build

    nix flake update .
    sudo nixos-rebuild build --flake .#desktop3

now a new listing and a diff

    ls -1 /nix/store > after.txt
    cat before.txt | cut -d- -f2- | sort | grep .drv$ > before.names
    cat after.txt | cut -d- -f2- | sort | grep .drv$ > after.names

we can see that firefox changed

    diff before.names after.names  |grep firefox
    > firefox-121.0.tar.bz2.drv
    > firefox-bin-121.0.drv
    > firefox-release-bin-unwrapped-121.0.drv

it's pretty hard to read this so there has to be a better way

# nvd

the solution i landed on that worked great is nvd. I didn't bother looking into
other solutions since it can work with both home-manager and nixos.

For nixos

    FLAKE_NAME = desktop3
    update:
	    nix flake update .
    build:
        sudo nixos-rebuild build --flake .#$(FLAKE_NAME)
        
    diff: update build nvd
    nvd:
        nix-shell -p nvd --run "nvd diff /run/current-system result"

For home-manager

    FLAKE_NAME = um350
    update:
        nix flake update .
    build:
        home-manager build --flake .

    diff: update build nvd

    CURRENT_HOME = $(HOME)/.local/state/home-manager/gcroots/current-home
    nvd:
        nix-shell -p nvd --run "nvd diff $(CURRENT_HOME) result"

Here is an example of running `make diff`

    nix-shell -p nvd --run "nvd diff /run/current-system result"
    this path will be fetched (0.01 MiB download, 0.03 MiB unpacked):
    /nix/store/6d3lx0hcyym6sgp513rjwzxm3il2kp61-nvd-0.2.3
    copying path '/nix/store/6d3lx0hcyym6sgp513rjwzxm3il2kp61-nvd-0.2.3' from 'https://cache.nixos.org'...
    <<< /run/current-system
    >>> result
    Version changes:
    [U.]  #1  firefox-bin                    120.0 -> 121.0
    [U.]  #2  firefox-release-bin-unwrapped  120.0 -> 121.0
    [U.]  #3  initrd-linux                   6.1.68 -> 6.1.69
    [U.]  #4  linux                          6.1.68, 6.1.68-modules-shrunk -> 6.1.69, 6.1.69-modules-shrunk
    [U.]  #5  nixos-system-desktop3          23.11.20231220.d65bcea -> 23.11.20231225.d02d818
    [U*]  #6  nvidia-x11                     545.29.02-6.1.68, 545.29.02-6.1.68-bin, 545.29.02-6.1.68-lib32 -> 545.29.02-6.1.69, 545.29.02-6.1.69-bin, 545.29.02-6.1.69-lib32
    [U.]  #7  webkitgtk                      2.42.3+abi=4.1 -> 2.42.4+abi=4.1
    Closure size: 2102 -> 2102 (54 paths added, 54 paths removed, delta +0, disk usage +1.2MiB).

Here we can see if I were to do a switch, 7 packages would be updated.


# nix store diff-closure

I have yet to explore this method but people demonstrated invocations here

https://www.reddit.com/r/NixOS/comments/x5i7nb/how_to_see_whats_been_updated_after_nix_flake/


# nix-diff

https://github.com/Gabriella439/nix-diff

This tool is capable of generating a diff given two derivations

I did not investigate usage of this tool.

