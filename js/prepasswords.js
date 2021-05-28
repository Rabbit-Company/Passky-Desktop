if(sessionStorage.url == null && typeof(sessionStorage.url) == 'undefined') window.location.href = 'index.html';
if(sessionStorage.username == null && typeof(sessionStorage.username) == 'undefined') window.location.href = 'index.html';
if(sessionStorage.password == null && typeof(sessionStorage.password) == 'undefined') window.location.href = 'index.html';

function displayPassword(id, website, username, password){
    const decrypted_password = CryptoJS.AES.decrypt(password, sessionStorage.password).toString(CryptoJS.enc.Utf8);
    const data = id + " " + website + " " + username + " " + decrypted_password;

    document.write("<tr><td class='px-8 py-4 whitespace-nowrap'><div class='flex items-center'><div class='flex-shrink-0 h-10 w-10'>");
    //Icon
    document.write("<img class='h-10 w-10 rounded-full' src='https://www.google.com/s2/favicons?domain=" + website + "' alt=''>");
    document.write("</div><div class='ml-4'><div class='wesbite-url text-sm font-medium text-gray-900'>");
    //Url
    document.write(website);
    document.write("</div><div class='text-sm text-gray-500'>");
    //Username
    document.write(username);
    document.write("</div></div></div></td><td class='px-1 py-4 whitespace-nowrap'>");
    //Copy username
    document.write("<a href=\"javascript:copyToClipboard('" + username + "');\">");
    document.write("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='12' cy='7' r='4' /><path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' /></svg></a></td><td class='px-1 py-4 whitespace-nowrap'>");
    //Copy password
    document.write("<a href=\"javascript:copyToClipboard('" + decrypted_password + "');\">");
    document.write("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg></a></td><td class='px-1 py-4 whitespace-nowrap'>");
    //Edit Password
    document.write("<a href=\"javascript:changeDialog(4,'" + data + "'); show('dialog');\">");
    document.write("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' /><path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' /><line x1='16' y1='5' x2='19' y2='8' /></svg></a></td><td class='px-1 py-4 whitespace-nowrap'>");
    //Delete Password
    document.write("<a href=\"javascript:changeDialog(6," + id + "); show('dialog');\">");
    document.write("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9' /><line x1='18' y1='12.3' x2='11.7' y2='6' /></svg></a></td></tr>");
}