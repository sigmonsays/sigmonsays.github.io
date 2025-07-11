#!/usr/bin/env bash

THEME=ananke

hugo server \
    --bind 0.0.0.0 -w -d ../tmp --theme=$THEME  --buildDrafts
