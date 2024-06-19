{
  description = "A flake for building randosay";

  inputs.nixpkgs.url = github:NixOS/nixpkgs/nixos-24.05;
  inputs.nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs = {
    self,
    nixpkgs,
    nixpkgs-unstable
  }: let
    systems = [
      "x86_64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
      "aarch64-linux"
    ];
    forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
    suffix-version = version: attrs: nixpkgs.lib.mapAttrs' (name: value: nixpkgs.lib.nameValuePair (name + version) value) attrs;
    suffix-stable = suffix-version "-24.05";
  in {
    packages.x86_64-linux.default = self.packages.x86_64-linux.randosay;
    packages.x86_64-linux.randosay =
      # Notice the reference to nixpkgs here.
      with import nixpkgs { system = "x86_64-linux"; };
      stdenv.mkDerivation {
        name = "randosay";
        src = self;
        installPhase = "TMP=$(mktemp -d) && cp randosay $TMP/randosay && chmod 555 $TMP/randosay && mkdir -p $out/bin && install -vt $out/bin $TMP/randosay";
      };
  };
}
