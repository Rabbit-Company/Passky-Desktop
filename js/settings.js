initStorageCache.then(() => {

	document.getElementById("passwords-link").innerText = lang[readData('lang')]["passwords"];
	document.getElementById("import-export-link").innerText = lang[readData('lang')]["import_export"];
	document.getElementById("settings-link").innerText = lang[readData('lang')]["settings"];
	document.getElementById("signout-link").innerText = lang[readData('lang')]["signout"];

	document.getElementById("passwords-link-mobile").innerText = lang[readData('lang')]["passwords"];
	document.getElementById("import-export-link-mobile").innerText = lang[readData('lang')]["import_export"];
	document.getElementById("settings-link-mobile").innerText = lang[readData('lang')]["settings"];
	document.getElementById("signout-link-mobile").innerText = lang[readData('lang')]["signout"];

	document.getElementById("label-theme").innerText = lang[readData('lang')]["theme"];
	document.getElementById("label-session-duration").innerText = lang[readData('lang')]["session_duration"];

	document.getElementById("label-auto-search").innerText = lang[readData('lang')]["auto_search"];

	document.getElementById("add-yubico-btn").innerText = lang[readData('lang')]["add"];
	document.getElementById("remove-yubico-btn").innerText = lang[readData('lang')]["remove"];

	document.getElementById("delete-account-title").innerText = lang[readData('lang')]["delete_account"];
	document.getElementById("delete-account-text").innerText = lang[readData('lang')]["delete_account_info"];
	document.getElementById("delete-account-btn").innerText = lang[readData('lang')]["delete_account"];

	document.getElementById("dialog-button-cancel").innerText = lang[readData('lang')]["cancel"];

	document.getElementById("settings-lang").value = readData('lang');
	document.getElementById("settings-theme").value = readData('theme');
	document.getElementById("settings-session").value = readData('sessionDuration');

	if (readData('auth') == "true") {
		document.getElementById("toggle-2fa-btn").innerText = lang[readData('lang')]["disable"];
		document.getElementById("toggle-2fa-btn").className = "dangerButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
	} else {
		document.getElementById("toggle-2fa-btn").innerText = lang[readData('lang')]["enable"];
		document.getElementById("toggle-2fa-btn").className = "successButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
	}

	if(readData('websiteIcons') == "true"){
		document.getElementById("toggle-website-icons").innerText = lang[readData('lang')]["disable"];
		document.getElementById("toggle-website-icons").className = "dangerButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
	}else{
		document.getElementById("toggle-website-icons").innerText = lang[readData('lang')]["enable"];
		document.getElementById("toggle-website-icons").className = "successButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
	}

	if (readData('autoSearch') == "false") {
		document.getElementById("toggle-auto-search").innerText = lang[readData('lang')]["enable"];
		document.getElementById("toggle-auto-search").className = "successButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
	} else {
		document.getElementById("toggle-auto-search").innerText = lang[readData('lang')]["disable"];
		document.getElementById("toggle-auto-search").className = "dangerButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
	}

	if (readData('yubico') == "null" || readData('yubico') == '') {
		hide("remove-yubico-btn");
	} else {
		let yubico = readData('yubico').split(";");
		if (yubico.length >= 5) hide("add-yubico-btn");

		if (readData('yubico') != "null" && readData('yubico') != '') {
			let html = "";
			for (let i = 0; i < yubico.length; i++) {
				html += "<li class='passwordsBorderColor py-4 flex'><img class='h-10 w-10 rounded-full' src='images/yubikey.png' alt='Yubico Key'><div class='ml-3'><p class='secondaryColor text-sm font-medium'>" + yubico[i] + "</p></div></li>";
			}
			document.getElementById('yubico-list').innerHTML = html;
		}
	}

	let minutes = document.getElementsByClassName("addMinutes");
	for (let i = 0; i < minutes.length; i++) minutes[i].innerText = minutes[i].innerText + " " + lang[readData('lang')]["minutes"];

	window.setInterval(function() {
		if (!isSessionValid()) logout();
	}, 2000);
});

