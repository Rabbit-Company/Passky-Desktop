initStorageCache.then(() => {

    if(!isSessionValid()) window.location.href = 'index.html';

    document.getElementById("passwords-link").innerText = lang[readData('lang')]["passwords"];
    document.getElementById("import-export-link").innerText = lang[readData('lang')]["import_export"];
    document.getElementById("settings-link").innerText = lang[readData('lang')]["settings"];
    document.getElementById("signout-link").innerText = lang[readData('lang')]["signout"];
    
    document.getElementById("passwords-link-mobile").innerText = lang[readData('lang')]["passwords"];
    document.getElementById("import-export-link-mobile").innerText = lang[readData('lang')]["import_export"];
    document.getElementById("settings-link-mobile").innerText = lang[readData('lang')]["settings"];
    document.getElementById("signout-link-mobile").innerText = lang[readData('lang')]["signout"];
    
    document.getElementById("passky-backup-btn-text").innerText = lang[readData('lang')]["backup"];
    
    document.getElementById("passky-import-btn-text").innerText = lang[readData('lang')]["import"];
    document.getElementById("lastpass-import-btn-text").innerText = lang[readData('lang')]["import"];
    document.getElementById("bitwarden-import-btn-text").innerText = lang[readData('lang')]["import"];
    
    document.getElementById("passky-export-btn-text").innerText = lang[readData('lang')]["export"];
    document.getElementById("lastpass-export-btn-text").innerText = lang[readData('lang')]["export"];
    
    document.getElementById("dialog-button-cancel").innerText = lang[readData('lang')]["cancel"];

});

function import_passky(){

    if(!isSessionValid()) window.location.href = 'index.html';

    let imported_data = document.getElementById("import-data").value;
    if(!isJsonValid(imported_data)){
        changeDialog(2, 1, 0);
        return;
    }

    let ido = JSON.parse(imported_data);

    if(ido["encrypted"] == null || typeof(ido["encrypted"]) == 'undefined'){
        changeDialog(2, 1, 0);
        return;
    }

    let passwords = [];
    let encrypted = false;
    if(ido["encrypted"]) encrypted = true;

    for(let i = 0, j = 0; i < ido["passwords"].length; i++){

        let website = ido["passwords"][i]["website"];
        let username = ido["passwords"][i]["username"];
        let password = (encrypted) ? CryptoJS.AES.decrypt(ido["passwords"][i]["password"], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8) : ido["passwords"][i]["password"];
        let message = (encrypted) ? CryptoJS.AES.decrypt(ido["passwords"][i]["message"], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8) : ido["passwords"][i]["message"];
        if(message == null) message = "";

        if(!isPasswordWebsiteValid(website)) continue;
        if(!isPasswordUsernameValid(username)) continue;
        if(!isPasswordPasswordValid(password)) continue;
        if(!isPasswordMessageValid(message)) continue;

        let duplicated = false;
        const current_passwords = JSON.parse(readData('passwords'));
        for(let k = 0; k < current_passwords.length; k++){
            if(current_passwords[k]["website"] == website && current_passwords[k]["username"] == username && CryptoJS.AES.decrypt(current_passwords[k]["password"], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8) == password){
                duplicated = true;
                break;
            }
        }
        if(duplicated) continue;

        passwords[j] = {};
        passwords[j]["website"] = website;
        passwords[j]["username"] = username;
        passwords[j]["password"] = CryptoJS.AES.encrypt(password, decryptPassword(readData('password'))).toString();
        passwords[j]["message"] = CryptoJS.AES.encrypt(message, decryptPassword(readData('password'))).toString();
        j++;
    }

    import_data(passwords);
}

function backup_passky(){

    if(!isSessionValid()) window.location.href = 'index.html';

    let passwords = JSON.parse(readData('passwords'));
    for(let i = 0; i < passwords.length; i++) delete passwords[i]['id'];

    let backup_passky = { encrypted : true, passwords : passwords };

    downloadObjectAsJson(backup_passky, "passky_" + getDate(new Date()));
}

function export_passky(){

    if(!isSessionValid()) window.location.href = 'index.html';

    let passwords = JSON.parse(readData('passwords'));
    for(let i = 0; i < passwords.length; i++){
        delete passwords[i]['id'];
        passwords[i]['password'] = CryptoJS.AES.decrypt(passwords[i]['password'], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8);
        if(passwords[i]['message'] != null && typeof(passwords[i]['message']) != 'undefined'){
            passwords[i]['message'] = CryptoJS.AES.decrypt(passwords[i]['message'], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8);
        }
    }

    let export_passky = { encrypted : false, passwords : passwords };

    downloadObjectAsJson(export_passky, "passky_" + getDate(new Date()));
}

