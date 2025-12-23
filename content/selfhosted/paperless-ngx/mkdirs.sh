#!/usr/bin/env bash
#
# grep /srv docker-compose.yml  |awk -F'[ :]+' '{print $3}'
sudo mkdir -pv /srv/paperlessngx/redis-data
sudo mkdir -pv /srv/paperlessngx/postgresql-data
sudo mkdir -pv /srv/paperlessngx/paperless-data
sudo mkdir -pv /srv/paperlessngx/paperless-media
sudo mkdir -pv /srv/paperlessngx/export
sudo mkdir -pv /srv/paperlessngx/consume

sudo chown 1000 /srv/paperlessngx/export
sudo chown 1000 /srv/paperlessngx/consume
