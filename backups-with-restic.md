---
title: "backups with restic"
date: 2025/07/20
draft: false
---

building a safe and reliable backup strategy is critical to self hosting. The backup system has multiple levels of redundancy.

Some of the tools I use for a reliable and flexible backup system are restic and autorestic.

I setup a systemd unit to trigger on a timer that runs autorestic. This is a systemd template unit that allows
multiple scripts to be run from the same unit file.

How it finally ended being setup is interesting and may be more complicated than it needs to be but there is a reason for all of it.

First, I split each step of the backup up into its own script so I can monitor its success and duration.

The main entry point is the backup-job.service script which has its own timer unit to run daily at 3am.

The `backup-job.service` file

    [Unit]
    Description=backup-job

    [Service]
    Type=simple
    User=sig
    Group=users
    ExecStart=/data/backup-scripts/nix-wrapper.sh backup-job.sh
    RemainAfterExit=no

    [Install]
    WantedBy=multi-user.target

This script invokes nix-wrapper.sh that loads a nix environment into the shell and invokes the script, backup-job.sh

The `backup-job.sh` script

    #!/usr/bin/env bash

    cd /data/backup-scripts || exit 1
    echo started backup USER=$USER HOME=$HOME pwd=$(pwd)

    eval "$(direnv export bash)"

    run-unit.sh backup@hello || exit 1

    run-unit.sh backup@grepped-gitrepos || exit 1
    run-unit.sh backup@gen-manifest || exit 1

    run-unit.sh backup@backblaze || exit 1
    run-unit.sh backup@local || exit 1
    run-unit.sh backup@logseq || exit 1

    exit 0

The backup-job.sh script then loads the direnv environment which also has a envrc that loads a nix environment from shell.nix.
This means that any box I decide to run this on automatically installs all dependencies when the scripts are invoked.

The `backup@.service` file

    [Unit]
    Description=backup

    [Service]
    Type=simple
    User=sig
    Group=users
    ExecStart=/data/backup-scripts/nix-wrapper.sh backup-run.sh %i
    ExecStartPost=trackservice.sh backup-%i

    [Install]
    WantedBy=multi-user.target

the systemd template service invokes nix-wrapper.sh to load the nix environment, the invokes backup-run.sh with the appropriate script

The `nix-wrapper.sh` script

    #!/usr/bin/env bash
    source /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh
    script="$1"
    shift
    [ -z "$script" ] && exit 1
    set -x
    /data/backup-scripts/$script "$@"

The nix wrapper script just loads nix env into the shell and passes off control to the next script

The `backup-run.sh` script

    #!/usr/bin/env nix-shell
    #!nix-shell -i bash -p restic autorestic jq gnumake direnv

    # Run a backup-X.sh script where X is the name. this is invoked by systemd backup@ unit template

    if [ -z "$1" ]; then
            echo "usage: $0 I"
            echo "Where I is a script in PATH named backup-I.sh"
            exit 1
    fi
    cd /data/backup-scripts || exit 1
    echo started backup USER=$USER HOME=$HOME pwd=$(pwd)
    eval "$(direnv export bash)"
    start=$(date +%s)
    backup-$1.sh
    rc=$?
    end=$(date +%s)
    echo run backup-$1.sh finished with exit code $rc in $((end - start)) sec
    exit $rc

The backup-run.sh script does some basic logging and invokes the actual backup script

The actual work of each script is invoked from backup-run.sh and looks like this

Example `backup-logseq.sh` script

    #!/usr/bin/env bash
    mkdir -pv /data/backups/Logseq
    rsync -ar /home/sig/Sync/Logseq/ /data/backups/Logseq/
