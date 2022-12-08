loadData().then(() => {
	startAuthenticator();

	document.getElementById("passwords-link").innerText = lang["passwords"];
	document.getElementById("import-export-link").innerText = lang["import_export"];
	document.getElementById("settings-link").innerText = lang["settings"];
	document.getElementById("signout-link").innerText = lang["signout"];

	document.getElementById("passwords-link-mobile").innerText = lang["passwords"];
	document.getElementById("import-export-link-mobile").innerText = lang["import_export"];
	document.getElementById("settings-link-mobile").innerText = lang["settings"];
	document.getElementById("signout-link-mobile").innerText = lang["signout"];

	document.getElementById("passky-backup-btn-text").innerText = lang["backup"];

	document.getElementById("passky-import-btn-text").innerText = lang["import"];
	document.getElementById("bitwarden-import-btn-text").innerText = lang["import"];
	document.getElementById("keepassxc-import-btn-text").innerText = lang["import"];
	document.getElementById("nordpass-import-btn-text").innerText = lang["import"];
	document.getElementById("onepassword-import-btn-text").innerText = lang["import"];
	document.getElementById("keeper-import-btn-text").innerText = lang["import"];
	document.getElementById("lastpass-import-btn-text").innerText = lang["import"];
	document.getElementById("dashlane-import-btn-text").innerText = lang["import"];
	document.getElementById("chromium-import-btn-text").innerText = lang["import"];
	document.getElementById("firefox-import-btn-text").innerText = lang["import"];

	document.getElementById("passky-export-btn-text").innerText = lang["export"];
	document.getElementById("keepassxc-export-btn-text").innerText = lang["export"];
	document.getElementById("nordpass-export-btn-text").innerText = lang["export"];
	document.getElementById("keeper-export-btn-text").innerText = lang["export"];
	document.getElementById("lastpass-export-btn-text").innerText = lang["export"];
	document.getElementById("dashlane-export-btn-text").innerText = lang["export"];

	document.getElementById("dialog-button-cancel").innerText = lang["cancel"];
});

let passwordManagers = ["Passky","Lastpass","Bitwarden","Dashlane","NordPass","KeePassXC","Keeper","1Password","FireFox","Chromium"];

function import_passky(){

	if(!isSessionValid()) window.location.href = 'index.html';

	const imported_data = document.getElementById("import-data").value;

	if(!Validate.json(imported_data)){
		changeDialog(2, 1, 0);
		return;
	}

	let ido = JSON.parse(imported_data);

	if(ido["encrypted"] == null || typeof(ido["encrypted"]) == 'undefined'){
		changeDialog(2, 1, 0);
		return;
	}

	import_data(ido["passwords"], ido["encrypted"]);
}

function backup_passky(){

	if(!isSessionValid()) window.location.href = 'index.html';

	let passwords = JSON.parse(readData('passwords'));
	for(let i = 0; i < passwords.length; i++) delete passwords[i]['id'];

	let backup_passky = { encrypted : true, passwords : passwords };

	downloadObjectAsJson(backup_passky, "passky_backup_" + getDate(new Date()));
}

function export_passky(){

	if(!isSessionValid()) window.location.href = 'index.html';

	let passwords = JSON.parse(readData('passwords'));
	for(let i = 0; i < passwords.length; i++){
		delete passwords[i]['id'];
		passwords[i]['website'] = XChaCha20.decrypt(passwords[i]['website'], decryptPassword(readData('password')));
		passwords[i]['username'] = XChaCha20.decrypt(passwords[i]['username'], decryptPassword(readData('password')));
		passwords[i]['password'] = XChaCha20.decrypt(passwords[i]['password'], decryptPassword(readData('password')));
		passwords[i]['message'] = XChaCha20.decrypt(passwords[i]['message'], decryptPassword(readData('password')));
	}

	let export_passky = { encrypted : false, passwords : passwords };

	downloadObjectAsJson(export_passky, "passky_export_" + getDate(new Date()));
}

