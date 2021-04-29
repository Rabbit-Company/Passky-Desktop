function hide(element){
    document.getElementById(element).style.visibility = 'hidden';
}

function show(element){
    document.getElementById(element).style.visibility = 'visible';
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

const errors = {
    "0": "Successful",
    "1": "Username is invalid!",
    "2": "Password is incorrect!",
    "3": "Something went wrong while inserting data to database!",
    "4": "Username is already registered!",
    "5": "Password must be between 8 and 255 characters long and can't contain spaces!",
    "6": "Email is invalid!",
    "7": "Username doesn't exist!",
    "8": "You don't have any saved password.",
    "9": "Domain is invalid!",
    "10": "User does not own this password!",
    "11": "Something went wrong while deleting data from database!",
    "400": "Action was not provided in POST!",
    "401": "Action is invalid!",
    "403": "You didn't provide all required values in POST.",
    "404": "Can't connect into API.",
    "505": "Something went wrong while connecting to database!",
    "999": "You don't have permission to use this endpoint."
}