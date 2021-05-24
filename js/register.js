if(localStorage.url !== null && typeof(localStorage.url) !== 'undefined') document.getElementById('passky-server').value = localStorage.url;

function onBtnClick(){

    const url = document.getElementById("passky-server").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(url.length == 0 || username.length == 0 || email.length == 0 || password.length == 0) return;

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

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + "/?action=createAccount");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + sha512(password)));
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

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

            localStorage.url = url;
            localStorage.username = username;

            setText('error-dialog-modal-title', "SUCCESS");
            setText('error-dialog-modal-text', "Registration is completed!");
            document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
            document.getElementById('btn-dialog').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            document.getElementById('btn-dialog').onclick = function(){
                window.location.href = 'index.html';
            }
            show('error-dialog');
        }

    };
    xhr.send("email=" + email);
}