function import_bitwarden(){

	if(!isSessionValid()) window.location.href = 'index.html';

	const imported_data = document.getElementById("import-data").value;

	if(!Validate.json(imported_data)){
		changeDialog(2, 1, 2);
		return;
	}

	let ido = JSON.parse(imported_data);

	if(ido["encrypted"] == null || typeof(ido["encrypted"]) == 'undefined' || ido["encrypted"] == true){
		changeDialog(2, 1, 2);
		return;
	}

	if(ido["items"] == null || typeof(ido["items"]) == 'undefined'){
		changeDialog(2, 1, 2);
		return;
	}

	let passwords = [];
	for(let i = 0, j = 0; i < ido["items"].length; i++){
		if(ido["items"][i]["type"] != 1) continue;

		let website = ido["items"][i]["name"];
		if(typeof(ido["items"][i]["login"]["uris"]) != 'undefined' && typeof(ido["items"][i]["login"]["uris"][0]) != 'undefined' && typeof(ido["items"][i]["login"]["uris"][0]["uri"]) != 'undefined'){
			website = ido["items"][i]["login"]["uris"][0]["uri"];
		}

		website = website.replace("http://", "").replace("https://", "").replace("www.", "").replace(" ", "-");
		if(website.slice(-1) == '/') website = website.slice(0, -1);
		let username = ido["items"][i]["login"]["username"];
		let password = ido["items"][i]["login"]["password"];
		let message = ido["items"][i]["login"]["notes"];

		passwords[j] = {};
		passwords[j]["website"] = website;
		passwords[j]["username"] = username;
		passwords[j]["password"] = password;
		passwords[j]["message"] = message;
		j++;
	}

	import_data(passwords, false);
}

function export_keepassxc(){
	if(!isSessionValid()) window.location.href = 'index.html';

	let exportedPasswords = [];
	let passwords = JSON.parse(readData('passwords'));
	for(let i = 0; i < passwords.length; i++){
		const website = XChaCha20.decrypt(passwords[i]["website"], decryptPassword(readData('password')));
		exportedPasswords[i] = {};
		exportedPasswords[i].Group = "Root";
		exportedPasswords[i].Title = website;
		exportedPasswords[i].Username = XChaCha20.decrypt(passwords[i]["username"], decryptPassword(readData('password')));
		exportedPasswords[i].Password = XChaCha20.decrypt(passwords[i]["password"], decryptPassword(readData('password')));
		exportedPasswords[i].URL = website;
		exportedPasswords[i].Notes = XChaCha20.decrypt(passwords[i]["message"], decryptPassword(readData('password')));
		exportedPasswords[i].TOTP = null;
		exportedPasswords[i].Icon = 0;
		exportedPasswords[i]["Last Modified"] = new Date().toISOString();
		exportedPasswords[i]["Created"] = new Date().toISOString();
	}

	downloadTxt($.csv.fromObjects(exportedPasswords), "keepassxc_" + getDate(new Date()) + ".csv");
}

function export_nordpass(){
	if(!isSessionValid()) window.location.href = 'index.html';

	let exportedPasswords = [];
	let passwords = JSON.parse(readData('passwords'));
	for(let i = 0; i < passwords.length; i++){
		const website = XChaCha20.decrypt(passwords[i]["website"], decryptPassword(readData('password')));
		exportedPasswords[i] = {};
		exportedPasswords[i].name = website;
		exportedPasswords[i].url = website;
		exportedPasswords[i].username = XChaCha20.decrypt(passwords[i]["username"], decryptPassword(readData('password')));
		exportedPasswords[i].password = XChaCha20.decrypt(passwords[i]["password"], decryptPassword(readData('password')));
		exportedPasswords[i].note = XChaCha20.decrypt(passwords[i]["message"], decryptPassword(readData('password')));
		exportedPasswords[i].cardholdername = null;
		exportedPasswords[i].cardnumber = null;
		exportedPasswords[i].cvc = null;
		exportedPasswords[i].expirydate = null;
		exportedPasswords[i].zipcode = null;
		exportedPasswords[i].folder = null;
		exportedPasswords[i].full_name = null;
		exportedPasswords[i].phone_number = null;
		exportedPasswords[i].email = null;
		exportedPasswords[i].address1 = null;
		exportedPasswords[i].address2 = null;
		exportedPasswords[i].city = null;
		exportedPasswords[i].country = null;
		exportedPasswords[i].state = null;
	}

	downloadTxt($.csv.fromObjects(exportedPasswords), "nordpass_" + getDate(new Date()) + ".csv");
}

