---
title: "nix-direnv"
date: todo
---


<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [direnv](#direnv)
- [nix-direnv](#nix-direnv)
- [Nix Shell](#nix-shell)
- [Rust development environment](#rust-development-environment)
- [Go development environment](#go-development-environment)
- [Nix Shell and Flakes](#nix-shell-and-flakes)
- [Audio / Video Transcoding tools](#audio--video-transcoding-tools)
- [Photos and Videos](#photos-and-videos)
- [Static Website](#static-website)
- [Emacs](#emacs)
- [hey gcroots, save some of that garbage!](#hey-gcroots-save-some-of-that-garbage)
- [References](#references)

<!-- markdown-toc end -->

# direnv

The power of nix with direnv is easy to understate. This post is to explains some ways to use it.

direnv is a nice tool to use which allows you to load the appropriate environment variables when you cd
to a specific directory. supported shells are bash, zsh, tcsh, fish, elvish, and powershell.

It can not setup shell aliases or inject bash functions into your shell. This is by design due to security. however
manipulating the environment variables seems enough.

direnv can be used with `nix-direnv` to support modifying `PATH` and other variables to inject commands into your project.

Installing direnv is out of scope for the purpose of this document but the direnv website [1] has good instructions and
installation is pretty straightforward.

In short the way direnv works is by loading a .envrc file like this

    export FOO=bar

If you cd to a directory with this .envrc, you must first run `direnv allow` then you can see the environment is loaded

    $ direnv allow
    direnv: loading ~/demo/.envrc
    direnv: export +FOO
    $ echo $FOO
    bar


# nix-direnv

nix-direnv [2]  provides the `use flake` and `use nix` functionality for direnv


# Nix Shell

It's possible to get a shell with a arbitrary package installed using nix-shell. This allows your computer
to remain pristine except for when you're working on a specific project.

Evaluating applications becomes fearless because everything needed to install said application, all it's
dependencies can now easily be deleted when you exit the shell. No left over krufty deps.

    $ nix-shell -p fortune
    $ fortune
    If you don't drink it, someone else will.


and fortune is no longer available after exiting

    $ exit
    exit
    $ fortune
    command not found: fortune

Multiple packages

    $ nix-shell -p fortune htop


# Rust development environment

In order to develop with rust, I installed rustup on my system. Installing rustup is
a step i perform outside of the development shell.

The unnamed application i built these examples from uses environment variables
as configuration. So using direnv also has the added benefit of loading the
applications configuration.

The basic setup is to have both a .envrc file and a a shell.nix file

example .envrc

    export RUST_BACKTRACE=1
    export SIMPLE_LOGS=false
    export ENABLE_UI=true

    use nix

example shell.nix

    { pkgs ? import <nixpkgs> {} }:

    with pkgs;

    mkShell {
        buildInputs = [
            openssl
            pkg-config
        ];
    }

Then to install your rust toolchain (last project uses nightly)

      rustup toolchain install nightly
      rustup default nightly
      cargo install cargo-edit cargo-watch cargo-tree cargo-duplicates cargo-feature

rust-analyzer is the LSP i use in emacs

      rustup +nightly component add rust-analyzer-preview

finally compile the project

      cargo build


# Go development environment

Just like the rust development environment we need two files, .envrc and shell.nix

.envrc

    export WORKSPACE="$(pwd)"
    export GOFLAGS="-count=1"
    use nix

shell.nix

    { pkgs ? import <nixpkgs> {} }:

    with pkgs;

    mkShell {
      buildInputs = [
            go_1_20
            protobuf
            grpc-gateway
            sqlite
            libpcap
      ];
    }

The shell.nix contents are specific to a project that uses grpc gateway and protobuf.

# Nix Shell and Flakes

The same .envrc and shell.nix can be used with flakes. The addition of a flake.nix file
indicates what upstream nixos to use.

flake.nix

    {
      description = "example program";

      inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
      inputs.flake-utils.url = "github:numtide/flake-utils";
      inputs.gomod2nix.url = "github:nix-community/gomod2nix";

      outputs = { self, nixpkgs, flake-utils, gomod2nix }:
        (flake-utils.lib.eachDefaultSystem
          (system:
            let
              pkgs = import nixpkgs {
                inherit system;
                overlays = [ gomod2nix.overlays.default ];
              };

            in
            {
              packages.default = pkgs.callPackage ./. { };
              devShells.default = import ./shell.nix { inherit pkgs; };
            })
        );
    }


We need to change the .envrc use line from 'use nix' to 'use flake'

.envrc

    use flake

Now can can use flakes

    nix shell


# Audio / Video Transcoding tools

Changing to the transcoding-tools directory automatically loads all the tools I need to process video

    cat ~/code/random-code/transcoding-tools/shell.nix

    { pkgs ? import <nixpkgs> { } }:

    with pkgs;

    mkShell {
      buildInputs = [

        handbrake
        mplayer
        ffmpeg

        audacity

        mpg123

      ];
    }


# Photos and Videos

Another example, I wrote a program call `picman` which sorts photos with my own rules. This program needs exiftool and libheif to function.

Changing directory to my photos automatically loads the shell.nix for Photos and Videos and all of these tools are then made available to use


    { pkgs ? import <nixpkgs> {} }:

    with pkgs;

    mkShell {
      buildInputs = [
            exiftool
            libheif
      ];
    }

# Static Website

This website is created using hugo, here is it's shell.nix

    { pkgs ? import <nixpkgs> {} }:

    with pkgs; mkShell {
      buildInputs = [
            hugo
      ];
    }


# Emacs


Since emacs is the editor i use (doom emacs to be specific) i figured it's worth mentioning that I also use

in ~/.doom.d/init.el I have `:tools direnv` set which sets up `emacs-direnv` [3]. This allows various tools
like gopls and rust-analyzer to function properly.

# hey gcroots, save some of that garbage!

So it's worth mentioning that `use flake` saves build result in a hidden file where .envrc resides. This has the effect
of protecting the shell contents from getting garbage collected. This is ideal imho as constantly having to re-download
and setup a shell is annoying.


# References

- [1] https://direnv.net/
- [2] https://github.com/nix-community/nix-direnv
- [3] https://github.com/wbolster/emacs-direnv
