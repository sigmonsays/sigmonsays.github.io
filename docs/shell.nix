{ pkgs ? import <nixpkgs> {} }:

with pkgs; mkShell {
  # LOCALE_ARCHIVE = "${glibcLocales}/lib/locale/locale-archive";
  # LOCALE_ARCHIVE_2_27 = "${glibcLocales}/lib/locale/locale-archive";
  buildInputs = [
    zs
    minify
    #docutils
    #python310Packages.docutils # for rst2html
    #glibcLocales
  ];
}
