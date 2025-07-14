---
title: "git-watch"
date: todo
---
git watch is a simple library and CLI tool for monitoring git repositories and triggering events (restart process) when they change.

git watch [1] was designed as a way to easily build and deploy daemons in development when upstream changes. The changes can be either
code (in git) or configuration.

So here is a simple example which will automatically rebuild and restart a application when you git push (https://github.com/sigmonsays/git-watch/tree/master/examples/go)

Below in git-watch.yaml we check the upstream every 5 seconds and merge the master branch in. execcmd is "my_application" which is a simple application. When a upstream
change is detected, we invoke the updatecmd. If the updatecmd does not succeed, the restart process is aborted. Assuming the update command succeeds, we then invoke the install
command. After the install command succeeds, the application is restarted.

git-watch.yaml

      # reinstall a go application when changes are detected in a git remote
      checkinterval: 5
      localbranch: master
      execcmd: my_application
      updatecmd: make
      install: make install


Makefile

      REPO=github.com/sigmonsays/git-watch

      all:
         go get -u $(REPO)/examples/go/my_application/...

      install:
         go install $(REPO)/examples/go/my_application


Full usage


    Usage of git-watch:
     -branch string
           local branch (default "master")
     -check int
           git check interval (seconds) (default 5)
     -config string
           git watch config (default "git-watch.yaml")
     -dir string
           change directory before starting (default ".")
     -exec-cmd string
           exec command (default "make run")
     -http string
           start a http server
     -inherit-env
           inherit environment
     -inotify-dir string
           use inotify as a trigger in directory
     -install-cmd string
           install command (default "make install")
     -loglevel string
           set log level (default "error")
     -once
           run once and exit
     -static-dir string
           static directory (default "static")
     -update-cmd string
           update command (default "make")


- [1] - https://github.com/sigmonsays/git-watch
