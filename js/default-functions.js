var parms = new URLSearchParams(window.location.search);
const IsNumeric = (num) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);

function fhide(element){
	document.getElementById(element).style.display = 'none';
}

function fshow(element, method){
	document.getElementById(element).style.display = method;
}

function hide(element){
	document.getElementById(element).style.visibility = 'hidden';
}

function show(element){
	document.getElementById(element).style.visibility = 'visible';
}

function isHidden(element){
	return (document.getElementById(element).style.visibility == 'hidden');
}

function isfHidden(element){
	return (document.getElementById(element).style.display == 'none');
}

function setText(element, text){
	document.getElementById(element).innerText = text;
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

function toggleButton(id){
	let button = document.getElementById(id);
	if(button.className.includes('successButton')){
		button.innerText = lang["disable"];
		button.className = "dangerButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
	}else{
		button.innerText = lang["enable"];
		button.className = "successButton font-bold inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none sm:text-sm";
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
	downloadAnchorNode.setAttribute("download", exportName);
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

function getDate(date){
	let local = new Date(date);
	local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return local.toJSON().slice(0, 10);
}

function showDialogButtons(){
	document.getElementById('dialog-button').style.display = "";
	document.getElementById('dialog-button-cancel').style.display = "";
}

function hideDialogButtons(){
	document.getElementById('dialog-button').style.display = "none";
	document.getElementById('dialog-button-cancel').style.display = "none";
}

function refreshPasswords(){

	Passky.getPasswords(readData('url'), readData('username'), readData('token')).then(response => {
		if(typeof response['error'] === 'undefined') return;
		if(response['error'] != 0 && response['error'] != 8) return;

		if(response['error'] == 0){
			writeData('passwords', JSON.stringify(response['passwords']));
		}else{
			writeData('passwords', '{}');
		}

		location.assign('passwords.html');
	}).catch();

}

function encryptPassword(password){
	return XChaCha20.encrypt(password, readData('token') + navigator.geolocation + readData('loginTime') + readData('url') + readData('username'));
}

function decryptPassword(password){
	return XChaCha20.decrypt(password, readData('token') + navigator.geolocation + readData('loginTime') + readData('url') + readData('username'));
}

function clearStorage(){
	deleteData('password');
	deleteData('passwords');
	deleteData('token');
	deleteData('auth');
	deleteData('yubico');
	deleteData('loginTime');
	deleteData('premiumExpires');
	deleteData('maxPasswords');
}

function isSessionValid(){
	if(readData('url') == null || typeof(readData('url')) == 'undefined' || readData('username') == null || typeof(readData('username')) == 'undefined' || readData('password') == null || typeof(readData('password')) == 'undefined' || readData('token') == null || typeof(readData('token')) == 'undefined' || readData('passwords') == null || typeof(readData('passwords')) == 'undefined' || readData('loginTime') == null || typeof(readData('loginTime')) == 'undefined' || readData('sessionDuration') == null || typeof(readData('sessionDuration')) == 'undefined' || ((parseFloat(readData('loginTime')) + (readData('sessionDuration') * 60000))) < new Date().getTime()){
		clearStorage();
		return false;
	}
	return true;
}

function logout(){
	clearStorage();
	location.assign('index.html');
}

function startAuthenticator(){
	if (!isSessionValid()) logout();
	window.setInterval(function() {
		if (!isSessionValid()) logout();
	}, 1500);
}