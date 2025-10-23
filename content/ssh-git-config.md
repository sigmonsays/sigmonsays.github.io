---
title: "ssh git configuration"
date: 2025/07/21
draft: false
tags: [ "dotfiles" ]
---

ssh configuration can be tricky with git if you have to use multiple keys and even more so when multiple keys
for the same host.  This post will demonstrate a flexible configuration method of defining git configuration
per top level directory.

in `~/.gitconfig` put the following

    [includeIf "gitdir:~/code/"]
        path = ~/.gitconfig.d/personal

    [includeIf "gitdir:~/work/"]
        path = ~/.gitconfig.d/work

This includes .gitconfig.d/personal if you are in ~/code and .gitconfig.d/work if you are in ~/work

Within each of these files you can then configure the appropriate things for that space

    [core]
    sshCommand = "ssh -i ~/.private/keys/personal/secret"

    [user]
    email = user@example.net
    name = sigmonsays

the sshCommand parameter sets what private key to use for the ssh connection. The other
parameters configure what e-mail and name to use for committing.

That's about it!
