---
title: "picman: photo sorting tool"

---

github https://github.com/sigmonsays/picman

I wrote a basic tool to replace my krufty bash scripts that imports my photos from various locations into
their final resting place.

The tool operates in steps where each step is kind of idempotent. The set of all steps is called
a workflow and operates on a single file. see [code](https://github.com/sigmonsays/picman/blob/dev/autosort/workflow.go#L18).

Each step operates on the same workflow object, which primarily has a state object

State Object [code](https://github.com/sigmonsays/picman/blob/dev/core/statefile.go#L26)
- holds exif data
- holds file stat information
- holds date metadata that is obtained via exif or other logic
- holds checksum and logs of processing the file

Steps in order
- StartWorkflow - logs a start workflow
- CheckSupportedType - returns core.StopProcessing if file type is not supported
- PopulateExif - obtains exif data via json
- CheckExif - abandons file processing if it's a text file or if we have no exif data
- ObtainDateTaken - gets data taken by looking at various exif data fields
- ChecksumFile - obtain checksum of file
- GenerateFinalName - generate a destination file name based on date taken
- CopyFile - copy file to final destination

This process makes it very easy to build tools up around various photo imports.

Finally this tool writes a json summary of how many files were copied if you need to re-index
external photo stores. This allows better integration with tooling like photoprism/photostructure.

# Additional notes

This tool with syncthing and photoprism has solved my photo needs without relying on a cloud storage
service or photo hosting provider. I own my own photos and have originals backed up at all times.

photo backups are taken daily via restic and stored encrypted in a cloud storage provider (currently backblaze)
