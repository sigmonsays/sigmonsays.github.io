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

      fzf-lua.enable = true;
      todo-comments.enable = true;
      #todo: look into trouble
      #trouble.enable = true;


      gitsigns = {
        enable = true;
        settings.signs = {
          add.text = "+";
          change.text = "~";
        };
      };

      transparent.enable = false;

      web-devicons.enable = true;

      nvim-autopairs.enable = true;
      nvim-surround.enable = true;


      trim = {
        enable = true;
        settings = {
          highlight = false;
          ft_blocklist = [
            "checkhealth"
            "floaterm"
            "lspinfo"
            "TelescopePrompt"
          ];
        };
      };

    };

  };

}
