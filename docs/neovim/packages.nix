{
  lib,
  config,
  pkgs,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {
    home.packages = with pkgs; [
      universal-ctags
      gotags
    ];
  };

}
