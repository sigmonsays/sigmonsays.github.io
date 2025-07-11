{
  description = "my flake";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    (flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };

        in
        {
          packages.default = pkgs.callPackage ./. { };
          devShells.default = import ./shell.nix { inherit pkgs; };
        })
    );
}
