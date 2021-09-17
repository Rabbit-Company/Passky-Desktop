if(isSessionValid()) window.location.href = 'passwords.html';

if(localStorage.url !== null && typeof(localStorage.url) !== 'undefined') document.getElementById('passky-server').value = localStorage.url;
if(localStorage.username !== null && typeof(localStorage.username) !== 'undefined') document.getElementById('username').value = localStorage.username;

//Languages
document.getElementById("passky-server").placeholder = lang[localStorage.lang]["server"];
document.getElementById("username").placeholder = lang[localStorage.lang]["username"];
document.getElementById("password").placeholder = lang[localStorage.lang]["password"];
document.getElementById("btn_signin").innerText = lang[localStorage.lang]["signin"];
document.getElementById("btn_signup").innerText = lang[localStorage.lang]["signup"];
document.getElementById("forgot_username").innerText = lang[localStorage.lang]["forgot_username"];

document.getElementById("login_form").addEventListener("submit", e => {
    e.preventDefault();
    login_check();
});

document.getElementById("btn_signup").addEventListener("click", () => {
    window.location.href = "register.html";
});

document.getElementById("forgot_username").addEventListener("click", () => {
    changeDialog(2);
    show("dialog");
});

function changeDialog(style, text){
    switch(style){
        case 1:
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
        case 2:
            //Forgot username
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["forgot_username"];
            document.getElementById('dialog-text').innerHTML = "<input id='fu_server' name='fu_server' list='servers' type='text' autocomplete='server' class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-t-md relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm' placeholder='Server'><input id='fu_email' name='fu_email' type='email' autocomplete='email' class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-b-md relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm' placeholder='Email'>";
    
            document.getElementById("fu_server").placeholder = lang[localStorage.lang]["server"];
            document.getElementById("fu_email").placeholder = lang[localStorage.lang]["email"];

            if(localStorage.url !== null && typeof(localStorage.url) !== 'undefined') document.getElementById("fu_server").value = localStorage.url;

            document.getElementById('dialog-button-cancel').style.display = 'initial';

            document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["send"];;
            document.getElementById('dialog-button').onclick = () => forget_username();

            document.getElementById("dialog-button-cancel").onclick = () => hide("dialog");
        break;
        case 3:
            //Email sent successfully
            document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["success"];

            document.getElementById('dialog-text').innerText = lang[localStorage.lang]["email_sent_success"];
    
            document.getElementById('dialog-button-cancel').style.display = 'none';

            document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["okay"];
            document.getElementById('dialog-button').onclick = () => hide('dialog');
        break;
    }
}

function login_check(){

    const url = document.getElementById("passky-server").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const otp = document.getElementById("otp").value;

    if(url.length == 0 || username.length == 0 || password.length == 0) return;

    if(!/^[a-z0-9.]{6,30}$/i.test(username)){
        changeDialog(1, errors[localStorage.lang]["12"]);
        show('dialog');
        return;
    }

    if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&,_\(\)\=\-\.])[A-Za-z\d@$!%*#?&,_\(\)\=\-\.]{8,255}$/i.test(password)){
        changeDialog(1, errors[localStorage.lang]["5"]);
        show('dialog');
        return;
    }

    if(!validURL(url)){
        changeDialog(1, lang[localStorage.lang]["url_invalid"]);
        show('dialog');
        return;
    }

    if(otp.length != 0 && otp.length != 6 && otp.length != 44){
        changeDialog(1, lang[localStorage.lang]["otp_contains"] + "\n" + lang[localStorage.lang]["otp_not_setup"]);
        show('dialog');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + "/?action=getPasswords");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + sha512(password)));
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(1, lang[localStorage.lang]["server_unreachable"]);
                show('dialog');
                return;
            }
            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(1, lang[localStorage.lang]["server_unreachable"]);
                show('dialog');
                return;
            }

            if(json['error'] != 0 && json['error'] != 8){
                changeDialog(1, errors[localStorage.lang][json['error']]);
                show('dialog');
                return;
            }

            if(json['error'] == 0){
                let passwords = json['passwords'];
                for(let i = 0; i < passwords.length; i++){
                    passwords[i].password = CryptoJS.AES.decrypt(passwords[i].password, password).toString(CryptoJS.enc.Utf8);
                    if(passwords[i].message == null || typeof(passwords[i].message) == 'undefined'){
                        passwords[i].message = "";
                    }else{
                        passwords[i].message = CryptoJS.AES.decrypt(passwords[i].message, password).toString(CryptoJS.enc.Utf8);
                    }
                }
                localStorage.passwords = JSON.stringify(passwords);
            }else{
                localStorage.passwords = "{}";
            }

            localStorage.url = url;
            localStorage.username = username;
            localStorage.password = password;
            localStorage.secret = json['secret'];
            localStorage.auth = json['auth'];
            localStorage.yubico = json['yubico'];
            localStorage.loginTime = new Date().getTime();

            window.location.href = 'passwords.html';
        }

    };
    xhr.send("otp=" + encodeURIComponent(otp));
}

function forget_username(){

    const url = document.getElementById("fu_server").value;
    const email = document.getElementById("fu_email").value;

    if(url.length == 0 || email.length == 0) return;

    if(!validURL(url)){
        changeDialog(1, lang[localStorage.lang]["url_invalid"]);
        show('dialog');
        return;
    }

    if(!validEmail(email)){
        changeDialog(1, errors[localStorage.lang]["6"]);
        show('dialog');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + "/?action=forgotUsername");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(1, lang[localStorage.lang]["server_unreachable"]);
                show('dialog');
                return;
            }
            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(1, lang[localStorage.lang]["server_unreachable"]);
                show('dialog');
                return;
            }

            if(json['error'] != 0){
                changeDialog(1, errors[localStorage.lang][json['error']]);
                show('dialog');
                return;
            }

            changeDialog(3);
            show('dialog');
        }

    };
    xhr.send("email=" + encodeURIComponent(email));
}
