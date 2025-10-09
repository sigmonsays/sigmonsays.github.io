{ lib, config, ... }:
with lib;
let cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {
    programs.nixvim = {
      opts.completeopt = [ "menu" "menuone" "noselect" ];

      plugins = {
        luasnip.enable = true;
        cmp-omni.enable = true;
        cmp-dap.enable = true;
        cmp-nvim-lsp.enable = true;
        # cmp-nvim-lsp-signature-help.enable = true;
        lsp-signature.enable = true;

        lspkind = {
          enable = true;

          cmp = {
            enable = true;
            menu = {
              nvim_lsp = "[LSP]";
              nvim_lua = "[api]";
              path = "[path]";
              luasnip = "[snip]";
              buffer = "[buffer]";
              neorg = "[neorg]";
              cmp_tabby = "[Tabby]";
            };
          };
        };

        cmp = {
          enable = true;

          settings = {
            snippet.expand =
              "function(args) require('luasnip').lsp_expand(args.body) end";

            mapping = {
              "<C-d>" = "cmp.mapping.scroll_docs(-4)";
              "<C-f>" = "cmp.mapping.scroll_docs(4)";
              "<C-Space>" = "cmp.mapping.complete()";
              "<C-e>" = "cmp.mapping.close()";
              # "<Tab>" = "cmp.mapping(cmp.mapping.select_next_item(), {'i', 's'})";
              # "<S-Tab>" = "cmp.mapping(cmp.mapping.select_prev_item(), {'i', 's'})";
              "<C-j>" =
                "cmp.mapping(cmp.mapping.select_next_item(), {'i', 's'})";
              "<C-k>" =
                "cmp.mapping(cmp.mapping.select_prev_item(), {'i', 's'})";
              "<CR>" = "cmp.mapping.confirm({ select = true })";
            };

            sources = [
              { name = "path"; }
              { name = "nvim_lsp"; }
              # { name = "nvim_lsp_signature_help"; }
              { name = "lsp_signature"; }
              { name = "cmp_tabby"; }
              { name = "luasnip"; }
              {
                name = "buffer";
                # Words from other open buffers can also be suggested.
                option.get_bufnrs.__raw = "vim.api.nvim_list_bufs";
              }
              { name = "neorg"; }
            ];
          };
        };

        # cuda
        #cmp-tabby.settings.host = "http://10.10.10.5:8080";
      };
    };

  };

}
