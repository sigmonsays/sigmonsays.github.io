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
      highlight.Todo = {
        fg = "Blue";
        bg = "Yellow";
      };

      match.TODO = "TODO";

      keymaps = [
        {
          mode = "n";
          key = "<C-t>";
          action.__raw = ''
            function()
              require('telescope.builtin').live_grep({
                default_text="TODO",
                initial_mode="normal"
              })
            end
          '';
          options.silent = true;
        }
      ];
    };

  };

}
