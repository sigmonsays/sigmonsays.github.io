{
  lib,
  config,
  ...
}:
with lib; let
  cfg = config.modules.neovim;
in {
  options.modules.neovim = {
    enable = mkEnableOption "neovim";
  };

  imports = [
    # Core
    ./template.nix
    ./packages.nix
    ./core.nix

    # everything else (alphabetical)
    ./autocommands.nix
    #./barbar.nix
    ./color.nix
    ./comment.nix
    ./completion.nix
    ./golang.nix
    # ./gitblame.nix
    # ./harpoon.nix
    # ./indent-o-matic.nix
    ./keymappings.nix
    ./lastplace.nix
    # ./lazygit.nix
    # ./lint.nix
    ./lint.nix
    ./lsp.nix
    ./lualine.nix
    ./markdown-preview.nix
    ./misc.nix
    ./nix.nix
    # ./noice.nix
    ./oil.nix
    ./options.nix
    ./tagbar.nix
    ./telescope.nix
    ./todo.nix
    ./tree-sitter.nix
    ./unsorted.nix
    ./which-key.nix
  ];

}