function import_lastpass(){

    if(!isSessionValid()) window.location.href = 'index.html';

    let ido = "";
    try{
        ido = $.csv.toArrays(document.getElementById("import-data").value)
    }catch{
        changeDialog(2, 1, 0);
        return;
    }

    let passwords = [];
    for(let i = 1, j = 0; i < ido.length; i++){
        let website = ido[i][0].replace("http://", "").replace("https://", "").replace("www.", "").replace(" ", "-");
        if(website.slice(-1) == '/') website = website.slice(0, -1);
        let username = ido[i][1];
        let password = ido[i][2];
        let message = ido[i][4];

        if(!isPasswordWebsiteValid(website)) continue;
        if(!isPasswordUsernameValid(username)) continue;
        if(!isPasswordPasswordValid(password)) continue;
        if(!isPasswordMessageValid(message)) continue;

        let duplicated = false;
        const current_passwords = JSON.parse(readData('passwords'));
        for(let k = 0; k < current_passwords.length; k++){
            if(current_passwords[k]["website"] == website && current_passwords[k]["username"] == username && CryptoJS.AES.decrypt(current_passwords[k]["password"], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8) == password){
                duplicated = true;
                break;
            }
        }
        if(duplicated) continue;

        passwords[j] = {};
        passwords[j]["website"] = website;
        passwords[j]["username"] = username;
        passwords[j]["password"] = CryptoJS.AES.encrypt(password, decryptPassword(readData('password'))).toString();
        passwords[j]["message"] = CryptoJS.AES.encrypt(message, decryptPassword(readData('password'))).toString();
        j++;
    }
    import_data(passwords);
}

function export_lastpass(){

    if(!isSessionValid()) window.location.href = 'index.html';

    let exportedPasswords = [];
    let passwords = JSON.parse(readData('passwords'));
    for(let i = 0; i < passwords.length; i++){
        exportedPasswords[i] = {};
        exportedPasswords[i].url = passwords[i]["website"];
        exportedPasswords[i].username = passwords[i]["username"];
        exportedPasswords[i].password = CryptoJS.AES.decrypt(passwords[i]["password"], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8);
        exportedPasswords[i].totp = null;
        exportedPasswords[i].extra = CryptoJS.AES.decrypt(passwords[i]["message"], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8);
        exportedPasswords[i].name = passwords[i]["website"];
        exportedPasswords[i].grouping = null;
        exportedPasswords[i].fav = 0;
    }
    downloadTxt($.csv.fromObjects(exportedPasswords), "lastpass_" + getDate(new Date()));
}

function import_bitwarden(){

    if(!isSessionValid()) window.location.href = 'index.html';

    let imported_data = document.getElementById("import-data").value;
    if(!isJsonValid(imported_data)){
        changeDialog(2, 1, 2);
        return;
    }

    let ido = JSON.parse(imported_data);

    if(ido["encrypted"] == null || typeof(ido["encrypted"]) == 'undefined' || ido["encrypted"] == true){
        changeDialog(2, 1, 2);
        return;
    }

    if(ido["items"] == null || typeof(ido["items"]) == 'undefined'){
        changeDialog(2, 1, 2);
        return;
    }

    let passwords = [];
    for(let i = 0, j = 0; i < ido["items"].length; i++){
        if(ido["items"][i]["type"] != 1) continue;

        let website = ido["items"][i]["name"];
        if(typeof(ido["items"][i]["login"]["uris"]) != 'undefined' && typeof(ido["items"][i]["login"]["uris"][0]) != 'undefined' && typeof(ido["items"][i]["login"]["uris"][0]["uri"]) != 'undefined'){
            website = ido["items"][i]["login"]["uris"][0]["uri"];
        }
        
        website = website.replace("http://", "").replace("https://", "").replace("www.", "").replace(" ", "-");
        if(website.slice(-1) == '/') website = website.slice(0, -1);
        let username = ido["items"][i]["login"]["username"];
        let password = ido["items"][i]["login"]["password"];
        let message = ido["items"][i]["login"]["notes"];
        if(message == null) message = "";

        if(!isPasswordWebsiteValid(website)) continue;
        if(!isPasswordUsernameValid(username)) continue;
        if(!isPasswordPasswordValid(password)) continue;
        if(!isPasswordMessageValid(message)) continue;

        let duplicated = false;
        const current_passwords = JSON.parse(readData('passwords'));
        for(let k = 0; k < current_passwords.length; k++){
            if(current_passwords[k]["website"] == website && current_passwords[k]["username"] == username && CryptoJS.AES.decrypt(current_passwords[k]["password"], decryptPassword(readData('password'))).toString(CryptoJS.enc.Utf8) == password){
                duplicated = true;
                break;
            }
        }
        if(duplicated) continue;

        passwords[j] = {};
        passwords[j]["website"] = website;
        passwords[j]["username"] = username;
        passwords[j]["password"] = CryptoJS.AES.encrypt(password, decryptPassword(readData('password'))).toString();
        passwords[j]["message"] = CryptoJS.AES.encrypt(message, decryptPassword(readData('password'))).toString();
        j++;
    }
    import_data(passwords);
}

