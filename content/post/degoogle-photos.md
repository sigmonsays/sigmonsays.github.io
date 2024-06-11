+++
date = "2024-06-11T01:02:03-07:00"
draft = true
title = "my alternative to google photos"

tags = [ "degoogle", "photos" ]

+++

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Introduction](#introduction)
- [Walled garden](#walled-garden)
- [syncthing](#syncthing)
- [The solution](#the-solution)

<!-- markdown-toc end -->


# Introduction

Google photos was amazing in the beginning, the photos application did what I wanted and in general it was a good experience

I was an early adopter, so I had a lifetime of photos stored in google photos. 

# Walled garden

they stopped supporting integrations and tightened the walled garden.

I was trying to use rclone to backup my photos, then removed the ability to access the originals. That is via the API any downloaded images will not be in the original resolution or quality. Other tools fell short as they continued to lock my data up. Google drive used to show photos as well but that was removed.

The exact order of events evades me but what was demonstrated time and time again was they wanted me stuck there. 

The final straw was when I ran out of space and was told I needed to buy new. So I cleaned up some data to buy some time, did a photos takeout
and begin my research.

# syncthing

syncthing was chosen as a way to have more control over the photos being copied between devices. I didn't want any software in the middle modifying
the photo (resizing it like google docs, transcoding it, etc).

Most if not all photo solutions support an external folder, so I can just import the originals

# picman

I wrote a program that lets me import photos into a folder structure of `Year/Month` by reading exif data

This program simply runs from a cron and imports from various syncthing sources

# photoprism

This is the interface I settled on. 

It seems stable enough and does the job well.

# Photostructure

I want to mention photostructure but I spent so much time trying to get it working

It would randomly hang and stop importing and I dont know why

