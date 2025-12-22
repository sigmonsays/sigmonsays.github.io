---
title: "shell tools"
date: 2025/12/20
draft: false
tags: [ "shell" ]
---

This is a collection of tools I use that help my productivity in the interactive shell and shell scripts.

Most of these are simple and the install and configuration is so straightforward that they are all on
this single page.

<!-- mtoc-start -->

* [zoxide](#zoxide)
* [jq](#jq)
* [fzf](#fzf)
* [git](#git)
* [curl](#curl)
* [make](#make)
* [gdu](#gdu)

<!-- mtoc-end -->

# zoxide

zoxide is one of the most recent tools that really enhanced your shell experience.

It hooks the `cd` command and tracks directories you frequent, the directories are
scored, and when you cd again, it lets you quickly cd to something if it's unique.

There are two ways to use it, first is "cd code myapp" which will look through your
directory list, and if there is a match, it will bring you to that directory.

The other way to use zoxide, is to open an interactive fzf of the directory list.

Simply type `cd thing <tab>` and fzf will open with matches for `thing`.

Since I use [[nixos]] and [[home-manager]] the setup and install process was relatively straightforward

I used home-manager for zoxide setup and simply set `programs.zoxide.enable=true;` then the typical setup
step is to source it in your `~/.bashrc`:

    eval "$(zoxide init --cmd cd bash)"

# jq

jq is the swiss army knife of JSON. The syntax is a little cryptic but once you get a hang of it,
it's super powerful.

jq is installed vix home-manager using `programs.jq.enable = true;`

# fzf

fuzzy finder, this is super useful for anything you need to quickly select from a list. I use this in shell
scripts and the terminal.

- CTRL-R - Paste the selected command from history into the command line
- CTRL-T - Paste the selected file path into the command line
- ALT-C - cd into the selected directory

# git
# curl
# make
# gdu

a nice interactive du tool
