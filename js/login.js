if(localStorage.url !== null && typeof(localStorage.url) !== 'undefined') document.getElementById('passky-server').value = localStorage.url;
if(localStorage.username !== null && typeof(localStorage.username) !== 'undefined') document.getElementById('username').value = localStorage.username;

function onBtnClick(){

    const url = document.getElementById("passky-server").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(url.length == 0 || username.length == 0 || password.length == 0) return;

    if(!/^[a-z0-9.]{6,30}$/i.test(username)){
        setText('error-dialog-modal-text', "Username must be between 6 and 30 characters long and can only contains letters, numbers and dots!");
        show('error-dialog');
        return;
    }

    if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,255}$/i.test(password)){
        setText('error-dialog-modal-text', "Password must be between 8 and 255 characters long and have at least one letter, one number and one special character!");
        show('error-dialog');
        return;
    }

    if(!validURL(url)){
        setText('error-dialog-modal-text', "Server url is invalid!");
        show('error-dialog');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + "/?action=getPasswords");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                setText('error-dialog-modal-text', "Server is unreachable!");
                show('error-dialog');
                return;
            }
            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                setText('error-dialog-modal-text', "Server is unreachable!");
                show('error-dialog');
                return;
            }

            if(json['error'] != 0 && json['error'] != 8){
                setText('error-dialog-modal-text', errors[json['error']]);
                show('error-dialog');
                return;
            }

            if(json['error'] == 0){
                sessionStorage.passwords = JSON.stringify(json['passwords']);
            }

            sessionStorage.url = url;
            sessionStorage.username = username;
            sessionStorage.password = password;

            localStorage.url = url;
            localStorage.username = username;

            window.location.href = 'passwords.html';
        }

    };
    xhr.send("");

}