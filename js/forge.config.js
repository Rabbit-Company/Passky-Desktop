module.exports = {
    "packagerConfig": {},
    "makers": [
      {
        "name": '@electron-forge/maker-appx',
        "config": {
          "publisher": 'CN=52198C2F-725A-42E5-855A-FB2F0CA67875',
          "publisherDisplayName": "Rabbit Company LLC",
          "identityName": "57225RabbitCompanyLLC.Passky",
          "assets": "images"
        }
      },
      {
        "name": "@electron-forge/maker-squirrel",
        "config": {
          "name": "Passky",
          "title": "Passky",
          "exe": "Passky.exe",
          "description": "Simple, modern, open source and secure password manager.",
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
            "description": "Simple, modern, open source and secure password manager.",
            "productDescription": "Simple, modern, open source and secure password manager.",
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
            "description": "Simple, modern, open source and secure password manager.",
            "productDescription": "Simple, modern, open source and secure password manager.",
            "genericName": "Password Manager",
            "icon": "images/logo.png"
          }
        }
      }
    ]
}