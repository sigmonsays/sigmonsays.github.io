---
title: "enlightenment"
date: todo
---

# Update: August 2019

I have switched to i3wm (for some time now) exclusively due to its speed and lightweight. I'll have to write a post about that experience
some time.



# e20


enlightenment has been my window manager of choice for a very long time maintly because of its speed. I used to run
window maker and then fluxbox before I made the switch to enlightenment (0.16 at the time iirc).

# e20 - feb2016
enlightnement 0.20 caused all sorts of graphics problems

i tried a bunch of different things, like hardware and software rendering without luck

the problems I had were many

- chrome kept freezing which only began happening in the new e. I managed to work around it by disabling GL in chrome
- pidgin systray icon went away
- sluggish UI after hours of usage
- while using hardware rendering, windows would just render bloack
  - no matter what I did, restart e, minimize/shade/move window, etc
- while using software rendering
  - really high cpu usage
- under both hardware and software I would see windows flickering all the time
  - windows would not redraw properly quite item
  - notably xterm which is just not acceptable

This is an attempt to keep an ongoing document that describes the issues and fixes i've encountered.
