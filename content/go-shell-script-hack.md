---
title: "go shell script hack"
date: 2026/01/11
draft: false
tags: [ "golang" ]
---

There is a shell script hack that can be used with go to make go compile and execute the source code
of a .go file, as if it were a shell script.

All credit goes to this post, https://lorentz.app/blog-item.html?id=go-shebang

**Please never do this in production!**

# Example

Save this to `script.go`:

    /*usr/bin/env go run "$0" "$@"; exit; */
    package main

    import "fmt"

    func main() {
        fmt.Println("Hello world")
    }


Then just run it:

    chmod +x ./script.go
    ./script.go
