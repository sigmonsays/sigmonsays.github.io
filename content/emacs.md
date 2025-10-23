---
title: "My Emacs Kit"
date: 2022/11/14
---

This document will be a living document that i'll attempt to update from time to time

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Intro](#intro)
- [Pico and Nano](#pico-and-nano)
- [Vim](#vim)
- [doom emacs](#doom-emacs)
- [emacs28 with native compilation](#emacs28-with-native-compilation)
- [Markdown mode](#markdown-mode)
- [Org mode and babel](#org-mode-and-babel)

<!-- markdown-toc end -->

# Intro

I've been using doom-emacs for over a year now (since March 2021) and this is my personal experiences with it.

I do not put a ton of effort into editors, rather I spend a chunk of time intermittently. This has happened with vi/vim and again
with emacs. my vim configuration was always flaky and never worked correctly until around neovim. At that point I was so fed up
with reproducible editor configuration that I looked for something better.

Here is my editor timeline

| Editor     | Years Using     |
|:-----------|:---------------:|
| nano pico  | Since 2001      |
| vi         | Since 2002      |
| vim neovim | Since 2004      |
| emacs      | Since late 2020 |


# Pico and Nano

As a systems administration and a PHP developer, I primarily built CMS type stacks and shopping cart applications. These
editors worked well but I found myself wasting so much time navigating with page up and page down

# Vim

When I discovered vim and what it could do, I became interested.. But...

It was really difficult for me to pick up. Once I managed to make the switch to a modal editor, I never
looked back.

vim configuration was always mystical to me (and still is). I could barely customize it outside of it's
stock configuration so that's what I used.


# doom emacs

Being a vim user for so many years has basically burned those keys into my brain.

I am still a vim user to this day like using `j` and `k` to navigate is still present in doom emacs due to evil mode

I'm by no means a lisp expert but doom emacs is ready to go out very quickly. Some things that look time are learning
and discovering everything that is out there.

Favorite packages

| Package          | Notes                                                                      |
|:-----------------|:---------------------------------------------------------------------------|
| projectile       | project manager                                                            |
| dired            | file explorer                                                              |
| magit            | use git in emacs                                                           |
| bookmarks        | quickly jump to common files                                               |
| ibuffer          | grouping and switching buffers                                             |
| LSP              | for coding in go, rust, python                                             |
| org-mode         | knowledge base and interactive document                                    |
| emacs-everywhere | quick pop up emacs buffer for editing and pasting back into an application |


Honerable mentions

- restclient.el
- code folding
- yasnippet for code snippets
- eshell
- markdown mode
- org mode and babel
- dired

# emacs28 with native compilation

The editor install is a beast which is not ideal but native compilation made emacs so much faster that I can't live without it

# Markdown mode

Emacs never fails to amaze in the commands it has. One case is in markdown mode, you can simply run `markdown-toc-generate-toc` and it will generate
a index at the top of the page. This also works for org mode using `toc-org-insert-toc`

# Org mode and babel

I use .org files for keeping notes about various things. Being able to have a text only interface with the ability to link between org files and sections
is really all I need.

Then comes babel, which is a way for emacs to execute source code snippets. For instance for bash, I can get the output of `df -h /` rendered directly in
my org file

    #+begin_src bash :results output
    df -h /
    #+end_src

    #+RESULTS:
    : Filesystem      Size  Used Avail Use% Mounted on
    : /dev/nvme0n1p2  1.8T  473G  1.3T  28% /


I've used this for a lot of things where you want to remember the command and also capture the results.
