function hide(element){
    document.getElementById(element).style.visibility = 'hidden';
}

function show(element){
    document.getElementById(element).style.visibility = 'visible';
}

function isHidden(element){
    return (document.getElementById(element).style.visibility == 'hidden');
}

function setText(element, text){
    document.getElementById(element).innerText = text;
}

function validURL(url){
    return new RegExp(/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/).test(url);
}

function validEmail(mail){
    return new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(mail);
}

function animateButton(id, enabled){
    if(enabled){
        document.getElementById(id + "-color").className = "quaternaryBackgroundColor pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200";
        document.getElementById(id + "-animation").className = "translate-x-5 pointer-events-none absolute left-0 inline-block h-5 w-5 rounded-full tertiaryBackgroundColor shadow transform ring-0 transition-transform ease-in-out duration-200";
    }else{
        document.getElementById(id + "-color").className = "primaryBackgroundColor pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200";
        document.getElementById(id + "-animation").className = "translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 rounded-full tertiaryBackgroundColor shadow transform ring-0 transition-transform ease-in-out duration-200";
    }
}

function toggleMenu(){
    if(document.getElementById('mobile-menu').className == 'hidden pt-2 pb-3 space-y-1'){
        document.getElementById('mobile-menu').className = 'pt-2 pb-3 space-y-1';
        document.getElementById('mobile-menu-icon').innerHTML = "<path stroke='none' d='M0 0h24v24H0z' fill='none'/><line x1='7' y1='4' x2='17' y2='17' /><line x1='17' y1='4' x2='7' y2='17' />";
    }else{
        document.getElementById('mobile-menu').className = 'hidden pt-2 pb-3 space-y-1';
        document.getElementById('mobile-menu-icon').innerHTML = "<path stroke='none' d='M0 0h24v24H0z' fill='none'/><line x1='4' y1='6' x2='20' y2='6' /><line x1='4' y1='12' x2='20' y2='12' /><line x1='4' y1='18' x2='20' y2='18' />";
    }
}

function copyToClipboard(text){
    let textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');

    document.body.removeChild(textArea);
}

function downloadTxt(exportTxt, exportName){
    let dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(exportTxt);
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".txt");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function downloadJson(exportJson, exportName){
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportJson);
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function downloadObjectAsJson(exportObj, exportName){
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function isJsonValid(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getDate(date){
    let local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}

function isPasswordWebsiteValid(website){
    if(website == null || typeof(website) == 'undefined') return false;
    if(!(website.length >= 5 && website.length <= 255) || website.includes(" ")) return false;
    return true;
}

function isPasswordUsernameValid(username){
    if(username == null || typeof(username) == 'undefined') return false;
    if(!(username.length >= 3 && username.length <= 255)) return false;
    return true;
}

function isPasswordPasswordValid(password){
    if(password == null || typeof(password) == 'undefined') return false;
    if(!(password.length >= 5 && password.length <= 255)) return false;
    return true;
}

function isPasswordMessageValid(message){
    if(message.length > 10000) return false;
    return true;
}

function randRange(min, max) {
    var range = max - min;
    var requestBytes = Math.ceil(Math.log2(range) / 8);
    if (!requestBytes) return min;
    
    var maxNum = Math.pow(256, requestBytes);
    var ar = new Uint8Array(requestBytes);

    while (true) {
        window.crypto.getRandomValues(ar);
        var val = 0;
        for (var i = 0;i < requestBytes;i++) val = (val << 8) + ar[i];
        if (val < maxNum - maxNum % range) return min + (val % range);
    }
}

function refreshPasswords(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", localStorage.url + "/?action=getPasswords");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.username + ":" + sha512(localStorage.password)));
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;

            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined') return;
            if(json['error'] != 0 && json['error'] != 8) return;

            if(json['error'] == 0){
                let passwords = json['passwords'];
                for(let i = 0; i < passwords.length; i++){
                    passwords[i].password = CryptoJS.AES.decrypt(passwords[i].password, localStorage.password).toString(CryptoJS.enc.Utf8);
                    if(passwords[i].message == null || typeof(passwords[i].message) == 'undefined'){
                        passwords[i].message = "";
                    }else{
                        passwords[i].message = CryptoJS.AES.decrypt(passwords[i].message, localStorage.password).toString(CryptoJS.enc.Utf8);
                    }
                }
                localStorage.passwords = JSON.stringify(passwords);
            }else{
                localStorage.passwords = "{}";
            }

            window.location.href = 'passwords.html';
        }

    };
    xhr.send("otp=" + encodeURIComponent(localStorage.secret));
}

function clearStorage(){
    delete localStorage.password;
    delete localStorage.passwords;
    delete localStorage.secret;
    delete localStorage.auth;
    delete localStorage.yubico
    delete localStorage.loginTime;
}

function isSessionValid(){
    if(localStorage.url == null || typeof(localStorage.url) == 'undefined' || localStorage.username == null || typeof(localStorage.username) == 'undefined' || localStorage.password == null || typeof(localStorage.password) == 'undefined' || localStorage.passwords == null || typeof(localStorage.passwords) == 'undefined' || localStorage.loginTime == null || typeof(localStorage.loginTime) == 'undefined' || localStorage.sessionDuration == null || typeof(localStorage.sessionDuration) == 'undefined' || ((parseFloat(localStorage.loginTime) + (localStorage.sessionDuration * 60000))) < new Date().getTime()){
        clearStorage();
        return false;
    }
    return true;
}

function logout(){
    clearStorage();
    window.location.href = 'index.html';
}
