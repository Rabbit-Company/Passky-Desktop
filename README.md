<h1 align="center">🔒 Passky Website 🔒</h1>

[![GitHub issues](https://img.shields.io/github/issues/Rabbit-Company/Passky-Desktop?color=blue&style=for-the-badge)](https://github.com/Rabbit-Company/Passky-Desktop/issues)
[![GitHub stars](https://img.shields.io/github/stars/Rabbit-Company/Passky-Desktop?style=for-the-badge)](https://github.com/Rabbit-Company/Passky-Desktop/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Rabbit-Company/Passky-Desktop?style=for-the-badge)](https://github.com/Rabbit-Company/Passky-Desktop/network)
[![GitHub license](https://img.shields.io/github/license/Rabbit-Company/Passky-Desktop?color=blue&style=for-the-badge)](https://github.com/Rabbit-Company/Passky-Desktop/blob/main/LICENSE)

### [Download from Official Website](https://passky.org/download)

## Passky Clients

   * [Website](https://github.com/Rabbit-Company/Passky-Website#installation)
   * [Browser Extension](https://github.com/Rabbit-Company/Passky-Browser-Extension#installation)
   * [Desktop Application](https://github.com/Rabbit-Company/Passky-Desktop#installation)
   * [Android Application](https://github.com/Rabbit-Company/Passky-Android#installation)

## What is Passky?

Passky is a simple, modern, lightweight, open source and secure password manager.

[![Passky - Password manager](https://img.youtube.com/vi/yrk6cHkgVA8/0.jpg)](https://www.youtube.com/watch?v=yrk6cHkgVA8 "Click to watch!")

## How Much Does it Cost?

Passky is a free, open-source password manager that simplifies your digital life. Both the free and premium plans include advanced security features such as two-factor authentication to ensure the safety and security of your sensitive data.

While the free plan allows you to store up to 100 passwords, the premium plan offers additional benefits such as the ability to store an unlimited number of passwords. [Upgrade to the premium plan](https://passky.org/pricing) to gain access to all of Passky's features and take your password security to the next level.

At Passky, we take your security seriously, and we don't compromise on safety when it comes to password management. [Sign up now](https://vault.passky.org/register) and experience the peace of mind that comes with using Passky.

## How it Works?

Passky uses a combination of advanced encryption methods to ensure the security of your data.

Passky is based on a **zero trust architecture** and uses advanced encryption methods such as **XChaCha20** and **Argon2id** to ensure the security of your sensitive data.

For sensitive data encryption, Passky uses **XChaCha20**, a state-of-the-art encryption algorithm that provides a **high level of security and performance**. This encryption method is designed to be **resistant to known-plaintext attacks and other forms of cryptanalysis**.

For master password hashing, Passky uses **Argon2id**, a password-hashing algorithm that has been recognized as the winner of multiple password-hashing competitions, such as the **[Password Hashing Competition (PHC)](https://www.password-hashing.net)** held by the community. It is designed to be **resistant to brute-force attacks**. This algorithm uses a combination of memory-hard and data-dependent techniques to make it difficult for attackers to guess your master password.

When you save your account information to Passky, **all sensitive data is fully encrypted** using **XChaCha20**. The encrypted data is then stored on Passky's servers.

When you try to access your account, Passky will prompt you to input your master password. The master password is then hashed using **Argon2id** algorithm to ensure its security. The hashed master password is then used to decrypt the sensitive data, allowing you to access your account.

In summary, **Passky uses advanced encryption methods such as XChaCha20 and Argon2id** to ensure the security of your sensitive data and master password, making it difficult for anyone to access your information without your permission.

## How Does Passky Compare to the Competition?

Feature | Passky | Bitwarden | NordPass | Dashlane | 1Password | LastPass
--- | :---: | :---: | :---: | :---: | :---: | :---: |
Premium Price | $${\color{orange}\$2/month}$$ | $${\color{green}\$0.83/month}$$ | $${\color{orange}1.99€/month}$$ | $${\color{orange}2€/month}$$ | $${\color{red}\$2.99/month}$$ | $${\color{red}2.90€/month}$$ |
Number of Passwords | $${\color{green}Unlimited}$$ | $${\color{green}Unlimited}$$ | $${\color{green}Unlimited}$$ | $${\color{green}Unlimited}$$ | $${\color{green}Unlimited}$$ | $${\color{green}Unlimited}$$
Two-factor Authentication | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{green}Yes}$$
Zero-knowledge architecture | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{green}Yes}$$
Encryption | $${\color{green}XChaCha20/Argon2id}$$ | $${\color{orange}AES-256/PBKDF2}$$ | $${\color{green}XChaCha20/Argon2id}$$ | $${\color{orange}AES-256/PBKDF2}$$ | $${\color{orange}AES-256/PBKDF2}$$ | $${\color{orange}AES-256/PBKDF2}$$
Open-Source | $${\color{green}Yes}$$ | $${\color{green}Yes}$$ | $${\color{red}No}$$ | $${\color{red}No}$$ | $${\color{red}No}$$ | $${\color{red}No}$$
Customization | $${\color{green}Yes}$$ | $${\color{red}No}$$ | $${\color{red}No}$$ | $${\color{red}No}$$ | $${\color{red}No}$$ | $${\color{red}No}$$

> Comparison data accurate as of January 25th, 2023

# Installation

## Windows

### Microsoft Store
1. Open Microsoft Store
2. Search for [Passky](https://www.microsoft.com/store/apps/9NRCP6HPPB82)
3. Click on install

### Manually
1. Download [Passky installer](https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v8.1.2/Passky.Setup.8.1.2.exe) or [Passky portable](https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v8.1.2/Passky.8.1.2.exe)
2. Run downloaded .exe file
3. Passky desktop application is now installed

## MacOS

1. Download [Passky-8.1.2.dmg](https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v8.1.2/Passky-8.1.2.dmg)
2. Open the downloaded file
3. Drag the app to the Applications folder to install it

## Linux

### Debian based distros
```yaml
wget https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v8.1.2/passky_8.1.2_amd64.deb
sudo dpkg -i passky_8.1.2_amd64.deb
```

### Red Hat based distros
```yaml
wget https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v8.1.2/passky-8.1.2.x86_64.rpm
sudo rpm -i passky-8.1.2.x86_64.rpm
```

### Flathub
<a href='https://flathub.org/apps/details/com.rabbit_company.passky'><img width='240' alt='Download on Flathub' src='https://flathub.org/assets/badges/flathub-badge-en.png'/></a>
```yaml
flatpak install flathub com.rabbit_company.passky
```

### Snap
[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/passky)
```yaml
sudo snap install passky
```

### AppImage
1. Download [Passky-8.1.2.AppImage](https://github.com/Rabbit-Company/Passky-Desktop/releases/download/v8.1.2/Passky-8.1.2.AppImage)
2. Open the downloaded file

### AUR (community maintained)
[![git](https://img.shields.io/aur/version/passky-desktop-git)](https://aur.archlinux.org/packages/passky-desktop-git)
```yaml
yay -S passky-desktop-git
```
