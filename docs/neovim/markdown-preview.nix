{
  lib,
  config,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {

    programs.nixvim.plugins.markdown-preview = {
      enable = true;

      settings = {
        # auto_close = 1;
        theme = "dark";
      };
    };

  };

}
