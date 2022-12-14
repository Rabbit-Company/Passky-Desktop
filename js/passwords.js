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

	document.getElementById("total-passwords").innerText = lang["total_passwords"];
	document.getElementById("decryption-time").innerText = lang["decryption_time"];
	document.getElementById("client-version").innerText = lang["client_version"];

	document.getElementById("search").placeholder = lang["search"];
	document.getElementById("add-password-btn").innerText = lang["add_password"];

	document.getElementById("dialog-button-cancel").innerText = lang["cancel"];

	if (readData('autoSearch') != "false") {
		try {
			chrome.tabs.query({
				active: true,
				lastFocusedWindow: true
			}, tabs => {
				if (typeof(tabs[0]) !== 'undefined' && typeof(tabs[0].url) !== 'undefined' && tabs[0].url !== null && parms.get("search") == null) {
					window.location.assign("?search=" + new URL(tabs[0].url).hostname.replace("www.", ""));
				}
			});
		} catch {}
	}

	let start = new Date().getTime();
	if (readData('passwords') !== null && typeof(readData('passwords')) !== 'undefined') {
		let passwords = JSON.parse(readData('passwords'));
		const websiteIcons = readData('websiteIcons');
		const maxPasswords = readData('maxPasswords');

		//Search
		let search = null;
		if (parms.get("search") != null && parms.get("search").length >= 1) {
			fhide('pagination');
			search = parms.get("search");
			document.getElementById("search").value = search;
			let tempArray = [];
			search = search.toLowerCase();
			for(let i = 0; i < passwords.length; i++){
				const website = XChaCha20.decrypt(passwords[i].website, decryptPassword(readData('password')));
				const username = XChaCha20.decrypt(passwords[i].username, decryptPassword(readData('password')));

				if(website.includes(search) || username.includes(search)) tempArray.push(passwords[i]);
			}
			passwords = tempArray;
		}

		let amount = (passwords.length > 0) ? passwords.length : 0;
		document.getElementById("stats-passwords").innerText = ((maxPasswords < 0) ? amount : amount + " / " + maxPasswords);

		//Page settings
		let page = (parms.get("page") != null && IsNumeric(parms.get("page")) && parseFloat(parms.get("page")) >= 1) ? parseFloat(parms.get("page")) : 1;
		let limit = (search == null) ? 25 : amount;
		let startFrom = (page - 1) * limit;
		let totalPages = Math.ceil(amount / limit);
		if(totalPages != 0 && page > totalPages) window.location.href = 'passwords.html?page=' + totalPages;
		let stopOn = (startFrom+limit > amount) ? amount : startFrom+limit;

		//Pagination
		if(search == null && totalPages > 1) fshow('pagination', 'block');
		document.getElementById("label-startFrom").innerText = startFrom+1;
		document.getElementById("label-stopOn").innerText = stopOn;
		document.getElementById("label-totalPasswords").innerText = amount;

		if(page == 1) fhide('pagination-left');
		if(page == totalPages) fhide('pagination-right');

		document.getElementById("pagination-left").href = "?page=" + (page-1);
		document.getElementById("page").value = page;
		document.getElementById("page").max = totalPages;
		document.getElementById("pagination-right").href = "?page=" + (page+1);

		let html_passwords = "";
		for (let i = startFrom; i < stopOn; i++) {
			const id = passwords[i].id;
			const website = XChaCha20.decrypt(passwords[i].website, decryptPassword(readData('password')));
			const username = XChaCha20.decrypt(passwords[i].username, decryptPassword(readData('password')));

			html_passwords += "<tr class='passwordsBorderColor'><td class='px-8 py-4 max-w-xs whitespace-nowrap overflow-hidden'><div class='flex items-center'><div class='flex-shrink-0 h-10 w-10'>";
			//Icon
			if(websiteIcons == "true"){
				html_passwords += "<img class='h-10 w-10 rounded-full' loading='lazy' src='https://www.google.com/s2/favicons?domain=" + website + "' alt=''>";
			}else{
				html_passwords += "<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='12' cy='12' r='9' /><line x1='3.6' y1='9' x2='20.4' y2='9' /><line x1='3.6' y1='15' x2='20.4' y2='15' /><path d='M11.5 3a17 17 0 0 0 0 18' /><path d='M12.5 3a17 17 0 0 1 0 18' /></svg>";
			}
			html_passwords += "</div><div class='ml-4'><div class='tertiaryColor text-sm font-medium max-w-[14rem] sm:max-w-[16rem] md:max-w-[24rem] lg:max-w-[34rem] xl:max-w-[50rem] 2xl:max-w-[54rem] overflow-hidden text-ellipsis'>";
			//Url
			html_passwords += website;
			html_passwords += "</div><div class='secondaryColor text-sm max-w-[14rem] sm:max-w-[16rem] md:max-w-[24rem] lg:max-w-[34rem] xl:max-w-[50rem] 2xl:max-w-[54rem] overflow-hidden text-ellipsis'>";
			//Username
			html_passwords += username;
			html_passwords += "</div></div></div></td><td class='px-1 py-4 w-16 whitespace-nowrap'>";
			//Copy username
			html_passwords += "<span id='copy-username-" + id + "' role='button'>";
			html_passwords += "<svg class='m-auto' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='12' cy='7' r='4' /><path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' /></svg></span></td><td class='px-1 py-4 w-16 whitespace-nowrap'>";
			//Copy password
			html_passwords += "<span id='copy-password-" + id + "' role='button'>";
			html_passwords += "<svg class='m-auto' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg></span></td><td class='px-1 py-4 w-16 whitespace-nowrap'>";
			//Edit Password
			html_passwords += "<span id='edit-password-" + id + "' role='button'>";
			html_passwords += "<svg class='m-auto' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' /><path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' /><line x1='16' y1='5' x2='19' y2='8' /></svg></span></td><td class='px-1 py-4 w-16 whitespace-nowrap'>";
			//Delete Password
			html_passwords += "<span id='delete-password-" + id + "' role='button'>";
			html_passwords += "<svg class='m-auto' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9' /><line x1='18' y1='12.3' x2='11.7' y2='6' /></svg></span></td></tr>";
		}

		document.getElementById("table-data").innerHTML = html_passwords;

		for (let i = startFrom; i < stopOn; i++) {
			const id = passwords[i].id;
			const website = XChaCha20.decrypt(passwords[i].website, decryptPassword(readData('password')));
			const username = XChaCha20.decrypt(passwords[i].username, decryptPassword(readData('password')));
			const password = XChaCha20.decrypt(passwords[i].password, decryptPassword(readData('password')));
			const message = XChaCha20.decrypt(passwords[i].message, decryptPassword(readData('password')));

			const data = id + ";;;" + website + ";;;" + username + ";;;" + password + ";;;" + message;

			document.getElementById("copy-username-" + id).addEventListener("click", () => {
				copyToClipboard(username);
				changeDialog(7, 1);
				show('dialog');
			});

			document.getElementById("copy-password-" + id).addEventListener("click", () => {
				copyToClipboard(password);
				changeDialog(7, 2);
				show('dialog');
			});

			document.getElementById("edit-password-" + id).addEventListener("click", () => {
				changeDialog(4, data);
				show('dialog');
			});

			document.getElementById("delete-password-" + id).addEventListener("click", () => {
				changeDialog(6, id);
				show('dialog');
			});
		}
	}
	let end = new Date().getTime();
	document.getElementById("stats-loading-time").innerText = (end - start) + " ms";
});

