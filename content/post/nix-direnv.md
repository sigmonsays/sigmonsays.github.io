+++
date = "2023-12-14T06:07:08-07:00"
draft = true
title = "nix-direnv"
tags = [ "nix" ]

+++


# Simple Rust development environment

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

# Workbenches

a little analogy i use to describe a workbench filled with the appropriate tools for a given task

I have workbenches for quite a bit of things, basically tools for a specific purpose







