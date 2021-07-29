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
              packageJSON = final.lib.importJSON ./package.json;
            in
            final.stdenv.mkDerivation rec {
              pname = packageJSON.name;
              version = packageJSON.version;

              src = builtins.fetchurl {
                url = "https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v${version}/${pname}-${version}.AppImage";
                name = "${pname}-${version}.AppImage";
              };

              appimageContents = final.appimageTools.extractType2 {
                name = "${pname}-${version}";
                inherit src;
              };

              dontUnpack = true;
              dontConfigure = true;
              dontBuild = true;

              nativeBuildInputs = [ final.makeWrapper ];

              installPhase = ''
                runHook preInstall
                mkdir -p $out/bin $out/share/${pname} $out/share/applications
                cp -a ${appimageContents}/{locales,resources} $out/share/${pname}
                cp -a ${appimageContents}/${pname}.desktop $out/share/applications/${pname}.desktop
                cp -a ${appimageContents}/usr/share/icons $out/share
                substituteInPlace $out/share/applications/${pname}.desktop \
                  --replace 'Exec=AppRun' 'Exec=${pname}'
                runHook postInstall
              '';

              postFixup = ''
                makeWrapper ${electron}/bin/electron $out/bin/${pname} \
                  --add-flags $out/share/${pname}/resources/app.asar \
                  --prefix LD_LIBRARY_PATH : "${final.lib.makeLibraryPath [ final.stdenv.cc.cc ]}"
              '';

              meta = with final.lib; {
                description = "Simple and secure password manager.";
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
