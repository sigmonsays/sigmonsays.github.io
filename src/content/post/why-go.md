+++
date = "2017-11-16T10:27:27-08:00"
draft = false
title = "why use the go programming language?"
tags = [ "golang" ]


+++

# In summary

- [Compiled Language]({{< relref "#compiled-language" >}}) has a compiler which checks a lot of errors for me
- [Strictly typed]({{< relref "#static-linking" >}}) language
- [Statically linked]({{< relref "#static-linking" >}}) binary (single binary deployment!)
- [Unique type system]({{< relref "#type-system" >}}) using interfaces, composition and embedding instead of OOP patterns
- [Language Grammer]({{< relref "#language-grammer" >}}) well defined 
- [Amazing Tooling]({{< relref "#tooling" >}}) ie, gofmt, godef, go-imports, vim-go
- small standard library and the go1 promise https://golang.org/doc/go1compat
- [concurrency]({{< relref "#concurrency" >}}) is a language (not library) feature, ie concurrency, goroutines, and channels
- it is good to collaborate on (e.g. writing large systems)

# work in progress!

This page will be filled out over time

# Compiled Language 

compiler checks a lot of errors for me

One case which use to get me all the time is error handling code in dynamic languages. If you do not unit test every case, often a undefined variable would result
in your error handling code explode.

The go language also has some unique features. Undefined and unused variables cause compiler errors.


# Strictly Typed 

Similar to being a compiled language, 

Large refactors in code often require changing arguments around or adding new ones. With a strictly
typed language this is easy. If the compile works, you can be fairly confident that everything will run
as designed.

# Statically Linked 

Being a statically linked package means you are deploying a single binary or binary + config file. The only thing most go binaries link to are libc for some OS level networking support. It is possible
to compile without libc entirely if you choose. Finally, if you avoid **cgo** this means your binary will run anywhere given you have a matching architecture. 

**This is an amazing feature coming from python** I love python but its biggest shortcoming is the confusion that arrises from the myraid of packaging systems.

# Type system

Go has a interesting type system which removes the fundamentally flawed OOP features. OOP programmers often uses inheritenace when composition could be used instead.

**composition** means you combine objects together instead of searching a inheritence tree. I am not going into all the details here but here is the [wikipedia article on composition](https://en.wikipedia.org/wiki/Composition_over_inheritance)


# Language Grammer

a language spec that is well defined https://golang.org/ref/spec, short, and simple.

Without a well defined language specification, none of the tooling would be possible. It also makes it easy to develop tools which parse code into AST (Abstract syntax tree) and manipulate it. Ie, write code which
modifies other code. This was not very practical in other langauges (IMHO). The `go/ast` and `go/types` packages lowered the barrier of entry to write quick tools for manipulating go source code.


# Tooling

The amount of tooling really makes go a step above the rest

`gofmt`

This tool automatically formats source code in a pre-defined way. 

The tool shuts down the bike shed discussions which naturally occur about code formatting. Most people (if not all) require `gofmt` to be executed on the source code being submitted to a project. This 
is also very useful to tie into your editor on save. Often you can paste a piece of code which does not match the indentation level, and watch it all fall into place.

I have spent a lot of time re-indenting code and this is no longer a step in go.

`goimports`

This tool automatically adds imports and removes unused imports in a source file

It is very useful to not worry about jumping to the top of the file and change imports every time you modify code.

`godef`

This tool is used in editors to jump to a types declartion. 

Within vim one can type `gd` on any variable or type and the editor jumps to the file and location where that *thing* is defined. It is very useful for navigating
unfamiliar and large source trees.

`gocode`

This tool provides a auto complete interface of methods and variables

integration with editors, like **vim-go** really tie the tools together for a IDE like developer experience from the terminal. Of course there
is a lot of graphical editors too if that is your thing.


**Others?**

I am sure I missed some tools that I use.  What tools do you use that are not mentioned here?



# Concurrency

Last but not least and quite possibly the most important feature of go is its concurrency primitives.

They are built directly into the language specification and first class citizens (they are not bolted on later). 

`goroutines` are essentially coroutines but are executed across multiple real OS threads. The runtime scheduler handles everything for you so you can focus on writing logically blocking
code. goroutines run in parallel, which makes it easy to maintain a mental model of what is happening in a concurrent program.

`channels` are the communication primitive and allow different goroutines to talk to each other. A channel can be buffered and unbuffered, which allows creation of some really useful patterns.

