{ lib, pkgs, config, ... }:
with lib;
let cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {

    # programs.nixvim.plugins.neorg.enable = true;
    programs.nixvim.plugins.orgmode.enable = true;
    programs.nixvim.plugins.indent-o-matic.enable = true;

    # Markdown navigation
    programs.nixvim.plugins.mkdnflow.enable = true;

    programs.nixvim.plugins.chadtree.enable = true;

    programs.nixvim.extraConfigVim = ''
      "make < > shifts keep selection
      vnoremap < <gv
      vnoremap > >gv
    '';

    programs.nixvim.extraConfigLua = ''
      require('gomodifytags').setup({ })
    '';
    programs.nixvim.extraPlugins = [

      (pkgs.vimUtils.buildVimPlugin {
        name = "gomodifytags.nvim";
        doCheck = false;
        src = pkgs.fetchFromGitHub {
          owner = "zgs225";
          repo = "gomodifytags.nvim";
          rev = "60a9fa7";
          hash = "sha256-LsbQ07mtHTjFCvdxXQnaWHzZk+et/FyCxkY4hqM6HlE=";
        };
      })

    ];
  };

}
