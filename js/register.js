initStorageCache.then(() => {

    if(readData('url') !== null && typeof(readData('url')) !== 'undefined') document.getElementById('passky-server').value = readData('url');

    document.getElementById("passky-server").placeholder = lang[readData('lang')]["server"];
    document.getElementById("username").placeholder = lang[readData('lang')]["username"];
    document.getElementById("email").placeholder = lang[readData('lang')]["email"];
    document.getElementById("password").placeholder = lang[readData('lang')]["password"];
    document.getElementById("tos").innerText = lang[readData('lang')]["terms_of_service"];
    document.getElementById("btn-dialog").innerText = lang[readData('lang')]["okay"];
    document.getElementById("error-dialog-modal-title").innerText = lang[readData('lang')]["error"];
    document.getElementById("btn_signup").innerText = lang[readData('lang')]["signup"];
    document.getElementById("btn_signin").innerText = lang[readData('lang')]["signin"];

});

document.getElementById("signup-form").addEventListener("submit", e => {
    e.preventDefault();
    onBtnClick();
});

document.getElementById("btn-dialog").addEventListener("click", () => {
    hide('error-dialog');
});

document.getElementById("btn_signin").addEventListener("click", () => {
    window.location.href = "index.html";
});

function onBtnClick(){

    const url = document.getElementById("passky-server").value;
    const username = document.getElementById("username").value.toLowerCase();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(url.length == 0 || username.length == 0 || email.length == 0 || password.length == 0) return;

    if(!/^[a-z0-9.]{6,30}$/i.test(username)){
        setText('error-dialog-modal-text', errors[readData('lang')]["12"]);
        show('error-dialog');
        return;
    }

    if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&,_\(\)\=\-\.])[A-Za-z\d@$!%*#?&,_\(\)\=\-\.]{8,255}$/i.test(password)){
        setText('error-dialog-modal-text', errors[readData('lang')]["5"]);
        show('error-dialog');
        return;
    }

    if(!validEmail(email)){
        setText('error-dialog-modal-text', errors[readData('lang')]["6"]);
        show('error-dialog');
        return;
    }

    if(!validURL(url)){
        setText('error-dialog-modal-text', lang[readData('lang')]["url_invalid"]);
        show('error-dialog');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + "/?action=createAccount");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + sha512(password + username + "passky2020")));
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                setText('error-dialog-modal-text', lang[readData('lang')]["server_unreachable"]);
                show('error-dialog');
                return;
            }

            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                setText('error-dialog-modal-text', lang[readData('lang')]["server_unreachable"]);
                show('error-dialog');
                return;
            }

            if(json['error'] != 0){
                setText('error-dialog-modal-text', errors[readData('lang')][json['error']]);
                show('error-dialog');
                return;
            }

            writeData('url', url);
            writeData('username', username);

            setText('error-dialog-modal-title', lang[readData('lang')]["success"]);
            setText('error-dialog-modal-text', lang[readData('lang')]["registration_completed"]);
            document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
            document.getElementById('btn-dialog').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium sm:text-sm"
            document.getElementById('btn-dialog').onclick = function(){
                window.location.href = 'index.html';
            }
            show('error-dialog');
        }

    };
    xhr.send("email=" + encodeURIComponent(email));
}