document.getElementById("search").addEventListener("keypress", (event) => {
	if (event.key !== "Enter") return;
	event.preventDefault();
	window.location.assign("?search=" + document.getElementById("search").value);
});

document.getElementById("page").addEventListener("keypress", (event) => {
	if (event.key !== "Enter") return;
	event.preventDefault();
	window.location.assign("?page=" + document.getElementById("page").value);
});

document.getElementById("logo").addEventListener("click", () => {
	refreshPasswords();
});

document.getElementById("dialog-button-cancel").addEventListener("click", () => {
	hide('dialog');
});

document.getElementById("signout-link-mobile").addEventListener("click", () => {
	logout();
});

document.getElementById("main-menu-toggle-btn").addEventListener("click", () => {
	toggleMenu();
});

document.getElementById("add-password-btn").addEventListener("click", () => {
	changeDialog(0);
	show('dialog');
});

document.getElementById("signout-link").addEventListener("click", () => {
	logout();
});

function updateGeneratedPassword(upper, number, special) {
	let length = document.getElementById('btn-length').value;
	let password = PasswordGenerator.generate(length, upper, number, special);
	let entropy = 100 - (PasswordEntropy.calculate(password));
	if(entropy <= 1) entropy = 0;

	document.getElementById('pass-length').innerText = length;
	document.getElementById("entropy").style.width = entropy + "%";
	document.getElementById('generated-password').value = password;
}