function deleteAccount() {

	Passky.deleteAccount(readData('url'), readData('username'), readData('token')).then(response => {

		if (response['error'] != 0) {
			changeDialog(2, errors[readData('lang')][response['error']]);
			show('dialog');
			return;
		}

		logout();

	}).catch(err => {
		switch(err){
			case 1001:
				changeDialog(2, lang[readData('lang')]["url_invalid"]);
			break;
			case 1003:
				changeDialog(2, errors[readData('lang')]["25"]);
			break;
			case 1005:
				changeDialog(2, errors[readData('lang')]["12"]);
			break;
			default:
				changeDialog(2, lang[readData('lang')]["server_unreachable"]);
			break;
		}
		show('dialog');
	});

}

function enable2fa() {

	Passky.enable2FA(readData('url'), readData('username'), readData('token')).then(response => {

		if (response['error'] != 0) {
			changeDialog(2, errors[readData('lang')][response['error']]);
			show('dialog');
			return;
		}

		let codes = response['codes'].split(';');
		let backupCodes = "<ul>";
		for (let i = 0; i < codes.length; i += 2) backupCodes += "<li>" + codes[i] + " " + codes[i + 1] + "</li>";
		backupCodes += "</ul>";

		writeData('auth', 'true');
		let html = lang[readData('lang')]["scan_qr_code"] + "<div style='padding: 20px; background-color: white;'><div id='qrcode'></div></div> " + lang[readData('lang')]["or_enter_key_manually"] + " <b>" + response['secret'] + "</b></br></br>" + lang[readData('lang')]["backup_codes"] + " <b>" + backupCodes + "</b>";

		changeDialog(3, html);
		new QRCode(document.getElementById("qrcode"), response['qrcode']);
		show('dialog');

	}).catch(err => {
		switch(err){
			case 1001:
				changeDialog(2, lang[readData('lang')]["url_invalid"]);
			break;
			case 1003:
				changeDialog(2, errors[readData('lang')]["25"]);
			break;
			case 1005:
				changeDialog(2, errors[readData('lang')]["12"]);
			break;
			default:
				changeDialog(2, lang[readData('lang')]["server_unreachable"]);
			break;
		}
		show('dialog');
	});

}

function disable2fa() {

	Passky.disable2FA(readData('url'), readData('username'), readData('token')).then(response => {

		if (response['error'] != 0) {
			changeDialog(2, errors[readData('lang')][response['error']]);
			show('dialog');
			return;
		}

		writeData('auth', 'false');
		location.reload();

	}).catch(err => {
		switch(err){
			case 1001:
				changeDialog(2, lang[readData('lang')]["url_invalid"]);
			break;
			case 1003:
				changeDialog(2, errors[readData('lang')]["25"]);
			break;
			case 1005:
				changeDialog(2, errors[readData('lang')]["12"]);
			break;
			default:
				changeDialog(2, lang[readData('lang')]["server_unreachable"]);
			break;
		}
		show('dialog');
	});

}

function addYubiKey(id) {

	if (readData('yubico').includes(id.substring(0, 12))) {
		changeDialog(2, errors[readData('lang')]['21']);
		show('dialog');
		return;
	}

	Passky.addYubiKey(readData('url'), readData('username'), readData('token'), id).then(response => {

		if (response['error'] != 0) {
			changeDialog(2, errors[readData('lang')][response['error']]);
			show('dialog');
			return;
		}

		let codes = response['codes'].split(';');
		let backupCodes = "<ul>";
		for (let i = 0; i < codes.length; i += 2) backupCodes += "<li>" + codes[i] + " " + codes[i + 1] + "</li>";
		backupCodes += "</ul>";

		writeData('yubico', response['yubico']);
		let html = lang[readData('lang')]["yubikey_added_successfully"] + "</br></br>" + lang[readData('lang')]["backup_codes"] + " <b>" + backupCodes + "</b>";

		changeDialog(7, html);
		show('dialog');

	}).catch(err => {
		switch(err){
			case 1001:
				changeDialog(2, lang[readData('lang')]["url_invalid"]);
			break;
			case 1003:
				changeDialog(2, errors[readData('lang')]["25"]);
			break;
			case 1004:
				changeDialog(2, errors[readData('lang')]['23']);
			break;
			case 1005:
				changeDialog(2, errors[readData('lang')]["12"]);
			break;
			default:
				changeDialog(2, lang[readData('lang')]["server_unreachable"]);
			break;
		}
		show('dialog');
	});

}

