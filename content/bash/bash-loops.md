---
title: "looping a files lines in bash"
date: 2026/04/07
draft: true
tags: [ "bash" ]
---

looping a file should be easy in bash but once you start making things more complicated, your solution is often the wrong one.


    # Loop a file, line by line
    # supports lines with spaces
    # supports a program in the loop that can read from stdin

    while IFS= read -r line <&3 || [[ -n "$line" ]]; do
        # Skip empty lines and lines starting with #
        [[ -z "$line" || "$line" == \#* ]] && continue
        echo "'$line'"
        (
            cd ..
            my-thing.sh "$line"
        )
    done 3< todo.txt
