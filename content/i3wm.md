---
title: i3 window manager
date: 2021/08/04
tags: [ "i3" ]
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



# Contents


<!-- mtoc-start -->

* [Additional tools](#additional-tools)
* [pulseaudio](#pulseaudio)
* [polybar](#polybar)
* [xsecurelock](#xsecurelock)
* [rofi](#rofi)
* [xscreensaver](#xscreensaver)
* [x11 tools](#x11-tools)
* [xrandr](#xrandr)
* [thunar](#thunar)
* [gtk things](#gtk-things)

<!-- mtoc-end -->


# Additional tools

Since i3 is just a window manager, you need additional tools for a complete environment

- [polybar](#polybar)
- caffeine-ng
- wego
- gsimplecal
- xdotool
- wmctrl
- dunst
- feh

# pulseaudio

I chose pipewire sound system for i3

It supports alsa and pulseaudio as well so I enabled those

This is the core config line for nixos

```
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    pulse.enable = true;
  };
```

# polybar

polybar provides a small bar at the top of the screen for workspaces, system metrics and volume controls.

The left column
- workspaces

The middle column
- load average

The right column
- mouse battery provided by razer-cli
- cpu usage
- root filesystem usage
- download speed
- ping latency
- primary interface state
- volume control provided by pavucontrol
- current date
- current weather provided by wego

# xsecurelock

xsecurelock and xautolock implement my screen lock solution



# rofi

The main use cases for fori are to run programs, switch windows, ssh to hosts and copy emoji's

I want to spend more time on rofi plugins but I have not gotten around to it

# xscreensaver

I _LOVE_ xscreensaver, i'm going to be sad when I can't use it anymore.


# x11 tools

There is a whole slew of random x11 tools i've acquired over the years

- xinit
- xrandr
- xhost
- xkill
- xdpyinfo
- xmodmap

# xrandr

I wrote a little script named xrandr.sh to run at startup in i3 to control the configuration
of my dual 4k screens.


```
left=DP-2
right=DP-4
res=3840x2160
pos=3840
xrandr  \
 --output $left --auto --primary --mode $res --pos 0x0 --rotate normal \
 --output $right --auto --mode $res --pos ${pos}x0 --rotate normal --right-of $left
```


# thunar

GUI file browser

# gtk things

I enabled `dconf` for gnome programs and GTK theming
