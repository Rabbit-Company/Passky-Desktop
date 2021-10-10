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
    xhr.open("POST", readData('url') + "/?action=getPasswords");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(readData('username') + ":" + sha512(decryptPassword(readData('password')))));
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;

            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined') return;
            if(json['error'] != 0 && json['error'] != 8) return;

            if(json['error'] == 0){
                writeData('passwords', JSON.stringify(json['passwords']));
            }else{
                writeData('passwords', '{}');
            }

            window.location.href = 'passwords.html';
        }

    };
    xhr.send("otp=" + encodeURIComponent(readData('secret')));
}

function encryptPassword(password){
    return CryptoJS.AES.encrypt(password, readData('secret') + navigator.geolocation + readData('loginTime') + readData('url') + readData('username')).toString();
}

function decryptPassword(password){
    return CryptoJS.AES.decrypt(password, readData('secret') + navigator.geolocation + readData('loginTime') + readData('url') + readData('username')).toString(CryptoJS.enc.Utf8);
}

function clearStorage(){
    deleteData('password');
    deleteData('passwords');
    deleteData('secret');
    deleteData('auth');
    deleteData('yubico');
    deleteData('loginTime');
}

function isSessionValid(){
    if(readData('url') == null || typeof(readData('url')) == 'undefined' || readData('username') == null || typeof(readData('username')) == 'undefined' || readData('password') == null || typeof(readData('password')) == 'undefined' || readData('passwords') == null || typeof(readData('passwords')) == 'undefined' || readData('loginTime') == null || typeof(readData('loginTime')) == 'undefined' || readData('sessionDuration') == null || typeof(readData('sessionDuration')) == 'undefined' || ((parseFloat(readData('loginTime')) + (readData('sessionDuration') * 60000))) < new Date().getTime()){
        clearStorage();
        return false;
    }
    return true;
}

function logout(){
    clearStorage();
    window.location.href = 'index.html';
}
