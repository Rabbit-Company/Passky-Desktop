if (readData('passwords') !== null && typeof(readData('passwords')) !== 'undefined') {
  const passwords = JSON.parse(readData('passwords'));
  for (let i = 0; i < passwords.length; i++) {
    const id = passwords[i].id;
    const website = CryptoJS.AES.decrypt(passwords[i].website, decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8);
    const username = CryptoJS.AES.decrypt(passwords[i].username, decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8);
    const password = CryptoJS.AES.decrypt(passwords[i].password, decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8);
    const message = CryptoJS.AES.decrypt(passwords[i].message, decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8);

    const data = id + ";;;" + website + ";;;" + username + ";;;" + password + ";;;" + message;

    document.getElementById("copy-username-" + id).addEventListener("click", () => {
      copyToClipboard(username);
      changeDialog(7, 1);
      show('dialog');
    });

    document.getElementById("copy-password-" + id).addEventListener("click", () => {
      copyToClipboard(password);
      changeDialog(7, 2);
      show('dialog');
    });

    document.getElementById("edit-password-" + id).addEventListener("click", () => {
      changeDialog(4, data);
      show('dialog');
    });

    document.getElementById("delete-password-" + id).addEventListener("click", () => {
      changeDialog(6, id);
      show('dialog');
    });
  }
}