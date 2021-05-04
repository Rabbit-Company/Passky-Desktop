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
                document.getElementById('dialog-button').onclick = () => deleteAccount();
            }
        break;
        case 2:
            //Add password error
            if(document.getElementById('dialog-title').innerText != "ERROR"){
                document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
                document.getElementById('dialog-title').innerText = "ERROR";
                document.getElementById('dialog-text').innerText = text;
    
                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm";
                document.getElementById('dialog-button').innerText = "Try again";
                document.getElementById('dialog-button').onclick = () => changeDialog(0);
            }
        break;
        case 3:
            //Password added successfully
            if(document.getElementById('dialog-title').innerText != "SUCCESS"){
                document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
    
                document.getElementById('dialog-title').innerText = "SUCCESS";

                document.getElementById('dialog-text').innerText = (text) ? "Password has been added successfully" : "Password has been changed successfully";
    
                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm";
                document.getElementById('dialog-button').innerText = "Okay";
                document.getElementById('dialog-button').onclick = () => refreshPasswords();
            }
        break;
        case 4:
            //Edit password dialog
            if(document.getElementById('dialog-title').innerText != "Edit password"){
                const data = text.split(" ");

                document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";
    
                document.getElementById('dialog-title').innerText = "Edit password";

                document.getElementById('dialog-text').innerHTML = "<div class='rounded-md shadow-sm -space-y-px'><div><label for='website' class='sr-only'>Website</label><input id='website' name='website' type='text' autocomplete='website' value='" + data[1] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Website'></div><div><label for='username' class='sr-only'>Username</label><input id='username' name='username' type='text' autocomplete='username' value='" + data[2] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Username'></div>   <div><div class='flex rounded-md shadow-sm'><div class='relative flex items-stretch flex-grow focus-within:z-10'><input id='password' name='password' type='password' autocomplete='current-password' value='" + data[3] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-bl-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Password'></div><button id='btn-password-generator' class='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-br-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'><svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-replace' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg></button></div></div>";

                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm";
                document.getElementById('dialog-button').innerText = "Change";
                document.getElementById('dialog-button').onclick = () => editPassword(data[0]);

                document.getElementById('btn-password-generator').onclick = () => changeDialog(5, text);
            }
        break;
        case 5:
            //Password Generator dialog
            if(document.getElementById('dialog-title').innerText != "Password Generator"){
                const data = text.split(" ");

                document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg>";
    
                document.getElementById('dialog-title').innerText = "Password Generator";

                document.getElementById('dialog-text').innerHTML = "<div class='flex items-center justify-between'><span class='flex-grow flex flex-col' id='availability-label'><span class='text-sm font-medium text-gray-900'>A-Z</span></span><button type='button' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' role='switch' aria-checked='false'><span aria-hidden='true' class='pointer-events-none absolute bg-white w-full h-full rounded-md'></span><span aria-hidden='true' class='bg-gray-200 pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span aria-hidden='true' class='translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div><div class='flex items-center justify-between'><span class='flex-grow flex flex-col' id='availability-label'><span class='text-sm font-medium text-gray-900'>a-z</span></span><button type='button' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' role='switch' aria-checked='false'><span aria-hidden='true' class='pointer-events-none absolute bg-white w-full h-full rounded-md'></span><span aria-hidden='true' class='bg-gray-200 pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span aria-hidden='true' class='translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div><div class='flex items-center justify-between'><span class='flex-grow flex flex-col' id='availability-label'><span class='text-sm font-medium text-gray-900'>0-9</span></span><button type='button' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' role='switch' aria-checked='false'><span aria-hidden='true' class='pointer-events-none absolute bg-white w-full h-full rounded-md'></span><span aria-hidden='true' class='bg-gray-200 pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span aria-hidden='true' class='translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div><div class='flex items-center justify-between'><span class='flex-grow flex flex-col' id='availability-label'><span class='text-sm font-medium text-gray-900'>!@#$%?&*</span></span><button type='button' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' role='switch' aria-checked='false'><span aria-hidden='true' class='pointer-events-none absolute bg-white w-full h-full rounded-md'></span><span aria-hidden='true' class='bg-gray-200 pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span aria-hidden='true' class='translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div>     <div class='flex items-center justify-between'><span class='flex-grow flex flex-col' id='availability-label'><span class='text-sm font-medium text-gray-900'>Length</span></span><input type='range' min='8' max='30' value='10' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'></div>";
    
                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm";
                
                if(data[0] != null){
                    document.getElementById('dialog-button').innerText = "Use";
                    document.getElementById('dialog-button').onclick = () => changeDialog(4, text);
                }else{
                    document.getElementById('dialog-button').innerText = "Copy";
                    document.getElementById('dialog-button').onclick = () => copyToClipboard("password here");
                }
            }
        break;
        default:
            //Add password dialog
            if(document.getElementById('dialog-title').innerText != "Add password"){
                document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
                document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";
    
                document.getElementById('dialog-title').innerText = "Add password";

                document.getElementById('dialog-text').innerHTML = "<div class='rounded-md shadow-sm -space-y-px'><div><label for='website' class='sr-only'>Website</label><input id='website' name='website' type='text' autocomplete='website' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Website'></div><div><label for='username' class='sr-only'>Username</label><input id='username' name='username' type='text' autocomplete='username' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Username'></div><div><div class='flex rounded-md shadow-sm'><div class='relative flex items-stretch flex-grow focus-within:z-10'><input id='password' name='password' type='password' autocomplete='current-password' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-bl-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Password'></div><button id='btn-password-generator' class='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-br-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'><svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-replace' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg></button></div></div>";
                
                document.getElementById('dialog-button').className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm";
                document.getElementById('dialog-button').innerText = "Add";
                document.getElementById('dialog-button').onclick = () => addPassword();

                //document.getElementById('btn-password-generator').onclick = () => changeDialog(5, text);
            }
        break;
    }
}

