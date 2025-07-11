#!/usr/bin/env sh


pathmunge "$(pwd)/bin"

which hugo

# Print a list of tags for all pages and how many times the tag is used
function page_tag_summary {
    sift tags content/  |awk -F= '{print $2}' | tr -d '[]",' | tr " " "\n" |sort |grep -v ^$ |uniq -c |sort -n
}
