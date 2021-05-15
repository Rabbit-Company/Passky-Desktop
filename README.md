# Passky-Desktop
## What is Passky?
Passky is simple password manager, which works on a zero trust architecture. That means only user will be able to decrypt his passwords. So users can safelly store their passwords on any server. That means if a server on where all passwords are stored get hacked, hacker won't be able to decrypt passwords and data on this server will be useless for him.

Please be aware that this project is still work in progress.

## Installation
### Windows
1. Download Passky installer (https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v1.0.0/passky-1.0.0.Setup.exe)
2. Run installer
3. Passky desktop application is now installed
### Debian based distros
```yaml
wget https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v1.0.0/passky_1.0.0_amd64.deb
sudo dpkg -i passky_1.0.0_amd64.deb
```
### Red Hat based distros
```yaml
wget https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v1.0.0/Passky-1.0.0-1.x86_64.rpm
sudo rpm -i Passky-1.0.0-1.x86_64.rpm
```
### Snap
```yaml
sudo snap install passky
```
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
