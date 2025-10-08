loadData().then(() => {

	let server = readData('url');
	if(server !== null && typeof(server) !== 'undefined'){
		let servers = [...document.getElementById('passky-server2').options].map(v => v.value);
		if(servers.includes(server)){
			document.getElementById('passky-server2').value = server;
		}else{
			document.getElementById('passky-server').value = server;
			toggleServerPicker();
		}
	}

	document.getElementById("passky-server").placeholder = lang["server"];
	document.getElementById("username").placeholder = lang["username"];
	document.getElementById("email").placeholder = lang["email"];
	document.getElementById("password").placeholder = lang["password"];
	document.getElementById("tos").innerText = lang["terms_of_service"];
	document.getElementById("btn_signup").innerText = lang["signup"];
	document.getElementById("btn_signin").innerText = lang["signin"];

});

document.getElementById("signup-form").addEventListener("submit", e => {
	e.preventDefault();
	onBtnClick();
});

document.getElementById("btn_signin").addEventListener("click", () => {
	window.location.href = "index.html";
});

document.getElementById("password").addEventListener("input", () => {
	let password = document.getElementById("password").value;
	let entropy = 100 - (PasswordEntropy.calculate(password));
	if(entropy <= 1) entropy = 0;
	document.getElementById("entropy").style.width = entropy + "%";
});

document.getElementById("server-picker").addEventListener("click", () => {
	toggleServerPicker();
});

document.getElementById("password-hider").addEventListener("click", () => {
	let password = document.getElementById("password");
	if(password.type === "password"){
		password.type = "text";
		document.getElementById("password-hider").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><line x1='3' y1='3' x2='21' y2='21'></line><path d='M10.584 10.587a2 2 0 0 0 2.828 2.83'></path><path d='M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341'></path></svg>";
	}else{
		password.type = "password";
		document.getElementById("password-hider").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><circle cx='12' cy='12' r='2'></circle><path d='M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7'></path></svg>";
	}
});

function toggleServerPicker(){
	if(isfHidden('passky-server')){
		fhide('passky-server2');
		fshow('passky-server', 'block');
		document.getElementById("server-picker").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><circle cx='6' cy='10' r='2'></circle><path d='M6 6v2'></path><path d='M6 12v8'></path><circle cx='12' cy='16' r='2'></circle><path d='M12 4v4'></path><path d='M12 12v2'></path><path d='M12 18v2'></path><circle cx='18' cy='7' r='2'></circle><path d='M18 4v1'></path><path d='M18 9v5'></path><path d='M18 18v2'></path><path d='M3 3l18 18'></path></svg>";
	}else{
		fhide('passky-server');
		fshow('passky-server2', 'block');
		document.getElementById("server-picker").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><rect x='4' y='8' width='4' height='4'></rect><line x1='6' y1='4' x2='6' y2='8'></line><line x1='6' y1='12' x2='6' y2='20'></line><rect x='10' y='14' width='4' height='4'></rect><line x1='12' y1='4' x2='12' y2='14'></line><line x1='12' y1='18' x2='12' y2='20'></line><rect x='16' y='5' width='4' height='4'></rect><line x1='18' y1='4' x2='18' y2='5'></line><line x1='18' y1='9' x2='18' y2='20'></line></svg>";
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
			//Success dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";

			document.getElementById('dialog-title').innerText = lang["success"];
			document.getElementById('dialog-text').innerText = text;

			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["okay"];
			document.getElementById('dialog-button').onclick = () => window.location.href = 'index.html';
		break;
		case 3:
			//Loading...
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><path d='M12 3a9 9 0 1 0 9 9'></path></svg>";

			document.getElementById('dialog-title').innerText = lang["please_wait"];
			document.getElementById('dialog-text').innerHTML = lang[text];

			hideDialogButtons();
		break;
	}
}

function onBtnClick(){

	let url = document.getElementById("passky-server").value;
	const username = document.getElementById("username").value.toLowerCase();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	if(isfHidden('passky-server')){
		url = document.getElementById('passky-server2').value;
	}

	if(PasswordEntropy.calculate(password) < 75){
		changeDialog(1, lang["5"]);
		show('dialog');
		return;
	}

	changeDialog(3, "signing_up");
	show('dialog');

	let authHash = Blake2b.hash("passky2020-" + password + "-" + username);
	Argon2id.hash(authHash, Blake2b.hash("passky2020-" + username), 32, 32, 4, 64).then(hash => {
		register(url, username, hash, email);
	});

}

function register(url, username, authPassword, email){
	Passky.createAccount(url, username, authPassword, email).then(response => {

		showDialogButtons();

		if(typeof response['error'] === 'undefined'){
			changeDialog(1, lang["server_unreachable"]);
			return;
		}

		if(response['error'] != 0){
			changeDialog(1, lang[response['error']]);
			return;
		}

		writeData('url', url);
		writeData('username', username);

		changeDialog(2, lang["registration_completed"]);

	}).catch(err => {
		showDialogButtons();
		switch(err){
			case 1000:
				changeDialog(1, lang["server_unreachable"]);
			break;
			case 1001:
				changeDialog(1, lang["url_invalid"]);
			break;
			case 1005:
				changeDialog(1, lang["12"]);
			break;
			case 1006:
				changeDialog(1, lang["5"]);
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