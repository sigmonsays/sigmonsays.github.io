{
  lib,
  config,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {
    programs.nixvim.plugins = {

      web-devicons.enable = true;

      oil = {
        enable = true;
        settings = {
          skip_confirm_for_simple_edits = true;
          keymaps = {
          "<C-l>" = false;
          "<C-r>" = "actions.refresh";
          "y." = "actions.copy_entry_path";
          };
        };
      };
    };

  };

}
