check_login();

function import_passky(){

    check_login();

    let import_data = document.getElementById("import-passky-data").value;
    if(!isJsonValid(import_data)){
        changeDialog(2, 1);
        return;
    }

    let ido = JSON.parse(import_data);

    if(ido["encrypted"] == null || typeof(ido["encrypted"]) == 'undefined'){
        changeDialog(2, 1);
        return;
    }

    let passwords = [];
    let encrypted = false;
    if(ido["encrypted"]) encrypted = true;

    for(let i = 0, j = 0; i < ido["passwords"].length; i++){

        let website = ido["passwords"][i]["website"];
        let username = ido["passwords"][i]["username"];
        let password = (encrypted) ? CryptoJS.AES.decrypt(ido["passwords"][i]["password"], sessionStorage.password).toString(CryptoJS.enc.Utf8) : ido["passwords"][i]["password"];

        if(!isPasswordWebsiteValid(website)) continue;
        if(!isPasswordUsernameValid(username)) continue;
        if(!isPasswordPasswordValid(password)) continue;

        let duplicated = false;
        const current_passwords = JSON.parse(sessionStorage.passwords);
        for(let k = 0; k < current_passwords.length; k++){
            if(current_passwords[k]["website"] == website && current_passwords[k]["username"] == username && CryptoJS.AES.decrypt(current_passwords[k]["password"], sessionStorage.password).toString(CryptoJS.enc.Utf8) == password) duplicated = true;
        }
        if(duplicated) continue;

        passwords[j] = {};
        passwords[j]["website"] = website;
        passwords[j]["username"] = username;
        passwords[j]["password"] = CryptoJS.AES.encrypt(password, sessionStorage.password).toString();
        j++;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", sessionStorage.url + "/?action=importPasswords");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(sessionStorage.username + ":" + sha512(sessionStorage.password)));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(0, "Server is unreachable!");
                show('dialog');
                return;
            }

            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(0, "Server is unreachable!");
                show('dialog');
                return;
            }

            if(json['error'] != 0){
                changeDialog(0, errors[json['error']]);
                show('dialog');
                return;
            }

            if(json['error'] == 0){
                if(json['import_error'] == 0){
                    changeDialog(3, json['import_success'] + " passwords has been successfully imported!");
                    show('dialog');
                }else{
                    changeDialog(3, json['import_success'] + " passwords has been successfully imported, but " + json['import_error'] + " passwords has not been imported!");
                    show('dialog');
                }
            }
        }

    };
    xhr.send(JSON.stringify(passwords));
}

function backup_passky(){

    check_login();

    let passwords = JSON.parse(sessionStorage.passwords);
    for(let i = 0; i < passwords.length; i++) delete passwords[i]['id'];

    let backup_passky = { encrypted : true, passwords : passwords };

    downloadObjectAsJson(backup_passky, "passky_" + getDate(new Date()));
}

function export_passky(){

    check_login();

    let passwords = JSON.parse(sessionStorage.passwords);
    for(let i = 0; i < passwords.length; i++){
        delete passwords[i]['id'];
        passwords[i]['password'] = CryptoJS.AES.decrypt(passwords[i]['password'], sessionStorage.password).toString(CryptoJS.enc.Utf8);
    }

    let export_passky = { encrypted : false, passwords : passwords };

    downloadObjectAsJson(export_passky, "passky_" + getDate(new Date()));
}

function export_lastpass(){

    check_login();

    let export_data = "url,username,password,totp,extra,name,grouping,fav";
    let passwords = JSON.parse(sessionStorage.passwords);
    for(let i = 0; i < passwords.length; i++){
        export_data += "\n" + passwords[i]["website"] + "," + passwords[i]["username"] + "," + CryptoJS.AES.decrypt(passwords[i]["password"], sessionStorage.password).toString(CryptoJS.enc.Utf8) + ",,," + passwords[i]["website"] + ",,0";
    }

    downloadTxt(export_data, "lastpass_" + getDate(new Date()));
}

function changeDialog(style, text){
    switch(style){
        case 1:
            //Passky Import
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

            document.getElementById('dialog-title').innerText = "Import from Passky";

            document.getElementById('dialog-text').innerHTML = "<textarea id='import-passky-data' name='about' rows='3' class='max-w-lg bg-gray-100 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'></textarea>";

            document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = "Import";
            document.getElementById('dialog-button').onclick = () => import_passky();
        break;
        case 2:
            //Import Error
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = "ERROR";
            document.getElementById('dialog-text').innerText = "Data in import is invalid!";
    
            document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = "Try again";
            document.getElementById('dialog-button').onclick = () => changeDialog(text);
        break;
        case 3:
            //Import Success
            document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
    
            document.getElementById('dialog-title').innerText = "SUCCESS";
            document.getElementById('dialog-text').innerText = text;
    
            document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = "Okay";
            document.getElementById('dialog-button').onclick = () => refreshPasswords();
        break;
        default:
            //Error
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = "ERROR";
            document.getElementById('dialog-text').innerText = text;
    
            document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = "Okay";
            document.getElementById('dialog-button').onclick = () => hide('dialog');
        break;
    }
}