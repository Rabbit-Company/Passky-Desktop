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
              electron = final.electron_14;
              packageJSON = final.lib.importJSON ./package.json;
            in
            final.stdenv.mkDerivation rec {
              pname = packageJSON.name;
              version = packageJSON.version;

              # Build from .deb because it's the only thing that works
              src = builtins.fetchurl {
                url = "https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v${version}/${pname}_${version}_amd64.deb";
              };

              nativeBuildInputs = with final; [
                # Use Nix libraries (buildInputs) instead of the ones in $out/lib
                # Crashes the app and I cannot find out why
                # autoPatchelfHook

                dpkg
                wrapGAppsHook
              ];

              # buildInputs = with final; [
                # alsa-lib
                # cups
                # libdrm
                # mesa
                # nspr
                # nss
                # xorg.libXdamage
                # xorg.libxshmfence
 
                # add if not using wrapGAppsHook
                # at-spi2-atk
                # at-spi2-core
                # atk
                # cairo
                # gdk-pixbuf
                # glib
                # gtk3
                # libxkbcommon
                # pango
                # xorg.libXcomposite
                # xorg.libXrandr
              # ];

              unpackPhase = ''
                runHook preUnpack

                # The deb contains setuid permission on 'chrome-sandbox'
                dpkg-deb --fsys-tarfile $src | tar -x --no-same-permissions --no-same-owner

                runHook postUnpack
              '';

              installPhase = ''
                runHook preInstall

                mkdir $out
                cp -r ./usr/* $out/

                runHook postInstall
              '';

              meta = with final.lib; {
                description = "The ultimate open-source password manager";
                homepage = "https://passky.org";
                platforms = supportedSystems;
                license = licenses.gpl3;
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

      nixosModules.passky = { pkgs, ... }: {
        nixpkgs.overlays = [ self.overlay ];
        environment.systemPackages = [ pkgs.passky ];
      };
      nixosModule = self.nixosModulesModules.passky;

      homeManagerModules.passky = { pkgs, ... }: {
        nixpkgs.overlays = [ self.overlay ];
        home.packages = [ pkgs.passky ];
      };
      homeManagerModule = self.homeManagerModules.passky;

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
