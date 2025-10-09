{
  lib,
  config,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {

      programs.nixvim.plugins.nix.enable = true;
  };

}