function export_keeper(){
	if(!isSessionValid()) window.location.href = 'index.html';

	let exportedPasswords = [];
	let passwords = JSON.parse(readData('passwords'));
	for(let i = 0; i < passwords.length; i++){
		const website = XChaCha20.decrypt(passwords[i]["website"], decryptPassword(readData('password')));
		exportedPasswords[i] = {};
		exportedPasswords[i].Folder = null;
		exportedPasswords[i].Title = website;
		exportedPasswords[i].Login = XChaCha20.decrypt(passwords[i]["username"], decryptPassword(readData('password')));
		exportedPasswords[i].Password = XChaCha20.decrypt(passwords[i]["password"], decryptPassword(readData('password')));
		exportedPasswords[i].URL = website;
		exportedPasswords[i].Notes = XChaCha20.decrypt(passwords[i]["message"], decryptPassword(readData('password')));
	}

	downloadTxt($.csv.fromObjects(exportedPasswords), "keeper_" + getDate(new Date()) + ".csv");
}

function export_lastpass(){

	if(!isSessionValid()) window.location.href = 'index.html';

	let exportedPasswords = [];
	let passwords = JSON.parse(readData('passwords'));
	for(let i = 0; i < passwords.length; i++){
		const website = XChaCha20.decrypt(passwords[i]["website"], decryptPassword(readData('password')));
		exportedPasswords[i] = {};
		exportedPasswords[i].url = website;
		exportedPasswords[i].username = XChaCha20.decrypt(passwords[i]["username"], decryptPassword(readData('password')));
		exportedPasswords[i].password = XChaCha20.decrypt(passwords[i]["password"], decryptPassword(readData('password')));
		exportedPasswords[i].totp = null;
		exportedPasswords[i].extra = XChaCha20.decrypt(passwords[i]["message"], decryptPassword(readData('password')));
		exportedPasswords[i].name = website;
		exportedPasswords[i].grouping = null;
		exportedPasswords[i].fav = 0;
	}

	downloadTxt($.csv.fromObjects(exportedPasswords), "lastpass_" + getDate(new Date()) + ".csv");
}

function export_dashlane(){

	if(!isSessionValid()) window.location.href = 'index.html';

	let exportedPasswords = [];
	let passwords = JSON.parse(readData('passwords'));
	for(let i = 0; i < passwords.length; i++){
		const website = XChaCha20.decrypt(passwords[i]["website"], decryptPassword(readData('password')));
		exportedPasswords[i] = {};
		exportedPasswords[i].username = XChaCha20.decrypt(passwords[i]["username"], decryptPassword(readData('password')));
		exportedPasswords[i].username2 = null;
		exportedPasswords[i].username3 = null;
		exportedPasswords[i].title = website;
		exportedPasswords[i].password = XChaCha20.decrypt(passwords[i]["password"], decryptPassword(readData('password')));
		exportedPasswords[i].note = XChaCha20.decrypt(passwords[i]["message"], decryptPassword(readData('password')));
		exportedPasswords[i].url = website;
		exportedPasswords[i].category = null;
		exportedPasswords[i].otpSecret = null;
	}

	downloadTxt($.csv.fromObjects(exportedPasswords), "dashlane_" + getDate(new Date()) + ".csv");
}