function import_data(passwords){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", readData('url') + "/?action=importPasswords");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(readData('username') + ":" + sha512(decryptPassword(readData('password')))));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(0, lang[readData('lang')]["server_unreachable"]);
                show('dialog');
                return;
            }

            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(0, lang[readData('lang')]["server_unreachable"]);
                show('dialog');
                return;
            }

            if(json['error'] != 0){
                changeDialog(0, errors[readData('lang')][json['error']]);
                show('dialog');
                return;
            }

            if(json['error'] == 0){
                if(json['import_error'] == 0){
                    changeDialog(3, lang[readData('lang')]["import_success"].replace("{success_number}", json['import_success']));
                    show('dialog');
                }else{
                    changeDialog(3, lang[readData('lang')]["import_errors"].replace("{success_number}", json['import_success']).replace("{error_number}", json['import_error']));
                    show('dialog');
                }
            }
        }

    };
    xhr.send(JSON.stringify(passwords));
}

function changeDialog(style, text, text2){
    switch(style){
        case 1:
            //Import Dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

            document.getElementById('dialog-text').innerHTML = "<textarea id='import-data' name='about' rows='3' class='max-w-lg shadow-sm block w-full p-2 sm:text-sm rounded-md focus:outline-none'></textarea>";

            document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[readData('lang')]["import"];

            switch(text){
                case 0:
                    document.getElementById('dialog-title').innerText = lang[readData('lang')]["import_from"].replace("{name}","Passky");
                    document.getElementById('import-data').placeholder = "Paste data from Passky's exported file.";
                    document.getElementById('dialog-button').onclick = () => import_passky();
                break;
                case 1:
                    document.getElementById('dialog-title').innerText = lang[readData('lang')]["import_from"].replace("{name}","Lastpass");
                    document.getElementById('import-data').placeholder = "Paste data from Lastpass's exported file.";
                    document.getElementById('dialog-button').onclick = () => import_lastpass();
                break;
                case 2:
                    document.getElementById('dialog-title').innerText = lang[readData('lang')]["import_from"].replace("{name}","Bitwarden");
                    document.getElementById('import-data').placeholder = "Paste data from Bitwarden's exported file.";
                    document.getElementById('dialog-button').onclick = () => import_bitwarden();
                break;
            }
        break;
        case 2:
            //Import Error
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[readData('lang')]["error"];
            document.getElementById('dialog-text').innerText = lang[readData('lang')]["import_invalid"];
    
            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[readData('lang')]["try_again"];
            document.getElementById('dialog-button').onclick = () => changeDialog(text, text2);
        break;
        case 3:
            //Import Success
            document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[readData('lang')]["success"];
            document.getElementById('dialog-text').innerText = text;
    
            document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[readData('lang')]["okay"];
            document.getElementById('dialog-button').onclick = () => refreshPasswords();
        break;
        default:
            //Error
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[readData('lang')]["error"];
            document.getElementById('dialog-text').innerText = text;
    
            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[readData('lang')]["okay"];
            document.getElementById('dialog-button').onclick = () => hide('dialog');
        break;
    }
}

document.getElementById("signout-link").addEventListener("click", () => {
    logout();
});

document.getElementById("signout-link-mobile").addEventListener("click", () => {
    logout();
});

document.getElementById("main-menu-toggle-btn").addEventListener("click", () => {
    toggleMenu();
});

document.getElementById("dialog-button-cancel").addEventListener("click", () => {
    hide('dialog');
});

document.getElementById("passky-import-btn").addEventListener("click", () => {
    changeDialog(1, 0);
    show('dialog');
});

document.getElementById("passky-backup-btn").addEventListener("click", () => {
    backup_passky();
});

document.getElementById("passky-export-btn").addEventListener("click", () => {
    export_passky();
});

document.getElementById("lastpass-import-btn").addEventListener("click", () => {
    changeDialog(1, 1);
    show('dialog');
});

document.getElementById("lastpass-export-btn").addEventListener("click", () => {
    export_lastpass();
});

document.getElementById("bitwarden-import-btn").addEventListener("click", () => {
    changeDialog(1, 2);
    show('dialog');
});