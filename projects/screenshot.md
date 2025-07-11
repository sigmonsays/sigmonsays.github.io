---
title: "screenshot"

---

Screenshot is a simple python script that has evolved over time. It started out as a shell script which called `import -window root screenshot.png` and has
evolved into a full featured application.

Github page - https://github.com/sigmonsays/screenshot/blob/master/README.md

The point of this post is to demonstrate how to setup screenshot and how to use it to achieve a few things

Installation

    git clone https://github.com/sigmonsays/screenshot.git
    sudo apt-get install -y xclip imagemagick
    cd screenshot
    sudo pip install .

Configuration

Edit `~/.screenshot/config.ini`

   [screenshot]
   use_clipboard = yes
   clipboard_method = s3
   capture_method = imagemagick

   [s3]
   enabled = yes
   bucket = my_bucket
   access_key = XXXX
   secret_key = XXXX

Flag summary

      Usage: screenshot [options]

      Options:
        -h, --help            show this help message and exit
        -c FILE, --config=FILE
                              config file
        -v, --verbose
        -l LOG_LEVEL, --log-level=LOG_LEVEL
                              set logging level [info]
        -s SUMMARY, --summary=SUMMARY
                              optional summary of picture
        -u UPLOADERS, --uploaders=UPLOADERS
                              enable specific uploaders
        -f FILENAME, --filename=FILENAME
                              use this file (or http address) instead of capturing


Usage

   screenshot whatever

This allows you to select a region of your screen and then uploads it
