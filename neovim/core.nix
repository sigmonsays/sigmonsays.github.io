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
      programs.nixvim = {
        enable = true;
        viAlias = true;
        vimAlias = true;
        luaLoader.enable = true;
      };
  };
}
