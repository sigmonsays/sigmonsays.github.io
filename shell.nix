{ pkgs ? import <nixpkgs> {} }:

# let
#      pkgs = import (builtins.fetchGit {
#          name = "old-hugo";
#          url = "https://github.com/NixOS/nixpkgs/";
#          ref = "refs/heads/nixpkgs-unstable";
#          rev = "c8e344196154514112c938f2814e809b1ca82da1";
#      }) {};

#      oldHugo = pkgs.hugo;
# in
#   with pkgs; mkShell {
#     buildInputs = [
#       oldHugo
#     ];
#   }

with pkgs; mkShell {
  buildInputs = [
        hugo
  ];
}
