---
title: "self extracting shell script"
date: 2025/08/28
---

Quick script to build a self extracting archive, which can be useful for deploying multiple assets and running a script
on a remote machine.



`selfextract/header`:
```
#!/usr/bin/env bash

# Define a temporary directory for extraction
TMPDIR=$(mktemp -d /tmp/selfextract.XXXXXX)

# Find the line number where the archive starts
ARCHIVE_START_LINE=$(awk '/^__ARCHIVE_BELOW__/ {print NR + 1; exit 0; }' "$0")

# Extract the archive to the temporary directory
tail -n+"$ARCHIVE_START_LINE" "$0" | tar xzv -C "$TMPDIR"

echo "working in $TMPDIR"

# Optional: Run a script or command from the extracted data
# For example, if you have an 'install.sh' script in the archive:
# "$TMPDIR/install.sh"
cd "$TMPDIR"
"$TMPDIR/install.sh"

# Clean up the temporary directory (optional, depending on your needs)
# rm -rf "$TMPDIR"


exit 0

__ARCHIVE_BELOW__


```


`Makefile`:
```
ARCHIVES = $(shell ls stuff*_linux_amd64.tar.gz)

all:
	tar zcf archive.tar.gz service.env service.service install.sh $(ARCHIVES)
	cp ./selfextract/header archive.sh
	cat archive.tar.gz >> archive.sh
	rm -f archive.tar.gz
	chmod +x archive.sh
```


`install.sh`:
```
#!/usr/bin/env bash
mkdir -pv /etc/oasd
cp oasd.env /etc/oasd/oasd.env
cp oasd.service /etc/systemd/system/oasd.service

archive=$(ls -1 stuff_*_linux_amd64.tar.gz | head -n1)
if [ ! -z "$archive" ]; then
    tar vzxf "$archive"
    sudo cp oasd /usr/bin/oasd
    sudo chmod +x /usr/bin/oasd
fi

systemctl daemon-reload
systemctl enable oasd
systemctl restart oasd
```