function togglePasswordHider(){
	try{
		let pg = document.getElementById('generated-password');
		let ph = document.getElementById('password-hider');
		if(pg.type === 'password'){
			pg.type = 'text';
			ph.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><line x1='3' y1='3' x2='21' y2='21'></line><path d='M10.584 10.587a2 2 0 0 0 2.828 2.83'></path><path d='M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341'></path></svg>";
		}else{
			pg.type = 'password';
			ph.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><circle cx='12' cy='12' r='2'></circle><path d='M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7'></path></svg>";
		}
	}catch{}
}

function changeDialog(style, text) {
	switch (style) {
		case 2:
			//Add password error
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";

			document.getElementById('dialog-title').innerText = lang["error"];
			document.getElementById('dialog-text').innerText = text;

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["try_again"];
			document.getElementById('dialog-button').onclick = () => changeDialog(0);
			break;
		case 3:
			//Password added successfully
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";

			document.getElementById('dialog-title').innerText = lang["success"];

			let message = lang["add_password_success"];
			switch (text) {
				case 1:
					message = lang["change_password_success"];
					break;
				case 2:
					message = lang["remove_password_success"];
					break;
			}
			document.getElementById('dialog-text').innerText = message;

			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["okay"];
			document.getElementById('dialog-button').onclick = () => refreshPasswords();
			break;
		case 4:
			//Edit password dialog
			const e_data = text.split(";;;");

			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

			document.getElementById('dialog-title').innerText = lang["edit_password"];

			document.getElementById('dialog-text').innerHTML = "<div class='rounded-md shadow-sm -space-y-px'><div><label for='website' class='sr-only'>Website</label><input id='website' name='website' type='text' autocomplete='website' value='" + e_data[1] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='" + lang["website"] + "'></div><div><label for='username' class='sr-only'>Username</label><input id='username' name='username' type='text' autocomplete='username' value='" + e_data[2] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='" + lang["username"] + "'></div>   <div><div class='flex rounded-md shadow-sm'><div class='relative flex items-stretch flex-grow focus-within:z-10'><input id='password' name='password' type='password' autocomplete='current-password' value='" + e_data[3] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-bl-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='" + lang["password"] + "'></div><button id='btn-password-generator' class='secondaryColor tertiaryBackgroundColor primaryBorderColor -ml-px relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-br-mdfocus:outline-none'><svg xmlns='http://www.w3.org/2000/svg' class='primaryStrokeColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg></button></div></div><h3 id='optionalNote' class='tertiaryColor text-lg leading-6 font-medium py-2'>Optional note</h3><textarea id='message' name='message' rows='3' class='max-w-lg p-2 shadow-sm block w-full sm:text-sm rounded-md focus:outline-none focus:z-10'>" + e_data[4] + "</textarea>";

			document.getElementById('dialog-button-cancel').style.display = 'initial';
			document.getElementById('optionalNote').innerText = lang["optional_note"];

			document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["change"];
			document.getElementById('dialog-button').onclick = () => editPassword(e_data[0]);

			document.getElementById('btn-password-generator').onclick = () => changeDialog(5, text);
			break;
		case 5:
			//Password Generator dialog
			const pg_data = text.split(";;;");

			let btn_upper_enabled = true;
			let btn_numbers_enabled = true;
			let btn_special_enabled = true;

			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg>";

			document.getElementById('dialog-title').innerText = lang["password_generator"];

			document.getElementById('dialog-text').innerHTML = "<div class='mt-2'><label for='password' class='sr-only'>Password</label><div class='flex rounded-md shadow-sm'><div class='relative flex flex-grow items-stretch focus-within:z-10'><div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><circle cx='8' cy='15' r='4'></circle><line x1='10.85' y1='12.15' x2='19' y2='4'></line><line x1='18' y1='5' x2='20' y2='7'></line><line x1='15' y1='8' x2='17' y2='10'></line></svg></div><input id='generated-password' name='password' type='password' autocomplete='new-password' required class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-tl-md block w-full pl-10 px-3 py-2 border focus:outline-none sm:text-sm' placeholder='Password'></div><button id='password-hider' type='button' class='relative -ml-px inline-flex items-center space-x-2 border tertiaryBackgroundColor tertiaryColor primaryBorderColor rounded-tr-md px-4 py-2 text-sm font-medium focus:outline-none'><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><circle cx='12' cy='12' r='2'></circle><path d='M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7'></path> </svg></button></div></div><div class='bg-gradient-to-r from-red-500 to-green-500 primaryBorderColor appearance-none rounded-b-md relative block w-full border overflow-hidden'><div id='entropy' class='h-1.5 tertiaryBackgroundColor tertiaryColor float-right' style='width: 100%'></div></div><div class='mt-2'><div class='flex items-center justify-between'><span class='text-sm font-medium'>" + lang["length"] + "</span><span id='pass-length' class='text-sm font-medium'>20</span></div><input type='range' id='btn-length' min='10' max='50' value='20' class='primaryBackgroundColor rounded-full h-5 w-full cursor-pointer focus:outline-none'></div><div class='flex items-center justify-between text-left'><span class='flex-grow flex flex-col'><span class='text-sm font-medium'>A-Z</span></span><button type='button' id='btn-upper' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none' role='switch' aria-checked='false'><span aria-hidden='true' class='secondaryBackgroundColor pointer-events-none absolute w-full h-full rounded-md'></span><span id='btn-upper-color' aria-hidden='true' class='primaryBackgroundColor pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span id='btn-upper-animation' aria-hidden='true' class='secondaryBackgroundColor translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div><div class='flex items-center justify-between text-left'><span class='flex-grow flex flex-col'><span class='text-sm font-medium'>0-9</span></span><button type='button' id='btn-numbers' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none' role='switch' aria-checked='false'><span aria-hidden='true' class='secondaryBackgroundColor pointer-events-none absolute w-full h-full rounded-md'></span><span id='btn-numbers-color' aria-hidden='true' class='primaryBackgroundColor pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span id='btn-numbers-animation' aria-hidden='true' class='secondaryBackgroundColor translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div><div class='flex items-center justify-between text-left'><span class='flex-grow flex flex-col'><span class='text-sm font-medium'>!@#$%?&*</span></span><button type='button' id='btn-special' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none' role='switch' aria-checked='false'><span aria-hidden='true' class='secondaryBackgroundColor pointer-events-none absolute w-full h-full rounded-md'></span><span id='btn-special-color' aria-hidden='true' class='primaryBackgroundColor pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span id='btn-special-animation' aria-hidden='true' class='secondaryBackgroundColor translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div>";

			document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";

			updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);

			document.getElementById('btn-upper').onclick = () => {
				btn_upper_enabled = !btn_upper_enabled;
				animateButton('btn-upper', btn_upper_enabled);
				updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);
			}
			document.getElementById('btn-numbers').onclick = () => {
				btn_numbers_enabled = !btn_numbers_enabled;
				animateButton('btn-numbers', btn_numbers_enabled);
				updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);
			}
			document.getElementById('btn-special').onclick = () => {
				btn_special_enabled = !btn_special_enabled;
				animateButton('btn-special', btn_special_enabled);
				updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);
			}
			document.getElementById('btn-length').onchange = () => {
				updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);
			}

			if (pg_data[0] == null) {
				document.getElementById('dialog-button').innerText = lang["copy"];
				document.getElementById('dialog-button').onclick = () => copyToClipboard(document.getElementById('generated-password').value);
			} else if (pg_data[0] == "-1") {
				document.getElementById('dialog-button').innerText = lang["use"];
				document.getElementById('dialog-button').onclick = () => {
					text = pg_data[0] + ";;;" + pg_data[1] + ";;;" + pg_data[2] + ";;;" + document.getElementById('generated-password').value + ";;;" + pg_data[4];
					changeDialog(0, text);
				}
			} else {
				document.getElementById('dialog-button').innerText = lang["use"];
				document.getElementById('dialog-button').onclick = () => {
					text = pg_data[0] + ";;;" + pg_data[1] + ";;;" + pg_data[2] + ";;;" + document.getElementById('generated-password').value + ";;;" + pg_data[4];
					changeDialog(4, text);
				}
			}

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			animateButton('btn-upper', btn_upper_enabled);
			animateButton('btn-numbers', btn_numbers_enabled);
			animateButton('btn-special', btn_special_enabled);

			document.getElementById('password-hider').onclick = () => togglePasswordHider();
			break;
		case 6:
			//Delete password dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";

			document.getElementById('dialog-title').innerText = lang["delete_password"];
			document.getElementById('dialog-text').innerText = lang["delete_password_confirmation"];

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["delete"];
			document.getElementById('dialog-button').onclick = () => deletePassword(text);
			break;
		case 7:
			//Copied successfully
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";

			document.getElementById('dialog-title').innerText = lang["success"];

			switch (text) {
				case 1:
					document.getElementById('dialog-text').innerText = lang["copy_username_success"];
					break;
				case 2:
					document.getElementById('dialog-text').innerText = lang["copy_password_success"];
					break;
			}

			document.getElementById('dialog-button-cancel').style.display = 'none';

			document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["okay"];
			document.getElementById('dialog-button').onclick = () => hide('dialog');
			break;
		case 8:
			//Loading...
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><path d='M12 3a9 9 0 1 0 9 9'></path></svg>";

			document.getElementById('dialog-title').innerText = lang["please_wait"];
			document.getElementById('dialog-text').innerHTML = lang[text];

			hideDialogButtons();
			break;
		default:
			//Add password dialog
			document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

			document.getElementById('dialog-title').innerText = lang["add_password"];

			document.getElementById('dialog-text').innerHTML = "<div><div class='relative rounded-md shadow-sm'><div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><polyline points='5 12 3 12 12 3 21 12 19 12'></polyline><path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7'></path><path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6'></path></svg></div><input id='website' name='website' type='text' autocomplete='website' required class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-none block w-full pl-10 px-3 py-2 border rounded-t-md focus:outline-none focus:z-10 sm:text-sm' placeholder=\"" + lang['website'] + "\"></div></div><div><div class='relative rounded-md shadow-sm'><div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><circle cx='12' cy='7' r='4'></circle><path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path></svg></div><input id='username' name='username' type='text' autocomplete='username' required class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-none block w-full pl-10 px-3 py-2 border-x focus:outline-none focus:z-10 sm:text-sm' placeholder=\"" + lang['username'] + "\"></div></div><div><div class='flex rounded-md shadow-sm'><div class='relative flex flex-grow items-stretch focus-within:z-10'><div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 secondaryColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><circle cx='8' cy='15' r='4'></circle><line x1='10.85' y1='12.15' x2='19' y2='4'></line><line x1='18' y1='5' x2='20' y2='7'></line><line x1='15' y1='8' x2='17' y2='10'></line></svg></div><input id='password' name='password' type='password' autocomplete='current-password' required class='tertiaryBackgroundColor tertiaryColor primaryBorderColor appearance-none rounded-bl-md block w-full pl-10 px-3 py-2 border focus:outline-none sm:text-sm' placeholder=\"" + lang['password'] + "\"></div><button id='btn-password-generator' class='relative -ml-px inline-flex items-center space-x-2 border tertiaryBackgroundColor tertiaryColor primaryBorderColor px-4 py-2 text-sm font-medium rounded-br-md focus:outline-none'><svg xmlns='http://www.w3.org/2000/svg' class='primaryStrokeColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg></button></div></div><h3 id='optionalNote' class='tertiaryColor text-lg leading-6 font-medium py-2'>Optional note</h3><textarea id='message' name='message' rows='3' class='max-w-lg p-2 shadow-sm block w-full sm:text-sm rounded-md focus:outline-none focus:z-10'></textarea>";

			document.getElementById('optionalNote').innerText = lang["optional_note"];

			document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
			document.getElementById('dialog-button').innerText = lang["add"];
			document.getElementById('dialog-button').onclick = () => addPassword();

			if (text != null) {
				const data = text.split(";;;");
				document.getElementById("website").value = data[1];
				document.getElementById("username").value = data[2];
				document.getElementById("password").value = data[3];
				document.getElementById("message").value = data[4];
			} else {
				try {
					chrome.tabs.query({
						active: true,
						lastFocusedWindow: true
					}, tabs => {
						if (typeof(tabs[0]) !== 'undefined' && typeof(tabs[0].url) !== 'undefined' && tabs[0].url !== null) {
							document.getElementById("website").value = new URL(tabs[0].url).hostname.replace("www.", "");
						}
					});
				} catch {}
			}

			document.getElementById('dialog-button-cancel').style.display = 'initial';

			document.getElementById('btn-password-generator').onclick = () => changeDialog(5, "-1" + ";;;" + document.getElementById("website").value + ";;;" + document.getElementById("username").value + ";;;" + document.getElementById("password").value + ";;;" + document.getElementById("message").value);
			break;
	}
}

