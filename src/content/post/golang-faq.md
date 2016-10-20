+++
date = "2016-09-20T12:47:58-07:00"
draft = true
title = "golang FAQ"

+++

# Network programming in Go

http://whispering-gophers.appspot.com/talk.slide#1


# installing golang tools

is there any way i could install my go binaries wherever i want using go tools?

`answer`

typical solution is to install tools in a different GOPATH 

    export GOPATH="$HOME/go"
    export PATH="$GOPATH/bin:$PATH"
    go get -u golang.org/x/tools/cmd/goimports

The only portions you should add to your shell environment (ie ~/.bash_profile) is just the PATH portion.
Do not export GOPATH by default as a security measure. Any remote shell exploit could in theory instruct
the go tool to install and run arbitrary code!
