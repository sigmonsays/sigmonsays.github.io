---
title: i3
date: todo
---


I have switched from enlightenment to i3wm and wanted to talk about my experiences. At the time I was compiling enlightenment from source using a terrible set
of bash scripts I wrote myself and maintained over the years. This was because I started running the latest version of e from git.

If memory serves, I switched from fluxbox to enlightenment when enlightenment 0.17 came out, which was somewhere near the year 2012. Needless to say it
takes a lot to shift someone who has been using e for so long.

The primary reasons I used enlightenment were

1. fast - configurable to be fast. I could disable the fancy animations
2. "independent" multi-monitor-workspaces - This is a real big one for me. It means that in a dual screen setup, you can switch a workspace on only a single monitor
3. scriptable - enlightenment_remoet allowed some scripting, this allowed automating desktop setup

`enter i3`

i3 has been a bit of a learning curve being keyboard driven but I solved that by making a printable cheat sheet [see here](https://docs.google.com/document/d/1Y3aRkCIa60fqLkAZWxMr8cJFo0wimqrmSUnWUmj7Hw4/edit?usp=sharing)

its controllable via i3-msg which are basically the same commands used in ~/.i3/config, so it is much more scriptable than enlightenment

being keyboard driven it allows me to switch workspaces and windows without ever leaving the home keys. This has huge implications on development workflows which
i'll get into later.


`workflows`
