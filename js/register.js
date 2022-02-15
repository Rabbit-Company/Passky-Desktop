initStorageCache.then(() => {

	if(readData('url') !== null && typeof(readData('url')) !== 'undefined') document.getElementById('passky-server').value = readData('url');

	document.getElementById("passky-server").placeholder = lang[readData('lang')]["server"];
	document.getElementById("username").placeholder = lang[readData('lang')]["username"];
	document.getElementById("email").placeholder = lang[readData('lang')]["email"];
	document.getElementById("password").placeholder = lang[readData('lang')]["password"];
	document.getElementById("tos").innerText = lang[readData('lang')]["terms_of_service"];
	document.getElementById("btn-dialog").innerText = lang[readData('lang')]["okay"];
	document.getElementById("error-dialog-modal-title").innerText = lang[readData('lang')]["error"];
	document.getElementById("btn_signup").innerText = lang[readData('lang')]["signup"];
	document.getElementById("btn_signin").innerText = lang[readData('lang')]["signin"];

});

document.getElementById("signup-form").addEventListener("submit", e => {
	e.preventDefault();
	onBtnClick();
});

document.getElementById("btn-dialog").addEventListener("click", () => {
	hide('error-dialog');
});

document.getElementById("btn_signin").addEventListener("click", () => {
	window.location.href = "index.html";
});

function onBtnClick(){

	const url = document.getElementById("passky-server").value;
	const username = document.getElementById("username").value.toLowerCase();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	Passky.createAccount(url, username, password, email).then(response => {

		if(typeof response['error'] === 'undefined'){
			setText('error-dialog-modal-text', lang[readData('lang')]["server_unreachable"]);
			show('error-dialog');
			return;
		}

		if(response['error'] != 0){
			setText('error-dialog-modal-text', errors[readData('lang')][response['error']]);
			show('error-dialog');
			return;
		}

		writeData('url', url);
		writeData('username', username);

		setText('error-dialog-modal-title', lang[readData('lang')]["success"]);
		setText('error-dialog-modal-text', lang[readData('lang')]["registration_completed"]);
		document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
		document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
		document.getElementById('btn-dialog').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium sm:text-sm"
		document.getElementById('btn-dialog').onclick = function(){
				window.location.href = 'index.html';
		}
		show('error-dialog');

	}).catch(err => {
		switch(err){
			case 1000:
				setText('error-dialog-modal-text', lang[readData('lang')]["server_unreachable"]);
			break;
			case 1001:
				setText('error-dialog-modal-text', lang[readData('lang')]["url_invalid"]);
			break;
			case 1005:
				setText('error-dialog-modal-text', errors[readData('lang')]["12"]);
			break;
			case 1006:
				setText('error-dialog-modal-text', errors[readData('lang')]["5"]);
			break;
			case 1007:
				setText('error-dialog-modal-text', errors[readData('lang')]["6"]);
			break;
			default:
				setText('error-dialog-modal-text', errors[readData('lang')][err]);
			break;
		}
		show('error-dialog');
	});

}