function import_csv(id){
	if(!isSessionValid()) window.location.href = 'index.html';

	let ido = "";
	try{
		ido = $.csv.toArrays(document.getElementById("import-data").value);
	}catch{
		changeDialog(2, 1, id);
		return;
	}

	let websiteID = 0;
	let usernameID = 0;
	let passwordID = 0;
	let messageID = 0;
	let titleID = 0;

	switch(id){
		case 1:
			//LastPass
			websiteID = 0;
			usernameID = 1;
			passwordID = 2;
			messageID = 4;
			titleID = 5;
		break;
		case 3:
			//Dashlane
			websiteID = 6;
			usernameID = 0;
			passwordID = 4;
			messageID = 5;
			titleID = 3;
		break;
		case 4:
			//NordPass
			websiteID = 1;
			usernameID = 2;
			passwordID = 3;
			messageID = 4;
			titleID = 0;
		break;
		case 5:
			//KeePassXC
			websiteID = 4;
			usernameID = 2;
			passwordID = 3;
			messageID = 5;
			titleID = 1;
		break;
		case 6:
			//Keeper
			websiteID = 4;
			usernameID = 2;
			passwordID = 3;
			messageID = 5;
			titleID = 1;
		break;
		case 7:
			//1Password
			websiteID = 4;
			usernameID = 2;
			passwordID = 3;
			messageID = 8;
			titleID = 1;
		break;
		case 8:
			//Firefox
			websiteID = 0;
			usernameID = 1;
			passwordID = 2;
			messageID = 9;
			titleID = 0;
		break;
		case 9:
			//Chromium
			websiteID = 1;
			usernameID = 2;
			passwordID = 3;
			messageID = 4;
			titleID = 0;
		break;
	}

	let passwords = [];
	for(let i = 1, j = 0; i < ido.length; i++){
		let website = ido[i][websiteID].replace("http://", "").replace("https://", "").replace("www.", "").replace(" ", "-");
		if(website.slice(-1) == '/') website = website.slice(0, -1);

		if(!Validate.pWebsite(website)){
			website = ido[i][titleID].replace("http://", "").replace("https://", "").replace("www.", "").replace(" ", "-");
			if(website.slice(-1) == '/') website = website.slice(0, -1);
		}

		let username = ido[i][usernameID];
		let password = ido[i][passwordID];
		let message = ido[i][messageID];

		passwords[j] = {};
		passwords[j]["website"] = website;
		passwords[j]["username"] = username;
		passwords[j]["password"] = password;
		passwords[j]["message"] = message;
		j++;
	}

	import_data(passwords, false);
}

function import_data(passwords, encrypted = false){

	changeDialog(4, passwords.length);
	show("dialog");

	Passky.importPasswords(readData('url'), readData('username'), readData('token'), passwords, encrypted, decryptPassword(readData("password"))).then(response => {

		showDialogButtons();

		if(typeof response['error'] === 'undefined'){
			changeDialog(0, lang["server_unreachable"]);
			return;
		}

		if(response['error'] != 0){
			changeDialog(0, lang[response['error']]);
			return;
		}

		if(response['import_error'] == 0){
			changeDialog(3, lang["import_success"].replace("{success_number}", response['import_success']));
		}else{
			changeDialog(3, lang["import_errors"].replace("{success_number}", response['import_success']).replace("{error_number}", response['import_error']));
		}

	}).catch(err => {
		showDialogButtons();
		switch(err){
			case 1000:
				changeDialog(0, lang["server_unreachable"]);
			break;
			case 1001:
				changeDialog(0, lang["url_invalid"]);
			break;
			case 1003:
				changeDialog(0, lang["25"]);
			break;
			case 1005:
				changeDialog(0, lang["12"]);
			break;
			case 1006:
				changeDialog(0, lang["5"]);
			break;
			case 1013:
				changeDialog(3, lang["import_success"].replace("{success_number}", "0"));
			break;
			default:
				changeDialog(0, lang[err]);
			break;
		}
	});
}

