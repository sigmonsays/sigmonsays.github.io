{ lib, config, ... }:
with lib;
let cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {

    programs.nixvim.plugins.none-ls = {
      enable = true;
      sources = {
        code_actions = {
          gomodifytags.enable = true;
          impl.enable = true;
          statix.enable = true;
          gitsigns.enable = true;
        };
        diagnostics = {
          bean_check.enable = true;
          deadnix.enable = true;
          fish.enable = true;
          statix.enable = true;
          todo_comments.enable = true;
          #todo: Fix me: How can i disable specific lint errors?
          #
          yamllint.enable = true;
          codespell.enable = false;
        };
        formatting = {
          bean_format.enable = true;
          codespell.enable = true;
          fish_indent.enable = true;
          goimports.enable = true;
          gofumpt.enable = true;
          nixfmt.enable = false;
          shfmt.enable = true;
          stylua.enable = true;
        };
      };
    };

    programs.nixvim.plugins.conform-nvim = {
        enable = true;
        settings = {

          notify_no_formatters = true;

          formatters_by_ft = {
            lua = [ "stylua" ];
            go = [ "goimports" "gofmt" ];
            "_" = [ "trim_whitespace" ];
          };

          format_on_save = # Lua
              ''
                function(bufnr)
                  -- if vim.g.disable_autoformat or vim.b[bufnr].disable_autoformat then
                  --   return
                  -- end

                  -- if slow_format_filetypes[vim.bo[bufnr].filetype] then
                  --   return
                  -- end

                  local function on_format(err)
                    -- if err and err:match("timeout$") then
                    --   slow_format_filetypes[vim.bo[bufnr].filetype] = true
                    -- end
                  end

                  return { timeout_ms = 1000, lsp_fallback = true }, on_format
                 end
            '';
        };
    };

  };

}
