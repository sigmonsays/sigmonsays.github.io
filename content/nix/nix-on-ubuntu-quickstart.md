---
title: "nix on ubuntu quick start guide"
date: 2026/02/10
tags: [ "nix" ]
---


<!-- mtoc-start -->

* [Intro](#intro)
* [Install Nix](#install-nix)
* [Install Home Manager](#install-home-manager)
* [Edit home manager config](#edit-home-manager-config)

<!-- mtoc-end -->

# Intro

Nix is difficult to learn but the promises are appealing with a bit of effort. The effort required
may not be worth it to some people.

I wanted to make this guide to demonstrate how quick you can get setup and running on ubuntu

# Install Nix

I performed these steps on an ubuntu 22.04 VM

Install nix

     yes | sh <(curl -L https://nixos.org/nix/install) --daemon

     if ! grep -q nix-command /etc/nix/nix.conf ; then
        echo "experimental-features = nix-command flakes" | sudo tee -a /etc/nix/nix.conf
     fi

Exit the shell and start a new one

After exiting the shell and starting a new one, you should have nix command

    which nix

Now we need to pick the correct nix version that is compatible with home-manager

        sudo $(which nix-channel) --remove nixpkgs
        sudo $(which nix-channel) --add https://nixos.org/channels/nixos-24.11 nixpkgs
        sudo $(which nix-channel) --update

# Install Home Manager

Exit shell and start a new one

write initial home manager config to  `.config/home-manager/home.nix`

        { config, pkgs, ... }:

        {
          home.username = "sig";
          home.homeDirectory = "/home/sig";

          home.stateVersion = "24.11"; # Please read the comment before changing.

          home.packages = [
          ];


          # Let Home Manager install and manage itself.
          programs.home-manager.enable = true;
        }

install home manager

    nix-channel --add https://github.com/nix-community/home-manager/archive/release-24.11.tar.gz home-manager
    nix-channel --update
    nix-shell '<home-manager>' -A install
    home-manager switch


# Edit home manager config

Lets say you want some packages installed

Modify the home.packages block here

          home.packages = [
          ];

to look like this:

          home.packages = with pkgs; [
                neovim
                rsync
                git
          ];

Now apply it

    home-manager switch

That is it!
