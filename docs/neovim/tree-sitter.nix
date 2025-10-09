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
      treesitter = {
        enable = true;

        nixvimInjections = true;

        folding = true;
        settings = {
          indent.enable = true;
          highlight.enable = true;
          # ensure_installed = "all";
          auto_install = true;
        };
      };

      treesitter-refactor = {
        enable = true;
        highlightDefinitions = {
          enable = true;
          # Set to false if you have an `updatetime` of ~100.
          clearOnCursorMove = false;
        };
      };

      hmts.enable = true;
    };

  };

}
