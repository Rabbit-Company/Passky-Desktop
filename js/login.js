if(isSessionValid()) window.location.href = 'passwords.html';

if(localStorage.url !== null && typeof(localStorage.url) !== 'undefined') document.getElementById('passky-server').value = localStorage.url;
if(localStorage.username !== null && typeof(localStorage.username) !== 'undefined') document.getElementById('username').value = localStorage.username;

//Languages
document.getElementById("passky-server").placeholder = lang[localStorage.lang]["server"];
document.getElementById("username").placeholder = lang[localStorage.lang]["username"];
document.getElementById("password").placeholder = lang[localStorage.lang]["password"];
document.getElementById("btn_signin").innerText = lang[localStorage.lang]["signin"];
document.getElementById("error-dialog-modal-title").innerText = lang[localStorage.lang]["error"];
document.getElementById("dont_have_account_link").innerText = lang[localStorage.lang]["dont_have_account_link"];
document.getElementById("error-dialog-okay").innerText = lang[localStorage.lang]["okay"];

document.getElementById("login_form").addEventListener("submit", e => {
    e.preventDefault();
    onBtnClick();
});

document.getElementById("error-dialog-okay").addEventListener("click", () => {
    hide('error-dialog');
});

function onBtnClick(){

    const url = document.getElementById("passky-server").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(url.length == 0 || username.length == 0 || password.length == 0) return;

    if(!/^[a-z0-9.]{6,30}$/i.test(username)){
        setText('error-dialog-modal-text', errors[localStorage.lang]["12"]);
        show('error-dialog');
        return;
    }

    if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,255}$/i.test(password)){
        setText('error-dialog-modal-text', errors[localStorage.lang]["5"]);
        show('error-dialog');
        return;
    }

    if(!validURL(url)){
        setText('error-dialog-modal-text', lang[localStorage.lang]["url_invalid"]);
        show('error-dialog');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + "/?action=getPasswords");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + sha512(password)));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                setText('error-dialog-modal-text', lang[localStorage.lang]["server_unreachable"]);
                show('error-dialog');
                return;
            }
            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                setText('error-dialog-modal-text', lang[localStorage.lang]["server_unreachable"]);
                show('error-dialog');
                return;
            }

            if(json['error'] != 0 && json['error'] != 8){
                setText('error-dialog-modal-text', errors[localStorage.lang][json['error']]);
                show('error-dialog');
                return;
            }

            if(json['error'] == 0){
                let passwords = json['passwords'];
                for(let i = 0; i < passwords.length; i++) passwords[i].password = CryptoJS.AES.decrypt(passwords[i].password, password).toString(CryptoJS.enc.Utf8);
                localStorage.passwords = JSON.stringify(passwords);
            }else{
                localStorage.passwords = "{}";
            }

            localStorage.url = url;
            localStorage.username = username;
            localStorage.password = password;
            localStorage.loginTime = new Date().getTime();

            window.location.href = 'passwords.html';
        }

    };
    xhr.send("");

}
