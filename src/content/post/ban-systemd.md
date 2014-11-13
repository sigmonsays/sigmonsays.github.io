+++
date = "2014-09-22T21:26:16-07:00"
draft = false
title = "ban systemd"

+++

updates
=============================
- Nov2014 - an exploit in systemd resolver - https://news.ycombinator.com/item?id=8595335
   - Just another reason to do one thing well and not try to do too much. C'mon systemd, focus.
   - Please help me understand why a init.d replacement needs to provide a resolver.
   - some gems from this thread 
      - "I find the design of systemd-resolved to be very strange. It uses dbus to talk to glibc, and it seems to be a new, from-scratch implementation of a DNS resolver. To be clear, I don't really think it matters whether systemd-resolved is under the systemd umbrella, but I do think that the design has a lot of unnecessary NIH syndrome."
      - "This is a perfect example of why the systemd approach of putting a bunch of disparate components under a single tightly-coupled umbrella is bad engineering."
      - "It's mind blowing to realize that because of the init system we have on our system we are now vulnerable to DNS poisoning."
   - anyways, give the thread a read and see for yourself how systemd should be abandoned

why I want to ban systemd
=============================


1. the developers and members on the irc room are aggressive and counter productive and only seem to want to fight
   rather than try to solve any issue.

2. I read countless posts about the terrible nature of the developers

   1. http://www.infoworld.com/article/2608798/data-center/systemd--harbinger-of-the-linux-apocalypse.html?page=2

3. Linus Banned a developer for fighting

   https://bugs.freedesktop.org/show_bug.cgi?id=76935


   From https://bugs.freedesktop.org/show_bug.cgi?id=76935#c24

   ```
   Systemd needs to be forked NOW.
   Linus explained it well already:
   Kay and Lennart: please just go away, disappear from the FOSS community, we don't need you and your crap.
   ```

4. They ban you if they do not agree with you

   1. https://lists.debian.org/debian-ctte/2014/02/msg00389.html


5. Countless people disagree -- even Linus.

   1. http://ewontfix.com/14/
   2. https://news.ycombinator.com/item?id=7522200
   3. http://lxer.com/module/forums/t/35320/
   4. https://twitter.com/lusis/status/450701265782456320

More updates to follow..
=============================

I'm pretty entertained but really saddened by the current situation. I joined the IRC room to ask abuot a bug and only
got racial comments and vulgar language when I inquired about a bug. We didn't even get to discussing the
technical reasons, I had to leave the channel. I might try again later, I am curious.


The community needs to reject this overly complex piece of software without a clear focus or direction.



