{
  description = "Desktop application for Passky";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    let
      supportedSystems = [ "x86_64-linux" "i686-linux" "aarch64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs supportedSystems ( system: f system );
    in

    {
      overlay = final: prev: 
        {
          passky =
            let
              electron = final.electron_13;
            in
            final.pkgs.mkYarnPackage rec {
              src = self;

              packageJSON = "${src}/package.json";
              yarnLock = "${src}/yarn.lock";

              nativeBuildInputs = [ final.makeWrapper ];

              yarnFlags = [ "--frozen-lockfile" "--offline" "--production" ];

              installPhase = ''
                runHook preInstall

                mkdir -p $out/share/passky
                cp -r ./deps/passky $out/share/passky/deps
                cp -r ./node_modules $out/share/passky

                for icon in $out/share/passky/deps/images/logo*.png; do
                  mkdir -p "$out/share/icons/hicolor/$(basename $icon .png)/apps"
                  ln -s "$icon" "$out/share/icons/hicolor/$(basename $icon .png)/apps/passky.png"
                done

                mkdir $out/share/applications
                ls -s ${desktopItem}/share/applications $out/share/applications

                makeWrapper ${electron}/bin/electron $out/bin/passky \
                  --add-flags $out/share/passky/deps/main.js

                  runHook postInstall
              '';

              distPhase = ":";

              desktopItem = final.pkgs.makeDesktopItem {
                name = "Passky";
                comment = "Simple and secure password manager";
                genericName = "Password Manager";
                exec = "passky %U";
                icon = "passky";
                type = "Application";
                desktopName = "Passky";
                categories = "GNOME;GTK;Utility;";
              };
          };
        };

      defaultPackage = forAllSystems (system: (import nixpkgs {
        inherit system;
        overlays = [ self.overlay ];
      }).passky);

      checks = forAllSystems (system: {
        build = self.defaultPackage.${system};
      });

      devShell = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in 
        pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs-14_x
            yarn
            yarn2nix
            electron
          ];
        }
      );
    };
}