function addPassword() {
	if (!isSessionValid()) window.location.href = 'index.html';

	const website = document.getElementById("website").value;
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const message = document.getElementById("message").value;

	changeDialog(8, "saving_password");

	Passky.savePassword(readData('url'), readData('username'), readData('token'), decryptPassword(readData('password')), [website, username, password, message]).then(response => {

		showDialogButtons();

		if (typeof response['error'] === 'undefined') {
			changeDialog(2, lang["server_unreachable"]);
			return;
		}

		if (response['error'] != 0) {
			changeDialog(2, lang[response['error']]);
			return;
		}

		changeDialog(3, 0);

	}).catch(err => {
		showDialogButtons();
		switch(err){
			case 1001:
				changeDialog(2, lang["url_invalid"]);
			break;
			case 1003:
				changeDialog(2, lang["25"]);
			break;
			case 1005:
				changeDialog(2, lang["12"]);
			break;
			case 1006:
				changeDialog(2, lang["5"]);
			break;
			case 1008:
				changeDialog(2, lang["website_validation"]);
			break;
			case 1009:
				changeDialog(2, lang["username_validation"]);
			break;
			case 1010:
				changeDialog(2, lang["password_validation"]);
			break;
			case 1011:
				changeDialog(2, lang["18"]);
			break;
			default:
				changeDialog(2, lang["server_unreachable"]);
			break;
		}
	});
}

