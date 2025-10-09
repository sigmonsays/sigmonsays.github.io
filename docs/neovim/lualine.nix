{
  lib,
  config,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {

    programs.nixvim.plugins.lualine = {
      enable = true;

      settings = {
        extensions = [ "fzf" ];
        globalstatus = true;

        # +-------------------------------------------------+
        # | A | B | C                             X | Y | Z |
        # +-------------------------------------------------+
        sections = {
          lualine_a = ["mode"];
          lualine_b = ["branch"];
          lualine_c = ["filename" "diff"];

          lualine_x = [
            "diagnostics"

            # Show active language server
            {
              __raw = ''
                function()
                    local msg = ""
                    local buf_ft = vim.api.nvim_buf_get_option(0, 'filetype')
                    local clients = vim.lsp.get_active_clients()
                    if next(clients) == nil then
                        return msg
                    end
                    for _, client in ipairs(clients) do
                        local filetypes = client.config.filetypes
                        if filetypes and vim.fn.index(filetypes, buf_ft) ~= -1 then
                            return client.name
                        end
                    end
                    return msg
                end
              '';
              color = {
                fg = "#ffffff";
              };
            }

            # Add macro recording status to lualine_x section
            {
              __raw = ''
                function()
                    local recording_register = vim.fn.reg_recording()
                    if recording_register == "" then
                        return ""
                    else
                        return "Recording @" .. recording_register
                    end
                end
              '';
              color = {
                fg = "#ff0000"; # Red color to make it noticeable
              };
            }
            "encoding"
            "fileformat"
            "filetype"
          ];
        };
      };
    };

  };

}
