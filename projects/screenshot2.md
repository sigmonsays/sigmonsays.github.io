---
title: "screenshot2"
date: 2024/02/04
---

screenshot2 is a simple golang program which is a rewrite of the python version. I wrote install
in go because of the single file binary.

Github page https://github.com/sigmonsays/screenshot2/blob/master/README.md

The point of this post is to demonstrate how to setup screenshot2 and how to use it to achieve a few things

Configuration

Edit `~/.screenshot.yaml`

    datadir: Pictures/screenshot
    writeurlfile: true
    capture:
        command: import
    upload:
        interface: s3
        access_key: XXX
        secret_key: XXX
        bucket: sigmonsays

Replace XXX with your access_key and secret_key

# Usage

   screenshot capture -s whatever

This allows you to select a region of your screen and then uploads it
