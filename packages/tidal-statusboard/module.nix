{
  dream2nix,
  config,
  lib,
  nixpkgs,
  ...
}: {
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-lock
    dream2nix.modules.dream2nix.nodejs-granular
  ];

  name = "tidal-statusboard";
  version = "1.0.0";

  deps = {nixpkgs, ...}: {
    inherit
      (nixpkgs)
      stdenv
      ;
  };

  mkDerivation = {
    src = ./.;
  };
}
