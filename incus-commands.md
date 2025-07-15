---
title: "incus commands"
date: 2025/07/14
tags: linux
---

Instances

    incus list
    incus stop -f svc1
    incus start svc1
    incus rm -f lab1
    incus exec lab1 bash


copy files into or out of instances

    incus file push -r /home/sig/.dotfiles/ video/home/sig/.dotfiles

Images

    incus image list
    incus image refresh


# ZFS Storage Pool

create zfs storage pool

    incus storage create pool1 zfs

change size of zfs storage pool

    incus storage set pool1 size "200GiB"

see storage pool parameters

    incus storage show pool1

This is where you see the current size of the pool. also, can easily see storage use via zpool list

    zpool list


# ZFS Hacks

migrate failed due to me restarting incus daemon

i could cleanup the target volume

    zfs list
    sudo zfs destroy pool1/virtual-machines/move-of-13669488997282970863
    sudo zfs destroy pool1/virtual-machines/move-of-13669488997282970863.block

# Storage Volumes

list all volumes

    incus storage volume list default


remove extra disk volume from VM

    # detach from instance
    incus storage volume detach default dev2-disk1 dev2

    # delete volume
    incus storage volume delete default custom/dev2-disk1

move instance into new storage pool

    incus stop dev2
    incus move dev2 --storage pool1
    incus start dev2


get info on storage volume (virtual machine instance)

    incus storage volume info default virtual-machine/dev2


# Storage Volumes Bulk Operations

bulk delete custom storage volumes

    incus storage show default \
     | grep custom |awk -F/ '{print $7}' \
     | xargs -r -n1 incus storage volume delete default


# Profiles

    incus profile list
    incus profile edit default
    incus profile delete default

Edit cloud-init configuration here
assign default networks


# Web UI

enable web UI

    incus config set core.https_address :8443

open https://server:8443/

see https://blog.simos.info/how-to-install-and-setup-the-incus-web-ui/
