---
title: "bracketed paste"
date: 2026/02/04
draft: false
tags: [ "bash" ]
---

Bracketed paste is a feature in modern terminal emulators and Readline (used by Bash 5.1+) that
protects users when pasting text, especially multi-line commands.


Key Aspects of Bracketed Paste:

- Safety: Prevents accidentally executing malicious or unintended commands, as the shell
will not execute the text until you press Enter.

- Highlighting: Pasted text is often highlighted (inverted) to indicate it was pasted
and needs confirmation.

- Default Behavior: Enabled by default in Readline 8.1 / Bash 5.1 and newer.

# Example

To check if your terminal has bracketed pasted enabled

    bind -v | grep enable-bracketed-paste



# Paste Script

I discovered the bracketed paste feature when wanting to copy and paste urls to download into a terminal.

Instead of just repeatedly pasting urls, I thought, why can't I just capture the paste event and automatically download?

example `bracketed-paste.sh` script

    #!/usr/bin/env bash

    function capture_paste {

        # Save current terminal settings
        local state=$(stty -g)
        # Turn off keyboard input echo
        stty -echo

        # Enable bracketed paste
        printf '\e[?2004h' >&2

        # Read the input
        IFS= read -r input

        # Disable bracketed paste
        printf '\e[?2004l' >&2

        # Strip bracketed paste markers if present
        input="${input#$'\e[200~'}"
        input="${input%$'\e[201~'}"

        # restore state
        stty "$state"

        echo "$input"
    }

    while true
    do
        echo
        echo "Paste or type something:"
        result=$(capture_paste)
        echo "Result: $result"
    done


write this to a file and make this script executable, run it, paste something, hit enter, and you'll get some
output.
