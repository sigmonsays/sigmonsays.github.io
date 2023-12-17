{ pkgs ? import <nixpkgs> {} }:

with pkgs; mkShell {
  buildInputs = [
        hugo
        #docutils # for rst2html
  ];
}
