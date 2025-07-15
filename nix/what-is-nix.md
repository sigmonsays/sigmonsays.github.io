---
title: "nix and nixos"
date: 2023/07/05
---

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Summary](#summary)
- [Why NixOS](#why-nixos)
- [NixOS](#nixos)
- [Home Manager](#home-manager)
- [Build Docker Containers](#build-docker-containers)
- [Development Shells](#development-shells)
- [Nix Cache](#nix-cache)
- [Flakes](#flakes)
- [Resources](#resources)

<!-- markdown-toc end -->

# Summary

Nix is difficult to learn but the promises are appealing with a bit of effort. The effort required
may not be worth it to some people.

Nix overall has so many features that it's worth understanding what's possible

with nix you can

- build docker containers
- build qemu images
- install packages per user or system
- build development shells
- runs everywhere - linux, nixos, macos, windows+WSL
- nix cache (https://cachix.org)
- Everything above is reproducible

I hope this document aims to explain how i've used each one and my experiences with it. There is not a lot of information out there and nix error messages are anything but useful.

# Why NixOS

- declarative
- reproducible
- updates are atomic; system never left in half configured state
- rollback
- don't have to run a config management system
- tools like puppet, ansible, chef, etc do not work the same.
  - nix works at a higher level (not as many details required to use)
  - order of execution does not matter
  - declare end state
  - nix is always pristine
- nix config can easily be shared
- bring up a new system in minutes

The system state is declarative. Which means that it essentially turns my entire OS state into something that can be pristine, setup from scratch, and rolled back to any revision in git.

This makes experimenting with software fearless. With other config mgmt systems, you have to go manually clean up the mess made to remove something either
in error or to uninstall it. Building automations that always work when errors and half states are encountered is difficult.

This is not the issue with nix because the system is built from scratch each time. If I decide I want to experiment with an application
and need to uninstall it, i just comment out the "install package" line and when I rebuild the system it's gone.

Some examples

laptop lid close behavior on my T480

     services.logind.lidSwitch = "hibernate";

change bindings for keyboard volume keys

     services.actkbd.bindings = [
        { keys = [ 122 ]; events = [ "key" "rep" ]; command = "${pkgs.alsaUtils}/bin/amixer -q set Master ${config.sound.mediaKeys.volumeStep}- unmute"; }
        { keys = [ 123 ]; events = [ "key" "rep" ]; command = "${pkgs.alsaUtils}/bin/amixer -q set Master ${config.sound.mediaKeys.volumeStep}+ unmute"; }
     ]

 enable alsa

     sound.enable = true;

# NixOS

nixos provides a entire OS that is defined in the same nix language that nix package manager and home manager uses.

I've only bootstraped a VM using nixos and that was relatively straighforward. I followed [this](https://gist.github.com/tarnacious/f9674436fff0efeb4bb6585c79a3b9ff) guide. A working verion I modified is [here](https://github.com/sigmonsays/nix-experiments/tree/main/nix-qemu2)

Example nixos configurations are [here](https://github.com/sigmonsays/nix-experiments/tree/main/nix/nixos)

I installed nixos on a Lenovo ThinkPad P15S Gen 2 but gave up quickly when the graphics failed to function. I ended up returning the laptop for other reasons so my nixos experience was cut short.

I purchased an old Thinkpad T480 and put NIXOS on it. The installation went smoothly and it's my primary NIXOS laptop. I'm surprised by
how quickly I got everything working.

# Home Manager

Since nix runs everywhere, I have it as part of my dotfile repo and it naturally fits

Figuring out how to organize nix code was very difficult for me and I refactored a couple times. First I just wrote it, then I tried doing hostname detection and importing things dynamically but that failed.

Where I ended up was having a entry point per device and then including modules based on what
device.nix file I was in.

All of my devices run home manager. On MacOS i've used it to replace brew. I have a module for macos
that installed more modern versions of bash and coreutils in addition to all the other things I use
like emacs, jq, fzf, tmux, gdu, etc.


# Build Docker Containers

I have yet to actually do this but will update this section when I get there

# Development Shells

I've used nix to build development shells for various tools.

One such repository is a go code base which manages dotfiles named [dotbot](https://github.com/sigmonsays/dotbot/blob/main/shell.nix). Specifically the `shell.nix` file
contains the details on what's needed to compile and run the application.

If you have nix installed and clone this repo you instantly have the build dependencies

Coupling direnv with direnv-nix allows .envrc to setup the environment when you cd into the directory
which is really nice.

    0 sig@mac14:~/code/dotbot (main) λ  direnv allow
    direnv: loading ~/code/dotbot/.envrc
    direnv: using flake
    ... output cut for brevity ...

Now we have go and can install the package

    0 sig@mac14:~/code/dotbot (main) λ  which go
    /nix/store/ifw3aqbayvh4pnhrrak0jc1parvcybqf-go-1.20.4/bin/go
    0 sig@mac14:~/code/dotbot (main) λ  go install .
    0 sig@mac14:~/code/dotbot (main) λ  which dotbot
    /Users/sig/go/bin/dotbot

This is great when you need additional tools for code generation, like grpc or swagger. Since
now they can be defined in code and kept in the repository.

I've also used this same concept for including various tools for scripts such as image processing
workflows where I needed exiftool, imagemagick and libheif.

# Nix Cache

This feature makes nix really nice.

You get the best of both worlds with a nix binary cache since most things can be pulled as a binary from
the cache.

iF the inputs result in a hash that's not in the cache, nix will build it from source.


# Flakes

The main purpose of flakes is to have more control over the inputs used to install a package. For instance if your nixos configuration.nix
has the stable channel and you try to take someone elses code that expects unstable channel, there could be problems. It might work but the
two systems are not the exact same. Flakes solves this by enforcing the inputs.

To start using flakes you need to enable them in `/etc/nix/nix.conf` by adding the following

     experimental-features = nix-command flakes

Once enabled everything under the 'nix' command becomes available for use with flakes

    # Get shell with gdu installed
    nix shell 'nixpkgs#gdu'

    # run gdu
    nix run 'nixpkgs#gdu'

    # search unstable
    nix search nixpkgs fzf

    # Search a specific channel (23.05)
    nix search github:NixOS/nixpkgs/nixos-23.05 fzf



# Resources

One of the biggest negatives of nix is it's lack and fragmentation of documenttation

This section aims to collect the resources I found useful

- search nixos packages https://search.nixos.org/packages
- search nixos options https://search.nixos.org/options
- search home-manager options https://mipmip.github.io/home-manager-option-search/
- nix package versions - https://lazamar.co.uk/nix-versions/
- awesome-nix - https://github.com/nix-community/awesome-nix
- mynixos - https://mynixos.com/
