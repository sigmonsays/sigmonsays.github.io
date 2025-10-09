{
  lib,
  config,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {
    programs.nixvim = {
      plugins.tagbar = {
        enable = true;
        settings.width = 50;
      };

      keymaps = [
        {
          mode = "n";
          key = "<C-g>";
          action = ":TagbarToggle<cr>";
          options.silent = true;
        }
      ];
    };

  };

}
