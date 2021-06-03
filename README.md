# Passky-Desktop
## What is Passky?
Passky is simple password manager, which works on a zero trust architecture. That means only user will be able to decrypt his passwords. So users can safely store their passwords on any server. That means if a server on where all passwords are stored get hacked, hacker won't be able to decrypt passwords and data on this server will be useless for him.

## Installation
### Windows
1. Download Passky installer (https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v2.0.0/passky-2.0.0.Setup.exe)
2. Run installer
3. Passky desktop application is now installed
### Debian based distros
```yaml
wget https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v2.0.0/passky_2.0.0_amd64.deb
sudo dpkg -i passky_2.0.0_amd64.deb
```
### Red Hat based distros
```yaml
wget https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v2.0.0/Passky-2.0.0-1.x86_64.rpm
sudo rpm -i Passky-2.0.0-1.x86_64.rpm
```
### Snap
[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/passky)
```yaml
sudo snap install passky
```
### AppImage
1. Download Passky (https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v2.0.0/passky-2.0.0.AppImage)
2. Start passky-2.0.0.AppImage
3. Passky desktop application is now installed
## Uninstall
### Windows
1. In the search box on the taskbar, type **Control Panel** and select it from the results.
2. Select **Programs > Programs and Features**.
3. Right click on the Passky and select **Uninstall or Uninstall/Change**.
### Debian based distros
```yaml
sudo dpkg -r passky
```
### Red Hat based distros
```yaml
sudo rpm -e passky
```
### Snap
```yaml
sudo snap remove passky
```
### AppImage
1. Move passky-2.0.0.AppImage to the trash
2. Empty your trash
