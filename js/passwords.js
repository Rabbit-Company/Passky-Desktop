function changeDialog(style, text){
    switch(style){
        case 1:
            //Delete account dialog
            if(document.getElementById('dialog-title').innerText != "Delete account"){
                document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
                document.getElementById('dialog-title').innerText = "Delete account";
                document.getElementById('dialog-text').innerText = "Are you sure you want to delete your account? All of your data will be permanently removed from server forever. This action cannot be undone.";
    
                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm";
                document.getElementById('dialog-button').innerText = "Delete";
                document.getElementById('dialog-button').onclick = function(){
                    deleteAccount();
                }
            }
        break;
        case 2:
            //Add password error
            if(document.getElementById('dialog-title').innerText != "ERROR"){
                document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
                document.getElementById('dialog-title').innerText = "ERROR";
                document.getElementById('dialog-text').innerText = text;
    
                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm";
                document.getElementById('dialog-button').innerText = "Try again";
                document.getElementById('dialog-button').onclick = function(){
                    changeDialog(0);
                }
            }
        break;
        case 3:
            //Password added successfully
            if(document.getElementById('dialog-title').innerText != "SUCCESS"){
                document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
    
                document.getElementById('dialog-title').innerText = "SUCCESS";
                document.getElementById('dialog-text').innerText = "Password has been added successfully";
    
                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm";
                document.getElementById('dialog-button').innerText = "Okay";
                document.getElementById('dialog-button').onclick = function(){
                    refreshPasswords();
                }
            }
        break;
        default:
            //Add password dialog
            if(document.getElementById('dialog-title').innerText != "Add password"){
                document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";
    
                document.getElementById('dialog-title').innerText = "Add password";

                document.getElementById('dialog-text').innerHTML = "<div class='rounded-md shadow-sm -space-y-px'><div><label for='website' class='sr-only'>Website</label><input id='website' name='website' type='text' autocomplete='website' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Website'></div><div><label for='username' class='sr-only'>Username</label><input id='username' name='username' type='text' autocomplete='username' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Username'></div><div><label for='password' class='sr-only'>Password</label><input id='password' name='password' type='password' autocomplete='current-password' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Password'></div></div>";
    
                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm";
                document.getElementById('dialog-button').innerText = "Add";
                document.getElementById('dialog-button').onclick = function(){
                    addPassword();
                }
            }
        break;
    }
}

function addPassword(){
    var website = document.getElementById("website").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(website.length == 0 || username.length == 0 || password.length == 0) return;

    if(!(username.length >= 6 && username.length <= 30)){
        changeDialog(2, "Username must be between 6 and 30 character long!");
        return;
    }

    if(!(password.length >= 8 && password.length <= 255)){
        changeDialog(2, "Password must be between 8 and 255 character long and can't contain spaces!");
        return;
    }

    if(!(website.length >= 6 && website.length <= 255)){
        changeDialog(2, "Website much be between 6 and 255 character long!");
        return;
    }

    if(sessionStorage.url === null || typeof(sessionStorage.url) === 'undefined' || sessionStorage.username === null || typeof(sessionStorage.username) === 'undefined' || sessionStorage.password === null || typeof(sessionStorage.password) === 'undefined'){
        changeDialog(2, "Session has expired please sign in again!");
        return;
    }

    //Encrypt password
    password = CryptoJS.AES.encrypt(password, sessionStorage.password).toString();

    console.log("Encrypted password:" + password);

    const url = sessionStorage.url + "/?action=savePassword";

    const body = new FormData();
    body.append('website', website);
    body.append('username', username);
    body.append('password', password);

    const request = new Request(url, {
        method: 'POST',
        body: body,
        headers: new Headers({
            "Content-type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(sessionStorage.username + ":" + sessionStorage.password),
            "Accept": "application/json"
        })
    });

    fetch(request)
        .then(response => response.json())
        .then(response => {

            if(typeof response['error'] === 'undefined'){
                changeDialog(2, "Server is unreachable!");
                return;
            }

            if(response['error'] != 0){
                changeDialog(2, errors[response['error']]);
                return;
            }

            changeDialog(3);
        })
        .catch((error) => {
            changeDialog(2, "Server is unreachable!" + error);
        });

    /*
    var xhr = new XMLHttpRequest();
    xhr.open("POST", sessionStorage.url + "/?action=savePassword");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(sessionStorage.username + ":" + sessionStorage.password));
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(2, "Server is unreachable!");
                return;
            }

            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(2, "Server is unreachable!");
                return;
            }

            if(json['error'] != 0){
                changeDialog(2, errors[json['error']]);
                return;
            }

            changeDialog(3);
        }

    };
    xhr.send("website=" + website + "&username=" + username + "&password=" + password);

    */
}

function refreshPasswords(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", sessionStorage.url + "/?action=getPasswords");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(sessionStorage.username + ":" + sessionStorage.password));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;
            
            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined') return;
            if(json['error'] != 0 && json['error'] != 8) return;
            
            if(json['error'] == 0){
                sessionStorage.passwords = JSON.stringify(json['passwords']);
            }

            window.location.href = 'passwords.html';
        }

    };
    xhr.send("");
}

function deleteAccount(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", sessionStorage.url + "/?action=deleteAccount");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(sessionStorage.username + ":" + sessionStorage.password));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;
            
            var json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined') return;
            if(json['error'] != 0) return;
  
            window.location.href = 'login.html';
        }

    };
    xhr.send("");
}