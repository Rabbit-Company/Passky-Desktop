if(!isSessionValid()) window.location.href = 'index.html';

document.getElementById("passwords-link").innerText = lang[localStorage.lang]["passwords"];
document.getElementById("import-export-link").innerText = lang[localStorage.lang]["import_export"];
document.getElementById("settings-link").innerText = lang[localStorage.lang]["settings"];
document.getElementById("signout-link").innerText = lang[localStorage.lang]["signout"];

document.getElementById("passwords-link-mobile").innerText = lang[localStorage.lang]["passwords"];
document.getElementById("import-export-link-mobile").innerText = lang[localStorage.lang]["import_export"];
document.getElementById("settings-link-mobile").innerText = lang[localStorage.lang]["settings"];
document.getElementById("signout-link-mobile").innerText = lang[localStorage.lang]["signout"];

document.getElementById("label-theme").innerText = lang[localStorage.lang]["theme"];
document.getElementById("label-session-duration").innerText = lang[localStorage.lang]["session_duration"];

document.getElementById("delete-account-title").innerText = lang[localStorage.lang]["delete_account"];
document.getElementById("delete-account-text").innerText = lang[localStorage.lang]["delete_account_info"];
document.getElementById("delete-account-btn").innerText = lang[localStorage.lang]["delete_account"];

document.getElementById("dialog-button-cancel").innerText = lang[localStorage.lang]["cancel"];

document.getElementById("settings-lang").value = localStorage.lang;
document.getElementById("settings-theme").value = localStorage.theme;
document.getElementById("settings-session").value = localStorage.sessionDuration;

if(localStorage.secret.length > 10){
    document.getElementById("toggle-2fa-btn").innerText = lang[localStorage.lang]["disable"];
    document.getElementById("toggle-2fa-btn").className = "dangerButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
}else{
    document.getElementById("toggle-2fa-btn").innerText = lang[localStorage.lang]["enable"];
    document.getElementById("toggle-2fa-btn").className = "successButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
}

let minutes = document.getElementsByClassName("addMinutes");
for(let i = 0; i < minutes.length; i++) minutes[i].innerText = minutes[i].innerText + " " + lang[localStorage.lang]["minutes"];

function deleteAccount(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", localStorage.url + "/?action=deleteAccount");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.username + ":" + sha512(localStorage.password)));
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;
            
            const json = JSON.parse(xhr.responseText);

            if(json['error'] != 0){
                changeDialog(2, errors[localStorage.lang][json['error']]);
                show('dialog');
                return;
            }
            
            logout();
        }

    };
    xhr.send("otp=" + encodeURIComponent(localStorage.secret));
}

function enable2fa(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", localStorage.url + "/?action=enable2fa");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.username + ":" + sha512(localStorage.password)));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;
            
            const json = JSON.parse(xhr.responseText);
            
            if(json['error'] != 0){
                changeDialog(2, errors[localStorage.lang][json['error']]);
                show('dialog');
                return;
            }

            let codes = json['codes'].split(';');
            let backupCodes = "<ul>";
            for(let i = 0; i < codes.length; i += 2){
                backupCodes += "<li>" + codes[i] + " " + codes[i+1] + "</li>";
            }
            backupCodes += "</ul>";

            let html = lang[localStorage.lang]["scan_qr_code"] + "<div style='padding: 20px; background-color: white;'><div id='qrcode'></div></div> " + lang[localStorage.lang]["or_enter_key_manually"] + " <b>" + json['secret'] + "</b></br></br>" + lang[localStorage.lang]["backup_codes"] + " <b>" + backupCodes + "</b>";

            changeDialog(3, html);
            new QRCode(document.getElementById("qrcode"), json['qrcode']);
            show('dialog');
        }

    };
    xhr.send();
}

function disable2fa(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", localStorage.url + "/?action=disable2fa");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.username + ":" + sha512(localStorage.password)));
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;
            
            const json = JSON.parse(xhr.responseText);
            
            if(json['error'] != 0){
                changeDialog(2, errors[localStorage.lang][json['error']]);
                show('dialog');
                return;
            }

            localStorage.secret = false;
            location.reload();
        }

    };
    xhr.send("otp=" + encodeURIComponent(localStorage.secret));
}

