function onBtnClick(){

    var url = document.getElementById("passky-server").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(url.length == 0 || username.length == 0 || password.length == 0) return;

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

            if(json['error'] != 0){
                setText('error-dialog-modal-text', errors[json['error']]);
                show('error-dialog');
                return;
            }

            //TODO: Fetch user passwords from json 
        }

    };
    xhr.send("");

}