{ lib, config, ... }:
with lib;
let cfg = config.modules.neovim;
in {

  config = mkIf cfg.enable {

    programs.nixvim.plugins = {
      lint = {
        enable = true;
        lintersByFt = {
          #text = ["vale"];
          #markdown = ["vale"];
          #dockerfile = [ "hadolint" ];
          #terraform = [ "tflint" ];
          #python = [ "pylint" ];
        };
      };
    };

  };

}
