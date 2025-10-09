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
      plugins = {


        lsp = {
          enable = true;

          keymaps = {
            silent = true;
            diagnostic = {
              # Navigate in diagnostics
              "<leader>k" = "goto_prev";
              "<leader>j" = "goto_next";
            };

            lspBuf = {
              gd = "definition";
              gD = "references";
              gt = "type_definition";
              gi = "implementation";
              K = "hover";
              "<F2>" = "rename";
            };
          };

          servers = {
            gopls.enable = true;
            # golangci-lint-ls.enable = true;
            lua_ls.enable = true;
            nil_ls.enable = true;
            pyright.enable = true;
            pylsp.enable = true;
            # tflint.enable = true;
            templ.enable = true;
            html.enable = true;
            htmx.enable = true;
            tailwindcss.enable = true;
            rust_analyzer = {
              enable = true;
              installCargo = false;
              installRustc = false;
            };
          };
        };
      };
    };

  };

}
