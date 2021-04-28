function onBtnClick(){

    var url = document.getElementById("passky-server").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(url.length == 0 || username.length == 0 || email.length == 0 || password.length == 0) return;

    if(!(username.length >= 6 && username.length <= 30)){
        setText('error-dialog-modal-text', "Username must be between 6 and 30 character long!");
        show('error-dialog');
        return;
    }

    if(!(password.length >= 8 && password.length <= 255)){
        setText('error-dialog-modal-text', "Password must be between 8 and 255 character long!");
        show('error-dialog');
        return;
    }

    if(!validEmail(email)){
        setText('error-dialog-modal-text', "Email is invalid!");
        show('error-dialog');
        return;
    }

    if(!validURL(url)){
        setText('error-dialog-modal-text', "Server url is invalid!");
        show('error-dialog');
        return;
    }

}