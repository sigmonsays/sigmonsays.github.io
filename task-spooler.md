---
title: "task spooler"
date: 2025/08/25
draft: false
---

# Task Spooler

website https://viric.name/soft/ts/

The task spooler program is quite old, I used it back in the early 2000s for managing s3 uploads but it's a tool
I use intermittently today.

Some basic operations

    # clear task list of completed jobs
    ts -C

    # show max concurrency
    ts -S

    # set max concurrency
    ts -S 4

    # kill queue
    ts -K

    # Get job output, job id 1
    ts -c 1


`ts-wait-all` script waits for all jobs in the queue to finish:

    ts -l | awk '$1 ~ /^[0-9]+$/ {print $1}' | xargs -I^ ts -w ^


# A quick example

`job.sh` script:

    #!/usr/bin/env bash

    url="$1"
    cd "$(dirname "$0")"
    mkdir -p out
    cd out
    wget --mirror --convert-links --adjust-extension --page-requisites --no-parent "$1"

hard reset the queue (kills all jobs)

    ts -K       # kill queue and all existing jobs

Then fill the queue

    ts -C       # clear queue, just finished jobs, starting fresh
    ts -S 2     # Set job concurrency to 2
    ts ./job.sh https://viric.name/soft/ts/
    ts ./job.sh https://linux.die.net/man/8/sudo
    ts ./job.sh https://linux.die.net/man/1/pstree

jobs can be listed and added at any time

    ts -l

Finally if you care to you can wait for it all to finish

    ts-wait-all

# Capturing exit code

One way to capture the exit code of the jobs is to write a finish script,

`finish.sh`:

    #!/usr/bin/env bash
    # arguments: jobid errorlevel output_filename command
    echo "$@" >> jobs.log

set TS_ONFINISH:

    export TS_ONFINISH=./finish.sh

Try re-running the example above with TS_ONFINISH set, you'll generate a log file similar to this

    0 0 /tmp/ts-out.6aJiVM ./job.sh https://viric.name/soft/ts/
    1 1 /tmp/ts-out.OlL66T ./job.sh https://linux.die.net/man/8/sudo
    2 0 /tmp/ts-out.S1GWSK ./job.sh https://linux.die.net/man/1/pstree
