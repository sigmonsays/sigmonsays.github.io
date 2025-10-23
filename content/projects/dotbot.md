---
title: "dotbot"
date: 2023/01/29
tags: [ "dotfiles", "projects" ]
---

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [why](#why)
- [dotbot](#dotbot)

<!-- markdown-toc end -->

# why

dotbot is a tool to manage dot files. I wrote this tool after gettting tired of futzing around
with the python dotbot from https://github.com/anishathalye/dotbot. Full disclosure I love
this tool and it's the motivation for the development of my own dotbot.

I had two main issues that were annoying to me. First, git submodules were a part of the bootstrap
process. Second, I always needed some yaml dependancy installed. These two steps combined and that
written in a confusing shell script I managed to find getting setup annoying, and slightly difficult.

So i took a simplify approach, lets rewrite the tool in go. No dependencies, No submodules. No scripts.
I modified the config slightly to fit modeling it to a go struct and simplified things. What I ended
up with was the go rewrite of dotbot.

# dotbot

sigmonsays version of a dotbot tool https://github.com/sigmonsays/dotbot

Supported features are similar, directories can be created using `mkdirs:`, symlinks can be created
using `symlinks:` and scripts can be run using `script:`. The final `clean:` section is used to
delete invalid symbolic links; invalid meaning they do not point to an actual something that exists.

Example configuration, lets call it `example.yaml`

    mkdirs:
    - ~/asdf
    symlinks:
        ~/bin: bin
        ~/.bashrc: bashrc
        ~/.gitconfig: gitconfig
        ~/.tmux.conf: tmux.conf

    script:
    - id: fix-ssh-perms
        type: post
        command: |
        chmod 0400 ~/.ssh/config
    clean:
    - "~"
    - "~/.config"


Example invocation

     dotbot -c example.yaml link
