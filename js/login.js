initStorageCache.then(() => {

	if(isSessionValid()) window.location.href = 'passwords.html';

	if(readData('url') !== null && typeof(readData('url')) !== 'undefined') document.getElementById('passky-server').value = readData('url');
	if(readData('username') !== null && typeof(readData('username')) !== 'undefined') document.getElementById('username').value = readData('username');
		
	//Languages
	document.getElementById("passky-server").placeholder = lang[readData('lang')]["server"];
	document.getElementById("username").placeholder = lang[readData('lang')]["username"];
	document.getElementById("password").placeholder = lang[readData('lang')]["password"];
	document.getElementById("btn_signin").innerText = lang[readData('lang')]["signin"];
	document.getElementById("btn_signup").innerText = lang[readData('lang')]["signup"];
	document.getElementById("forgot_username").innerText = lang[readData('lang')]["forgot_username"];

});

document.getElementById("login_form").addEventListener("submit", e => {
	e.preventDefault();
	login_check();
});

document.getElementById("btn_signup").addEventListener("click", () => {
	window.location.href = "register.html";
});

document.getElementById("forgot_username").addEventListener("click", () => {
	changeDialog(2);
	show("dialog");
});

function changeDialog(style, text){
	switch(style){
		case 1:
			//Error dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
		
			document.getElementById('dialog-title').innerText = lang[readData('lang')]["error"];
			document.getElementById('dialog-text').innerText = text;
		
			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["okay"];
			document.getElementById('dialog-button').onclick = () => hide("dialog");
		break;
		case 2:
			//Forgot username
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";
		
			document.getElementById('dialog-title').innerText = lang[readData('lang')]["forgot_username"];
			document.getElementById('dialog-text').innerHTML = "<input id='fu_server' name='fu_server' list='servers' type='text' autocomplete='server' class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-t-md relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm' placeholder='Server'><input id='fu_email' name='fu_email' type='email' autocomplete='email' class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-b-md relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm' placeholder='Email'>";
		
			document.getElementById("fu_server").placeholder = lang[readData('lang')]["server"];
			document.getElementById("fu_email").placeholder = lang[readData('lang')]["email"];

			if(readData('url') !== null && typeof(readData('url')) !== 'undefined') document.getElementById("fu_server").value = readData('url');

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["send"];;
			document.getElementById('dialog-button').onclick = () => forget_username();

			document.getElementById("dialog-button-cancel").onclick = () => hide("dialog");
		break;
		case 3:
			//Email sent successfully
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
		
			document.getElementById('dialog-title').innerText = lang[readData('lang')]["success"];

			document.getElementById('dialog-text').innerText = lang[readData('lang')]["email_sent_success"];
		
			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["okay"];
			document.getElementById('dialog-button').onclick = () => hide('dialog');
		break;
	}
}

function login_check(){

	const url = document.getElementById("passky-server").value;
	const username = document.getElementById("username").value.toLowerCase();
	const password = document.getElementById("password").value;
	const otp = document.getElementById("otp").value.replace(/\s/g, '');

	Passky.getToken(url, username, password, otp).then(response => {
    
		if(typeof response['error'] === 'undefined'){
			changeDialog(1, lang[readData('lang')]["server_unreachable"]);
			show('dialog');
			return;
		}

		if(response['error'] != 0 && response['error'] != 8){
			changeDialog(1, errors[readData('lang')][response['error']]);
			show('dialog');
			return;
		}

		if(response['error'] == 0){
			writeData("passwords", JSON.stringify(response['passwords']));
		}else{
			writeData("passwords", "{}");
		}

		writeData('url', url);
		writeData('username', username);
		writeData('token', response['token']);
		writeData('auth', response['auth']);
		writeData('yubico', response['yubico']);
		writeData('maxPasswords', response['max_passwords']);
		writeData('loginTime', new Date().getTime());
		writeData('password', encryptPassword(password));

		window.location.href = 'passwords.html';

	}).catch(err => {
		switch(err){
			case 1000:
				changeDialog(1, lang[readData('lang')]["server_unreachable"]);
			break;
			case 1001:
				changeDialog(1, lang[readData('lang')]["url_invalid"]);
			break;
			case 1002:
				changeDialog(1, lang[readData('lang')]["otp_contains"] + "\n" + lang[readData('lang')]["otp_not_setup"]);
			break;
			case 1005:
				changeDialog(1, errors[readData('lang')]["12"]);
			break;
			case 1006:
				changeDialog(1, errors[readData('lang')]["5"]);
			break;
			default:
				changeDialog(1, errors[readData('lang')][err]);
			break;
		}
		show('dialog');
	});

}

function forget_username(){

	const url = document.getElementById("fu_server").value;
	const email = document.getElementById("fu_email").value;

	Passky.forgotUsername(url, email).then(response => {

		if(typeof response['error'] === 'undefined'){
			changeDialog(1, lang[readData('lang')]["server_unreachable"]);
			show('dialog');
			return;
		}

		if(response['error'] != 0){
			changeDialog(1, errors[readData('lang')][response['error']]);
			show('dialog');
			return;
		}

		changeDialog(3);

	}).catch(err => {
		console.log("error code: " + err);
		switch(err){
			case 1000:
				changeDialog(1, lang[readData('lang')]["server_unreachable"]);
			break;
			case 1001:
				changeDialog(1, lang[readData('lang')]["url_invalid"]);
			break;
			case 1007:
				changeDialog(1, errors[readData('lang')]["6"]);
			break;
			default:
				changeDialog(1, errors[readData('lang')][err]);
			break;
		}
		show('dialog');
	});
}