function removeYubiKey(id) {

	if (!readData('yubico').includes(id.substring(0, 12))) {
		changeDialog(2, errors[readData('lang')]['24']);
		show('dialog');
		return;
	}

	Passky.removeYubiKey(readData('url'), readData('username'), readData('token'), id).then(response => {

		if (response['error'] != 0) {
			changeDialog(2, errors[readData('lang')][response['error']]);
			show('dialog');
			return;
		}

		writeData('yubico', String(response['yubico']));

		changeDialog(7, lang[readData('lang')]["yubikey_removed_successfully"]);
		show('dialog');

	}).catch(err => {
		switch(err){
			case 1001:
				changeDialog(2, lang[readData('lang')]["url_invalid"]);
			break;
			case 1003:
				changeDialog(2, errors[readData('lang')]["25"]);
			break;
			case 1004:
				changeDialog(2, errors[readData('lang')]['23']);
			break;
			case 1005:
				changeDialog(2, errors[readData('lang')]["12"]);
			break;
			default:
				changeDialog(2, lang[readData('lang')]["server_unreachable"]);
			break;
		}
		show('dialog');
	});

}

function changeDialog(style, text) {
	switch (style) {
		case 1:
			//Delete account dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";

			document.getElementById('dialog-title').innerText = lang[readData('lang')]["delete_account"];
			document.getElementById('dialog-text').innerText = lang[readData('lang')]["delete_account_confirmation"];

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["delete"];
			document.getElementById('dialog-button').onclick = () => deleteAccount();
			break;
		case 2:
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
		case 3:
			//Enable 2fa dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'> <path stroke='none' d='M0 0h24v24H0z' fill='none'/> <path d='M7 16h-4l3.47 -4.66a2 2 0 1 0 -3.47 -1.54' /> <path d='M10 16v-8h4' /> <line x1='10' y1='12' x2='13' y2='12' /> <path d='M17 16v-6a2 2 0 0 1 4 0v6' /> <line x1='17' y1='13' x2='21' y2='13' /></svg>";

			document.getElementById('dialog-title').innerText = "Two-Factor Authentication (2FA)";
			document.getElementById('dialog-text').innerHTML = text;

			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["okay"];
			document.getElementById('dialog-button').onclick = () => location.reload();
			break;
		case 4:
			//Enable 2fa confirmation dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'> <path stroke='none' d='M0 0h24v24H0z' fill='none'/> <path d='M7 16h-4l3.47 -4.66a2 2 0 1 0 -3.47 -1.54' /> <path d='M10 16v-8h4' /> <line x1='10' y1='12' x2='13' y2='12' /> <path d='M17 16v-6a2 2 0 0 1 4 0v6' /> <line x1='17' y1='13' x2='21' y2='13' /></svg>";

			document.getElementById('dialog-title').innerText = "Two-Factor Authentication (2FA)";
			document.getElementById('dialog-text').innerHTML = lang[readData('lang')]["enable_2fa_question"] + "<br/><br/>" + lang[readData('lang')]["totp_applications"] + " <b>Aegis</b>, <b>Google Auth</b>, <b>Authy</b>...";

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["enable"];
			document.getElementById('dialog-button').onclick = () => enable2fa();
			break;
		case 5:
			//Disable 2fa confirmation dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'> <path stroke='none' d='M0 0h24v24H0z' fill='none'/> <path d='M7 16h-4l3.47 -4.66a2 2 0 1 0 -3.47 -1.54' /> <path d='M10 16v-8h4' /> <line x1='10' y1='12' x2='13' y2='12' /> <path d='M17 16v-6a2 2 0 0 1 4 0v6' /> <line x1='17' y1='13' x2='21' y2='13' /></svg>";

			document.getElementById('dialog-title').innerText = "Two-Factor Authentication (2FA)";
			document.getElementById('dialog-text').innerHTML = lang[readData('lang')]["disable_2fa_question"];

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["disable"];
			document.getElementById('dialog-button').onclick = () => disable2fa();
			break;
		case 6:
			//Add Yubico OTP confirmation dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

			document.getElementById('dialog-title').innerText = "Yubico One-Time Password (Yubico OTP)";
			document.getElementById('dialog-text').innerHTML = lang[readData('lang')]["yubikey_insert_device"] + "<br/>" + lang[readData('lang')]["yubikey_focus_input"] + "<br/>" + lang[readData('lang')]["yubikey_press_button"] + "<br/><br/><label for='yubico-otp' class='sr-only'>OTP </label><input id='yubico-otp' name='yubico-otp' type='text' autocomplete='off' required class='appearance-none rounded-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:z-10 sm:text-sm' placeholder='OTP'></div>";

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["add"];
			document.getElementById('dialog-button').onclick = () => addYubiKey(document.getElementById('yubico-otp').value);
			break;
		case 7:
			//Success dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

			document.getElementById('dialog-title').innerText = lang[readData('lang')]["success"];
			document.getElementById('dialog-text').innerHTML = text;

			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["okay"];
			document.getElementById('dialog-button').onclick = () => location.reload();
			break;
		case 8:
			//Remove Yubico OTP confirmation dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

			document.getElementById('dialog-title').innerText = "Yubico One-Time Password (Yubico OTP)";
			document.getElementById('dialog-text').innerHTML = lang[readData('lang')]["yubikey_insert_device"] + "<br/>" + lang[readData('lang')]["yubikey_focus_input"] + "<br/>" + lang[readData('lang')]["yubikey_press_button"] + "<br/><br/><label for='yubico-otp' class='sr-only'>OTP </label><input id='yubico-otp' name='yubico-otp' type='text' autocomplete='off' required class='appearance-none rounded-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:z-10 sm:text-sm' placeholder='OTP'></div>";

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang[readData('lang')]["remove"];
			document.getElementById('dialog-button').onclick = () => removeYubiKey(document.getElementById('yubico-otp').value);
			break;
	}
}

