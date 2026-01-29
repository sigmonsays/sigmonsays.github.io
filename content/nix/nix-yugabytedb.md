---
title: "yugabytedb on nix"
date: 2026/1/28
tags: [ "nix" ]
---

<!--toc:start-->
- [intro](#intro)
- [binary install](#binary-install)
- [yugabyte nix package](#yugabyte-nix-package)
- [shell.nix file](#shellnix-file)
<!--toc:end-->



# intro

I wanted to run yugabytedb on nix and could not find it packaged, so I needed to make my own derivation.

This post is how I achieved that.

# binary install

I looked at vault-bin as an example of how to do the installation as yugabytedb is distributed as a tarball
of binaries.

# yugabyte nix package

I created the following file after a little trial and error and with the help of claude.ai


    { pkgs ? import <nixpkgs> {} }:

    pkgs.stdenv.mkDerivation rec {
      pname = "yugabytedb";
      version = "2025.2.0.1";

      src = pkgs.fetchurl {
        url = "https://software.yugabyte.com/releases/${version}/yugabyte-${version}-b1-linux-x86_64.tar.gz";
        sha256 = "sha256-9wNK8a9fX7VmD/qr0ZmMkaoEiK43YRjnYccMSvjsC34=";
      };

      dontConfigure = true;
      dontBuild = true;
      dontStrip = true;
      dontPatchELF = true;
      dontPatchShebangs = true;

      buildInputs = with pkgs; [
        stdenv.cc.cc.lib
        openssl
        zlib
        python3
        libkrb5
      ];

      # Yugabyte's tarball comes with a folder inside.
      # We just move everything to $out.
      installPhase = ''
        mkdir -p $out
        rm bin/post_install.sh
        cp -vr . $out/

      '';

      meta = with pkgs.lib; {
        description = "High-performance distributed SQL database";
        homepage = "https://www.yugabyte.com/";
        license = licenses.asl20;
        platforms = [ "x86_64-linux" ];
      };
    }

# shell.nix file

shell.nix because I plan to run this in nix-direnv

    { pkgs ? import <nixpkgs> {} }:

    with pkgs;
    let
      yugabytedb = callPackage ./pkg/yugabytedb.nix {};
    in
    mkShell {
      buildInputs = [
        overmind
        yugabytedb
      ];
    }

# startup scripts

run-yugabyte.sh shell script

    #!/usr/bin/env bash
    iface="$(ip route show default |awk '/default via/ {print $5}')"
    ip="$(ip -br a show dev $iface | awk -F'[/ ]+' '{print $3}')"
    set -x
    yugabyted start --advertise_address $ip --daemon=false --base_dir ~/yugabyte
