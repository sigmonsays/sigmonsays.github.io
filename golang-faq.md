---
title: "golang FAQ"
date: 2021/08/04
---

Sections

- [Network Programming in go]({{< relref "#network-programming-in-go" >}})
- [Installing golang tools]({{< relref "#installing-golang-tools" >}})
- [Errors are values ]({{< relref "#errors-are-values" >}})


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

# Errors are values

This feature of go about errors being values was not immediately obvious to me until I read through the spec about how objects are compared

In the spec, https://golang.org/ref/spec#Comparison_operators about pointers it says this

> Pointer values are comparable. Two pointer values are equal if they point to the same variable or if both have value nil. Pointers to distinct zero-size variables may or may not be equal.

This means that you can make your own type which satisfies error. If your package exports these errors, all your functions which return `error` can return these types. The value
here is the caller can compare error to handle specific error conditions if needed.

Further, if more detail is needed for an error, we now know the underlying type and can type switch it.

Example Code Below

Playground links https://play.golang.org/p/49GdCgZyq2_e

      package main

      import (
         "fmt"
      )

      type E struct {
         Message string
      }

      func (me *E) Error() string {
         return me.Message
      }
      func NewE(m string) *E {
         return &E{m}
      }

      var (
         TeaPot   = NewE("I am a tea pot")
         Cabbages = NewE("cabbages")
      )

      func F1(a int) error {
         if a == 1 {
            return TeaPot
         } else if a == 2 {
            return Cabbages
         }
         return nil
      }

      func main() {

         for x := 0; x < 3; x++ {
            fmt.Printf("\nx=%d:\n", x)
            err := F1(x)
            if err == nil {
               fmt.Println("success")
            } else if err == TeaPot {
               fmt.Println("F1 is infact a tea pot")
               teapot_error, ok := err.(*E)
               if ok {
                  fmt.Printf("teapot message: %q\n", teapot_error.Message)
               }
            } else {
               fmt.Println("F1 is not a tea pot:", err)
            }
         }
      }
