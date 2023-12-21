+++
date = "2023-12-20T06:07:08-07:00"
draft = false
title = "nix tip: shell shabang"
tags = [ "nix" ]

+++

A feature I discovered recently is that nix-shell can be used as an interpreter

    #!/usr/bin/env nix-shell
    #!nix-shell -i bash -p bash htop

    echo hello world
    which htop

It even works for python

    #!/usr/bin/env nix-shell
    #!nix-shell -i python3 -p python3Packages.pillow python3Packages.ansicolor

    # scale image by 50%
    import sys, PIL.Image, ansicolor
    path = sys.argv[1]
    image = PIL.Image.open(path)
    factor = 0.5
    image = image.resize((round(image.width * factor), round(image.height * factor)))
    path = path + ".s50.jpg"
    image.save(path)
    print(ansicolor.green(f"done {path}"))

Discovered on the wiki page at https://nixos.wiki/wiki/Nix-shell_shebang