function changeImportDialog(name, id){
	document.getElementById('dialog-title').innerText = lang["import_from"].replace("{name}", name);
	if(id == 0){
		document.getElementById('import-data').placeholder = lang["import_paste"].replace("{name}", name).replace("{type}", "json");
		document.getElementById('dialog-button').onclick = () => import_passky();
	}else if(id == 2){
		document.getElementById('import-data').placeholder = lang["import_paste"].replace("{name}", name).replace("{type}", "json");
		document.getElementById('dialog-button').onclick = () => import_bitwarden();
	}else{
		document.getElementById('import-data').placeholder = lang["import_paste"].replace("{name}", name).replace("{type}", "csv");
		document.getElementById('dialog-button').onclick = () => import_csv(id);
	}
}

function changeDialog(style, text, text2){
	switch(style){
		case 1:
			//Import Dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

			document.getElementById('dialog-text').innerHTML = "<textarea id='import-data' name='about' rows='3' class='max-w-lg shadow-sm block w-full p-2 sm:text-sm rounded-md focus:outline-none'></textarea>";

			document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["import"];

			changeImportDialog(passwordManagers[text], text);
		break;
		case 2:
			//Import Error
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";

			document.getElementById('dialog-title').innerText = lang["error"];
			document.getElementById('dialog-text').innerText = lang["import_invalid"];

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["try_again"];
			document.getElementById('dialog-button').onclick = () => changeDialog(text, text2);
		break;
		case 3:
			//Import Success
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";

			document.getElementById('dialog-title').innerText = lang["success"];
			document.getElementById('dialog-text').innerText = text;

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["okay"];
			document.getElementById('dialog-button').onclick = () => refreshPasswords();
		break;
		case 4:
			//Importing...
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><path d='M12 3a9 9 0 1 0 9 9'></path></svg>";

			document.getElementById('dialog-title').innerText = lang["importing"];
			document.getElementById('dialog-text').innerHTML = lang["importing_passwords"].replace("{amount}", "<b>" + text + "</b>");

			hideDialogButtons();
		break;
		default:
			//Error
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";

			document.getElementById('dialog-title').innerText = lang["error"];
			document.getElementById('dialog-text').innerText = text;

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["okay"];
			document.getElementById('dialog-button').onclick = () => hide('dialog');
		break;
	}
}

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

document.getElementById("passky-import-btn").addEventListener("click", () => {
	changeDialog(1, 0);
	show('dialog');
});

document.getElementById("passky-backup-btn").addEventListener("click", () => {
	backup_passky();
});

document.getElementById("passky-export-btn").addEventListener("click", () => {
	export_passky();
});

document.getElementById("bitwarden-import-btn").addEventListener("click", () => {
	changeDialog(1, 2);
	show('dialog');
});

document.getElementById("keepassxc-import-btn").addEventListener("click", () => {
	changeDialog(1, 5);
	show('dialog');
});

document.getElementById("keepassxc-export-btn").addEventListener("click", () => {
	export_keepassxc();
});

document.getElementById("nordpass-import-btn").addEventListener("click", () => {
	changeDialog(1, 4);
	show('dialog');
});

document.getElementById("nordpass-export-btn").addEventListener("click", () => {
	export_nordpass();
});

document.getElementById("onepassword-import-btn").addEventListener("click", () => {
	changeDialog(1, 7);
	show('dialog');
});

document.getElementById("keeper-import-btn").addEventListener("click", () => {
	changeDialog(1, 6);
	show('dialog');
});

document.getElementById("keeper-export-btn").addEventListener("click", () => {
	export_keeper();
});

document.getElementById("lastpass-import-btn").addEventListener("click", () => {
	changeDialog(1, 1);
	show('dialog');
});

document.getElementById("lastpass-export-btn").addEventListener("click", () => {
	export_lastpass();
});

document.getElementById("dashlane-import-btn").addEventListener("click", () => {
	changeDialog(1, 3);
	show('dialog');
});

document.getElementById("dashlane-export-btn").addEventListener("click", () => {
	export_dashlane();
});

document.getElementById("firefox-import-btn").addEventListener("click", () => {
	changeDialog(1, 8);
	show('dialog');
});

document.getElementById("chromium-import-btn").addEventListener("click", () => {
	changeDialog(1, 9);
	show('dialog');
});