function editPassword(password_id) {
	if (!isSessionValid()) window.location.href = 'index.html';

	const website = document.getElementById("website").value;
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const message = document.getElementById("message").value;

	changeDialog(8, "changing_password");

	Passky.editPassword(readData('url'), readData('username'), readData('token'), decryptPassword(readData('password')), password_id, [website, username, password, message]).then(response => {

		showDialogButtons();

		if (typeof response['error'] === 'undefined') {
			changeDialog(2, lang["server_unreachable"]);
			return;
		}

		if (response['error'] != 0) {
			changeDialog(2, lang[response['error']]);
			return;
		}

		changeDialog(3, 1);

	}).catch(err => {
		showDialogButtons();
		switch(err){
			case 1001:
				changeDialog(2, lang["url_invalid"]);
			break;
			case 1003:
				changeDialog(2, lang["25"]);
			break;
			case 1005:
				changeDialog(2, lang["12"]);
			break;
			case 1006:
				changeDialog(2, lang["5"]);
			break;
			case 1008:
				changeDialog(2, lang["website_validation"]);
			break;
			case 1009:
				changeDialog(2, lang["username_validation"]);
			break;
			case 1010:
				changeDialog(2, lang["password_validation"]);
			break;
			case 1011:
				changeDialog(2, lang["18"]);
			break;
			default:
				changeDialog(2, lang["server_unreachable"]);
			break;
		}
	});
}

function deletePassword(password_id) {

	changeDialog(8, "deleting_password");

	Passky.deletePassword(readData('url'), readData('username'), readData('token'), password_id).then(response => {

		showDialogButtons();

		if (typeof response['error'] === 'undefined') {
			changeDialog(2, lang["server_unreachable"]);
			return;
		}

		if (response['error'] != 0) {
			changeDialog(2, lang[response['error']]);
			return;
		}

		changeDialog(3, 2);

	}).catch(err => {
		showDialogButtons();
		switch(err){
			case 1001:
				changeDialog(2, lang["url_invalid"]);
			break;
			case 1003:
				changeDialog(2, lang["25"]);
			break;
			case 1005:
				changeDialog(2, lang["12"]);
			break;
			default:
				changeDialog(2, lang["server_unreachable"]);
			break;
		}
	});
}
