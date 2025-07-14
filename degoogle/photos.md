---
title: "my alternative to google photos"

---

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Introduction](#introduction)
- [Walled garden](#walled-garden)
- [The solution](#the-solution)
- [syncthing](#syncthing)
- [picman](#picman)
- [photoprism](#photoprism)
- [honorable mention: Photostructure](#honorable-mention-photostructure)

<!-- markdown-toc end -->


# Introduction

Google photos was amazing in the beginning, the photos application did what I wanted and in general it was a good experience

I was somewhat of an early adopter, so I had a plethora of photos stored in google photos.  I didn't really
have to think about photos, it was just handled for me.

Some of the features were pretty useful such as facial recognition and automatic event creation but they didn't
really end up being needed.


# Walled garden

A series of decisions were made by google, which I do not care to fully understand. When they stopped
supporting integrations and tightened the walled garden, my concern grew.

I was trying to use rclone to backup my photos, but google removed the ability to access the originals. That is via the
API any downloaded images will not be in the original resolution or quality. Other tools (like drive) fell short as they continued
to lock my data up.

At one point photos could be accessed from google drive, but that was also removed.

The exact order of events evades me but what was demonstrated time and time again was they wanted me stuck there.

I began to care more about security after realizing that I am the product if the service is free. Google can and will use
metadata it collects from photos. This includes not only location but facial recognition of you and anyone else in the photo.

because of general security concerns, I do not like giving facial recognition and location to any corporation, let alone google.

I began looking for alternatives. I do not want anyone
I take a photo of (directly or indirectly) being indexed. It is very big brother.

The final straw was when I ran out of space and was told I needed to buy more. So I cleaned up some data to buy some time, did a photos takeout
and begin my research.

# The solution

use [Syncthing](#syncthing) to copy originals from my phone to my server

use [picman](#picman) as a way to automatically import and organize the photos on my NAS

use [photoprism](#photoprism) as a webUI to look at photos

# syncthing

syncthing was chosen as a way to have more control over the photos being copied between devices. I didn't want any software in the middle modifying
the photo (resizing it like google docs, transcoding it, etc).

Most if not all photo solutions support an external folder, so I can just import the originals

syncthing is pretty straight forward to setup, so I wont go into the details here.

# picman

I wrote a program that lets me import photos into a folder structure of `Year/Month` by reading exif data

This program simply runs from a cron and imports from various syncthing sources

picman runs from a cronjob and imports photos every 30 minutes.

# photoprism

This is the interface I settled on.

It seems stable enough and does the job well. I turned off facial recognition and other AI type features.

I deploy this on my server using docker-compose


# honorable mention: Photostructure

I want to mention photostructure because I really liked the UI and UX, but I spent too much time
trying to get it working and be stable.

The TLDR is it would randomly hang and stop importing and I could never figure out know why. I think
it has some issues on large videos of large HEIC files.
