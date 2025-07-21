#!/usr/bin/env bash
cd "$(dirname "$0")/.."
cat pages.json | jq '.[] | .tags | .[]' -r | sort | uniq
