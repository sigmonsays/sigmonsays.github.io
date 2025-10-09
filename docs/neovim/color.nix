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
      colorschemes = {
        gruvbox = {
          enable = false;
          settings = {
            transparent_mode = false;
          };
        };

        catppuccin = {
          enable = true;
          settings = {
            flavour = "mocha";
              integrations = {
                cmp = true;
                gitsigns = true;
                nvimtree = true;
                treesitter = true;
                notify = false;
              };
          };
        };
        kanagawa = {
          enable = false;
          settings = {
            colors = {
              palette = {
                fujiWhite = "#FFFFFF";
                sumiInk0 = "#000000";
              };
              theme = {
                all = {
                  ui = {
                    bg_gutter = "none";
                  };
                };
                dragon = {
                  syn = {
                    parameter = "yellow";
                  };
                };
                wave = {
                  ui = {
                    float = {
                      bg = "none";
                    };
                  };
                };
              };
            };
            commentStyle = {
              italic = true;
            };
            compile = false;
            dimInactive = false;
            functionStyle = { };
            overrides = "function(colors) return {} end";
            terminalColors = true;
            theme = "wave";
            transparent = false;
            undercurl = true;
          };
        };
      };

    };

  };

}