function addPassword(){
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(website.length == 0 || username.length == 0 || password.length == 0) return;

    if(!(username.length >= 3 && username.length <= 255) || username.includes(" ")){
        changeDialog(2, "Username must be between 3 and 255 character long and can't contain spaces!");
        return;
    }

    if(username.includes("'") || username.includes('"') || username.includes("\\")){
        changeDialog(2, "Username can't contains provided special characters: ' \" \\");
        return;
    }

    if(!(password.length >= 8 && password.length <= 255) || password.includes(" ")){
        changeDialog(2, "Password must be between 8 and 255 character long and can't contain spaces!");
        return;
    }

    if(password.includes("'") || password.includes('"') || password.includes("\\")){
        changeDialog(2, "Password can't contains provided special characters: ' \" \\");
        return;
    }

    if(!(website.length >= 5 && website.length <= 255) || website.includes(" ")){
        changeDialog(2, "Website much be between 5 and 255 character long and can't contain spaces!");
        return;
    }

    if(website.includes("'") || website.includes('"') || website.includes("\\")){
        changeDialog(2, "Website can't contains provided special characters: ' \" \\");
        return;
    }

    if(sessionStorage.url === null || typeof(sessionStorage.url) === 'undefined' || sessionStorage.username === null || typeof(sessionStorage.username) === 'undefined' || sessionStorage.password === null || typeof(sessionStorage.password) === 'undefined'){
        changeDialog(2, "Session has expired please sign in again!");
        return;
    }

    password = CryptoJS.AES.encrypt(password, sessionStorage.password).toString();
    
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

            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(2, "Server is unreachable!");
                return;
            }

            if(json['error'] != 0){
                changeDialog(2, errors[json['error']]);
                return;
            }

            changeDialog(3, true);
        }

    };
    xhr.send("website=" + website + "&username=" + username + "&password=" + encodeURIComponent(password));
}

function editPassword(password_id){
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(password_id.length == 0 || website.length == 0 || username.length == 0 || password.length == 0) return;

    if(!(username.length >= 3 && username.length <= 255) || username.includes(" ")){
        changeDialog(2, "Username must be between 3 and 255 character long and can't contain spaces!");
        return;
    }

    if(username.includes("'") || username.includes('"') || username.includes("\\")){
        changeDialog(2, "Username can't contains provided special characters: ' \" \\");
        return;
    }

    if(!(password.length >= 8 && password.length <= 255) || password.includes(" ")){
        changeDialog(2, "Password must be between 8 and 255 character long and can't contain spaces!");
        return;
    }

    if(password.includes("'") || password.includes('"') || password.includes("\\")){
        changeDialog(2, "Password can't contains provided special characters: ' \" \\");
        return;
    }

    if(!(website.length >= 5 && website.length <= 255) || website.includes(" ")){
        changeDialog(2, "Website much be between 5 and 255 character long and can't contain spaces!");
        return;
    }

    if(website.includes("'") || website.includes('"') || website.includes("\\")){
        changeDialog(2, "Website can't contains provided special characters: ' \" \\");
        return;
    }

    if(sessionStorage.url === null || typeof(sessionStorage.url) === 'undefined' || sessionStorage.username === null || typeof(sessionStorage.username) === 'undefined' || sessionStorage.password === null || typeof(sessionStorage.password) === 'undefined'){
        changeDialog(2, "Session has expired please sign in again!");
        return;
    }

    password = CryptoJS.AES.encrypt(password, sessionStorage.password).toString();
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", sessionStorage.url + "/?action=editPassword");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(sessionStorage.username + ":" + sessionStorage.password));
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(2, "Server is unreachable!");
                return;
            }

            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(2, "Server is unreachable!");
                return;
            }

            if(json['error'] != 0){
                changeDialog(2, errors[json['error']]);
                return;
            }

            changeDialog(3, false);
        }

    };
    xhr.send("password_id=" + password_id + "&website=" + website + "&username=" + username + "&password=" + encodeURIComponent(password));
}

function passwordGenerator(password_id){

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
            
            const json = JSON.parse(xhr.responseText);

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
            
            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined') return;
            if(json['error'] != 0) return;
  
            window.location.href = 'login.html';
        }

    };
    xhr.send("");
}

function filterPasswords(){
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-passwords");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}