function changeDialog(style, text){
    switch(style){
        case 1:
            //Delete account dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["delete_account"];
            document.getElementById('dialog-text').innerText = lang[localStorage.lang]["delete_account_confirmation"];
    
            document.getElementById('dialog-button-cancel').style.display = 'initial';

            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["delete"];
            document.getElementById('dialog-button').onclick = () => deleteAccount();
        break;
        case 2:
            //Error dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["error"];
            document.getElementById('dialog-text').innerText = text;
    
            document.getElementById('dialog-button-cancel').style.display = 'none';

            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["okay"];
            document.getElementById('dialog-button').onclick = () => hide("dialog");
        break;
        case 3:
            //Enable 2fa dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'> <path stroke='none' d='M0 0h24v24H0z' fill='none'/> <path d='M7 16h-4l3.47 -4.66a2 2 0 1 0 -3.47 -1.54' /> <path d='M10 16v-8h4' /> <line x1='10' y1='12' x2='13' y2='12' /> <path d='M17 16v-6a2 2 0 0 1 4 0v6' /> <line x1='17' y1='13' x2='21' y2='13' /></svg>";

            document.getElementById('dialog-title').innerText = "Two-Factor Authentication (2FA)";
            document.getElementById('dialog-text').innerHTML = text;

            document.getElementById('dialog-button-cancel').style.display = 'none';

            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["signout"];
            document.getElementById('dialog-button').onclick = () => logout();
        break;
        case 4:
            //Enable 2fa confirmation dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'> <path stroke='none' d='M0 0h24v24H0z' fill='none'/> <path d='M7 16h-4l3.47 -4.66a2 2 0 1 0 -3.47 -1.54' /> <path d='M10 16v-8h4' /> <line x1='10' y1='12' x2='13' y2='12' /> <path d='M17 16v-6a2 2 0 0 1 4 0v6' /> <line x1='17' y1='13' x2='21' y2='13' /></svg>";

            document.getElementById('dialog-title').innerText = "Two-Factor Authentication (2FA)";
            document.getElementById('dialog-text').innerHTML = lang[localStorage.lang]["enable_2fa_question"] + "<br/><br/>" + lang[localStorage.lang]["totp_applications"] + " <b>Aegis</b>, <b>Google Auth</b>, <b>Authy</b>...";

            document.getElementById('dialog-button-cancel').style.display = 'initial';

            document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["enable"];
            document.getElementById('dialog-button').onclick = () => enable2fa();
        break;
        case 5:
            //Disable 2fa confirmation dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'> <path stroke='none' d='M0 0h24v24H0z' fill='none'/> <path d='M7 16h-4l3.47 -4.66a2 2 0 1 0 -3.47 -1.54' /> <path d='M10 16v-8h4' /> <line x1='10' y1='12' x2='13' y2='12' /> <path d='M17 16v-6a2 2 0 0 1 4 0v6' /> <line x1='17' y1='13' x2='21' y2='13' /></svg>";

            document.getElementById('dialog-title').innerText = "Two-Factor Authentication (2FA)";
            document.getElementById('dialog-text').innerHTML = lang[localStorage.lang]["disable_2fa_question"];

            document.getElementById('dialog-button-cancel').style.display = 'initial';

            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["disable"];
            document.getElementById('dialog-button').onclick = () => disable2fa();
        break;
    }
}

document.getElementById("settings-lang").addEventListener("change", () => {
    localStorage.lang = document.getElementById("settings-lang").value;
    location.reload();
});

document.getElementById("settings-theme").addEventListener("change", () => {
    localStorage.theme = document.getElementById("settings-theme").value;
    document.getElementById("css-theme").href = "css/themes/" + localStorage.theme + ".css";
});

document.getElementById("settings-session").addEventListener("change", () => {
    localStorage.sessionDuration = document.getElementById("settings-session").value;
    location.reload();
});

document.getElementById("delete-account-btn").addEventListener("click", () => {
    changeDialog(1);
    show('dialog');
});

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

document.getElementById("toggle-2fa-btn").addEventListener("click", () => {
    if(localStorage.secret.length > 10){
        changeDialog(5);
        show('dialog');
    }else{
        changeDialog(4);
        show('dialog');
    }
});