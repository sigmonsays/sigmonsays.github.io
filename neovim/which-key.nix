{
  lib,
  pkgs,
  config,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {
  config = mkIf cfg.enable {
      programs.nixvim.plugins = {
        which-key = {
          enable = true;
        };
      };
  };
}
