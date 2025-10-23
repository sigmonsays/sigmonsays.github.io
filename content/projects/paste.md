---
title: "paste, an hour long project"
date: 2021/08/04
tags: [ "projects" ]
---

I'm sure anyone who has been on IRC or any type of chat understands the concept of a no paste service.

It has always been bothersome to me that any paste, or "no paste" command line client has to be needlessly complex. Some i've tried to
use in the past have required installing ruby gems which I despise. So to scratch an itch, I wrote my very own which requires nothing
more than curl. Its code is on github [1] and the client is rediculously simple:

    #!/bin/bash
    paste() { curl --data-binary @- http://paste.grepped.org/paste ;  }

github https://github.com/sigmonsays/paste
