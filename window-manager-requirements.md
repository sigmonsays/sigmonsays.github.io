---
title: "window manager requirements"
date: 2025/09/19
draft: false
---

This post is to help myself and also anyone else to detail what I look for in a window manager
on a linux desktop.

The primary use case is a dual screen workstation and the screens are both 4k screens, which rules out
tiling since tiling with such high resolution (3840x2160).

This workstation is a desktop and my primary working environment.

**Current solution**

My current solution is to use i3 and float everything. Prior to floating everything, my 2 screens were smaller
and I had far less screen space. Tiling actually made sense back then but with 4k screens it does not.

**Previous solutions**

Prior to i3 I was a heavy enlightenment user but it ended up having some missing features

I used awesome-wm for a little but having to write lua was a huge pain. interoperability issues like
not being able to use polybar cause more pain. At some pinot I had memory leaks and the complicated
code to do simple things hurt. Still I had an awesome window manger setup with awesome-wm (pun intended)

# Common Features

**Configurable Key bindings**

This should go without saying but i definitely need to be able to configure key bindings as I am primarily
a keyboard user with very little mouse usage.

# Workspaces

I will always have the need to move applications to a workspace I do not see.

I have a machine with a lot of memory and will have multiple development environments open and maybe
a remote/production workspace as well. The first workspace is usually e-mail and chat.

A common setup is as follows

**Screen 1 (left) - workspaces 1 through 5**
* workspace 1
    - browser w/ work chat programs
    - browser w/ work email and calendar programs
    - terminal with meetings notes
* workspace 2
    - code on primary project
    - usually many terminals, 3 to 4 is common
* workspace 3
    - sometimes ssh remote sessions
    - sometimes adhoc coding projects
* workspace 4
    - whatever overflows like additional projects
    - production or development deployments
* workspace 5
    - steam games

**Screen 2 (right) - workspaces 6 through 9 and 0**
* workspace 6
    - personal chats
    - personal email
    - music (spotify or youtube)
* workspace 7
    - gui notes program (sublime text)
* workspace 8
    - sometimes GUI REST API tool like bruno
* workspace 9
    - whatever
* workspace 10
    - mindmapping

# Independent workspaces per screen

This single requirement rules out so many window managers.

Being able to switch a workspace on a single monitor is such a big deal.

Quite often I have documentation or chat up on one screen that I am keeping an eye on and then code
or work on the other screen.

This is a critical part of my workflow that I really think is necessary on a desktop workstation

This list of window managers that can do this are short, some of them are bspwm, awesome-wm, i3,
enlightenment, xmonad, wingo, dwm, and cosmic.




# Scratch pad

A scratch pad is a window that you can show and hide quickly that is always running.

I have multiple scratch pads each bound to a key

* terminal
* math terminal - usually running python or qcalc
* file browser

There is a terminal called tdrop which can provide a quake like inspired terminal but that does not
cover other applications like file browsers.

# Easily configurable from dot files

the window manager needs a cli to configure it or have configuration files to control most things.

enlightenment failed this one, being able to configure everything from a git checkout was ultimately what
made me look for alternatives.

That and it was rather old and appeared to be slowly unmaintained. I used to compile it from source to get
the version I wanted.

# Powerful Launcher

current launcher is rofi, it lets me run arbitrary commands which is pretty useful as I would rather write a script
as opposed to a .desktop file.

Rofi does more than just run commands, it also does ssh, open windows, and emoji

# Menu Bar

currently use polybar as it has a lot of features I like

* Various monitors - I have CPU, Memory, Disk, download speed, VPN and Interface stats.
* load average
* volume control, which is critical
* current date
* current weather