document.getElementById("settings-lang").addEventListener("change", () => {
	writeData('lang', document.getElementById("settings-lang").value);
	location.reload();
});

document.getElementById("settings-theme").addEventListener("change", () => {
	writeData('theme', document.getElementById("settings-theme").value);
	document.getElementById("css-theme").href = "css/themes/" + readData('theme') + ".css";
});

document.getElementById("settings-session").addEventListener("change", () => {
	writeData('sessionDuration', document.getElementById("settings-session").value);
	location.reload();
});

document.getElementById("delete-account-btn").addEventListener("click", () => {
	changeDialog(1);
	show('dialog');
});

document.getElementById("signout-link").addEventListener("click", () => {
	logout();
});

document.getElementById("signout-link-mobile").addEventListener("click", () => {
	logout();
});

document.getElementById("main-menu-toggle-btn").addEventListener("click", () => {
	toggleMenu();
});

document.getElementById("dialog-button-cancel").addEventListener("click", () => {
	hide('dialog');
});

document.getElementById("toggle-website-icons").addEventListener("click", () => {
	if(readData('websiteIcons') == "true") {
		writeData('websiteIcons', "false");
	}else{
		writeData('websiteIcons', "true");
	}
	toggleButton('toggle-website-icons');
});

document.getElementById("toggle-auto-search").addEventListener("click", () => {
	if (readData('autoSearch') == "false") {
		writeData('autoSearch', "true");
	} else {
		writeData('autoSearch', "false");
	}
	toggleButton('toggle-auto-search');
});

document.getElementById("toggle-2fa-btn").addEventListener("click", () => {
	if (readData('auth') == "true") {
		changeDialog(5);
		show('dialog');
	} else {
		changeDialog(4);
		show('dialog');
	}
});

document.getElementById("add-yubico-btn").addEventListener("click", () => {
	changeDialog(6);
	show('dialog');
});

document.getElementById("remove-yubico-btn").addEventListener("click", () => {
	changeDialog(8);
	show('dialog');
});