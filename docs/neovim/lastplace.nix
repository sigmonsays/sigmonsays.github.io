{
  lib,
  config,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {
    programs.nixvim.plugins.lastplace.enable = true;
  };

}
