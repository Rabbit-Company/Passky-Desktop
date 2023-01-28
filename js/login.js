loadData().then(() => {

	if(isSessionValid()) window.location.href = 'passwords.html';

	let server = readData('url');
	if(server !== null && typeof(server) !== 'undefined'){
		let servers = [...document.getElementById('passky-server2').options].map(v => v.value);
		if(servers.includes(server)){
			document.getElementById('passky-server2').value = server;
		}else{
			document.getElementById('passky-server').value = server;
			toggleServerPicker('passky-server', 'passky-server2', 'server-picker');
		}
	}

	if(readData('username') !== null && typeof(readData('username')) !== 'undefined') document.getElementById('username').value = readData('username');

	//Languages
	document.getElementById("passky-server").placeholder = lang["server"];
	document.getElementById("username").placeholder = lang["username"];
	document.getElementById("password").placeholder = lang["password"];
	document.getElementById("btn_signin").innerText = lang["signin"];
	document.getElementById("btn_signup").innerText = lang["signup"];
	document.getElementById("forgot_username").innerText = lang["forgot_username"];

});

let debugMode = 0;

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

document.getElementById("server-picker").addEventListener("click", () => {
	toggleServerPicker('passky-server', 'passky-server2', 'server-picker');
});

document.getElementById('passky-logo').addEventListener('click', () => {
	debugMode++;
	if(debugMode >= 5){
		debugMode = 0;
		changeDialog(5);
		show("dialog");
	}
});

function toggleServerPicker(id, id2, buttonID){
	if(isfHidden(id)){
		fhide(id2);
		fshow(id, 'block');
		document.getElementById(buttonID).innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><circle cx='6' cy='10' r='2'></circle><path d='M6 6v2'></path><path d='M6 12v8'></path><circle cx='12' cy='16' r='2'></circle><path d='M12 4v4'></path><path d='M12 12v2'></path><path d='M12 18v2'></path><circle cx='18' cy='7' r='2'></circle><path d='M18 4v1'></path><path d='M18 9v5'></path><path d='M18 18v2'></path><path d='M3 3l18 18'></path></svg>";
	}else{
		fhide(id);
		fshow(id2, 'block');
		document.getElementById(buttonID).innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><rect x='4' y='8' width='4' height='4'></rect><line x1='6' y1='4' x2='6' y2='8'></line><line x1='6' y1='12' x2='6' y2='20'></line><rect x='10' y='14' width='4' height='4'></rect><line x1='12' y1='4' x2='12' y2='14'></line><line x1='12' y1='18' x2='12' y2='20'></line><rect x='16' y='5' width='4' height='4'></rect><line x1='18' y1='4' x2='18' y2='5'></line><line x1='18' y1='9' x2='18' y2='20'></line></svg>";
	}
}

function changeDialog(style, text){
	switch(style){
		case 1:
			//Error dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";

			document.getElementById('dialog-title').innerText = lang["error"];
			document.getElementById('dialog-text').innerText = text;

			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["okay"];
			document.getElementById('dialog-button').onclick = () => hide("dialog");
		break;
		case 2:
			//Forgot username
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

			document.getElementById('dialog-title').innerText = lang["forgot_username"];
			document.getElementById('dialog-text').innerHTML = "<div class='flex rounded-md shadow-sm'><div class='relative flex flex-grow items-stretch focus-within:z-10'><div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><rect x='3' y='4' width='18' height='8' rx='3'></rect><rect x='3' y='12' width='18' height='8' rx='3'></rect><line x1='7' y1='8' x2='7' y2='8.01'></line><line x1='7' y1='16' x2='7' y2='16.01'></line><path d='M11 8h6'></path><path d='M11 16h6'></path></svg></div><select id='fu_server2' class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none block w-full pl-10 px-3 py-2 border rounded-tl-md focus:outline-none sm:text-sm'><option value='https://eu.passky.org' selected>Europe</option><option value='https://us.passky.org'>America</option></select><input id='fu_server' name='fu_server' type='text' autocomplete='server' style='display: none;' class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none block w-full pl-10 px-3 py-2 border rounded-tl-md focus:outline-none sm:text-sm' placeholder='Server'></div><button id='fu_server-picker' type='button' class='relative -ml-px inline-flex items-center space-x-2 border rounded-tr-md tertiaryBackgroundColor tertiaryColor primaryBorderColor px-4 py-2 text-sm font-medium focus:outline-none'><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><rect x='4' y='8' width='4' height='4'></rect><line x1='6' y1='4' x2='6' y2='8'></line><line x1='6' y1='12' x2='6' y2='20'></line><rect x='10' y='14' width='4' height='4'></rect><line x1='12' y1='4' x2='12' y2='14'></line><line x1='12' y1='18' x2='12' y2='20'></line><rect x='16' y='5' width='4' height='4'></rect><line x1='18' y1='4' x2='18' y2='5'></line><line x1='18' y1='9' x2='18' y2='20'></line> </svg></button></div><div class='relative rounded-md shadow-sm'><div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><rect x='3' y='5' width='18' height='14' rx='2'></rect><polyline points='3 7 12 13 21 7'></polyline></svg></div><input id='fu_email' name='fu_email' type='email' autocomplete='email' class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-b-md block w-full pl-10 px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm' placeholder='Email'></div>";

			document.getElementById("fu_server").placeholder = lang["server"];
			document.getElementById("fu_email").placeholder = lang["email"];

			document.getElementById("fu_server-picker").addEventListener("click", () => {
				toggleServerPicker('fu_server', 'fu_server2', 'fu_server-picker');
			});

			let server = readData('url');
			if(server !== null && typeof(server) !== 'undefined'){
				let servers = [...document.getElementById('fu_server2').options].map(v => v.value);
				if(servers.includes(server)){
					document.getElementById('fu_server2').value = server;
				}else{
					document.getElementById('fu_server').value = server;
					toggleServerPicker('fu_server', 'fu_server2', 'fu_server-picker');
				}
			}

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["send"];;
			document.getElementById('dialog-button').onclick = () => forget_username();

			document.getElementById("dialog-button-cancel").onclick = () => hide("dialog");
		break;
		case 3:
			//Email sent successfully
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";

			document.getElementById('dialog-title').innerText = lang["success"];

			document.getElementById('dialog-text').innerText = lang["email_sent_success"];

			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["okay"];
			document.getElementById('dialog-button').onclick = () => hide('dialog');
		break;
		case 4:
			//Loading...
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><path d='M12 3a9 9 0 1 0 9 9'></path></svg>";

			document.getElementById('dialog-title').innerText = lang["please_wait"];
			document.getElementById('dialog-text').innerHTML = lang[text];

			hideDialogButtons();
		break;
		case 5:
			//Debug dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";

			document.getElementById('dialog-title').innerText = "Debug";

			document.getElementById('dialog-text').innerText = getDebugInfo();

			document.getElementById('dialog-button-cancel').style.display = 'initial';
			document.getElementById("dialog-button-cancel").onclick = () => hide("dialog");

			document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["copy"];
			document.getElementById('dialog-button').onclick = () => {
				copyToClipboard(getDebugInfo());
				hide('dialog');
			}
		break;
	}
}

