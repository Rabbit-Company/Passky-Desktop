module.exports = {
    "packagerConfig": {},
    "makers": [
      {
        "name": '@electron-forge/maker-appx',
        "config": {
          "publisher": 'CN=52198C2F-725A-42E5-855A-FB2F0CA67875',
          "publisherDisplayName": "Rabbit Company LLC",
          "identityName": "57225RabbitCompanyLLC.Passky"
        }
      },
      {
        "name": "@electron-forge/maker-squirrel",
        "config": {
          "name": "Passky",
          "title": "Passky",
          "exe": "Passky.exe",
          "description": "Simple and secure password manager",
          "iconUrl": "https://raw.githubusercontent.com/Rabbit-Company/Passky-Desktop/main/images/logo.ico",
          "setupIcon": "images/logo.ico"
        }
      },
      {
        "name": "@electron-forge/maker-zip",
        "platforms": [
          "darwin"
        ]
      },
      {
        "name": "@electron-forge/maker-deb",
        "config": {
          "options": {
            "name": "Passky",
            "productName": "Passky",
            "maintainer": "Rabbit Company",
            "homepage": "https://rabbit-company.com",
            "description": "Simple and secure password manager",
            "productDescription": "Passky is simple password manager, which works on a zero trust architecture. That means only user will be able to decrypt his passwords. So users can safely store their passwords on any server. That means if a server on where all passwords are stored get hacked, hacker won't be able to decrypt passwords and data on this server will be useless for him.",
            "genericName": "Password Manager",
            "icon": "images/logo.png"
          }
        }
      },
      {
        "name": "@electron-forge/maker-rpm",
        "config": {
          "options": {
            "name": "Passky",
            "productName": "Passky",
            "maintainer": "Rabbit Company",
            "homepage": "https://rabbit-company.com",
            "description": "Simple and secure password manager",
            "productDescription": "Passky is simple password manager, which works on a zero trust architecture. That means only user will be able to decrypt his passwords. So users can safely store their passwords on any server. That means if a server on where all passwords are stored get hacked, hacker won't be able to decrypt passwords and data on this server will be useless for him.",
            "genericName": "Password Manager",
            "icon": "images/logo.png"
          }
        }
      }
    ]
}