function login_check(){

	let url = document.getElementById("passky-server").value;
	const username = document.getElementById("username").value.toLowerCase();
	const password = document.getElementById("password").value;
	const otp = document.getElementById("otp").value.replace(/\s/g, '');

	if(isfHidden('passky-server')){
		url = document.getElementById('passky-server2').value;
	}

	if(PasswordEntropy.calculate(password) < 75){
		changeDialog(1, lang["2"]);
		show('dialog');
		return;
	}

	changeDialog(4, "signing_in");
	show('dialog');

	let authHash = Blake2b.hash("passky2020-" + password + "-" + username);
	Argon2id.hash(authHash, Blake2b.hash("passky2020-" + username), 32, 32, 4, 64).then(hash => {
		signin(url, username, hash, password, otp);
	});
}

function signin(url, username, authPassword, password, otp){
	Passky.getToken(url, username, authPassword, otp).then(response => {

		if(typeof response['error'] === 'undefined'){
			showDialogButtons();
			changeDialog(1, lang["server_unreachable"]);
			return;
		}

		if(response['error'] != 0 && response['error'] != 8){
			showDialogButtons();
			changeDialog(1, lang[response['error']]);
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
		writeData('premiumExpires', response['premium_expires']);
		writeData('loginTime', new Date().getTime());

		changeDialog(4, "decrypting_passwords");

		let passHash = Blake2b.hash(username + "-" + password + "-passky2020");
		Argon2id.hash(passHash, Blake2b.hash(username + "-passky2020"), 32, 32, 4, 64).then(hash => {
			writeData('password', encryptPassword(hash));
			window.location.href = 'passwords.html';
		});

	}).catch(err => {
		showDialogButtons();
		switch(err){
			case 1000:
				changeDialog(1, lang["server_unreachable"]);
			break;
			case 1001:
				changeDialog(1, lang["url_invalid"]);
			break;
			case 1002:
				changeDialog(1, lang["otp_contains"] + "\n" + lang["otp_not_setup"]);
			break;
			case 1005:
				changeDialog(1, lang["12"]);
			break;
			case 1006:
				changeDialog(1, lang["5"]);
			break;
			default:
				changeDialog(1, lang[err]);
			break;
		}
	});
}

function forget_username(){

	let url = document.getElementById("fu_server").value;
	const email = document.getElementById("fu_email").value;

	if(isfHidden('fu_server')){
		url = document.getElementById('fu_server2').value;
	}

	changeDialog(4, "sending_email");
	show('dialog');

	Passky.forgotUsername(url, email).then(response => {

		showDialogButtons();

		if(typeof response['error'] === 'undefined'){
			changeDialog(1, lang["server_unreachable"]);
			return;
		}

		if(response['error'] != 0){
			changeDialog(1, lang[response['error']]);
			return;
		}

		changeDialog(3);

	}).catch(err => {
		showDialogButtons();
		switch(err){
			case 1000:
				changeDialog(1, lang["server_unreachable"]);
			break;
			case 1001:
				changeDialog(1, lang["url_invalid"]);
			break;
			case 1007:
				changeDialog(1, lang["6"]);
			break;
			default:
				changeDialog(1, lang[err]);
			break;
		}
	});
}

function getDebugInfo(){
	let info = "Client Version: 8.1.1";
	if(readData('url') != null) info += "\nServer: " + readData('url');
	if(readData('username') != null) info += "\nUsername: " + readData('username');
	info += "\nTheme: " + readData('theme');
	info += "\nLanguage: " + readData('lang');
	info += "\nSession Duration: " + readData('sessionDuration');
	info += "\nWorkers Supported: " + !!window.Worker;
	info += "\nUser Agent: " + navigator.userAgent;
	return info;
}