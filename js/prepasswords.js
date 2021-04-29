function displayPassword(id, website, username, password){
    document.write("<tr><td class='px-8 py-4 whitespace-nowrap'><div class='flex items-center'><div class='flex-shrink-0 h-10 w-10'>");
    //Icon
    document.write("<img class='h-10 w-10 rounded-full' src='https://www.google.com/s2/favicons?domain=" + website + "' alt=''>");
    document.write("</div><div class='ml-4'><div class='text-sm font-medium text-gray-900'>");
    //Url
    document.write(website);
    document.write("</div><div class='text-sm text-gray-500'>");
    //Username
    document.write(username);
    document.write("</div></div></div></td><td class='px-1 py-4 whitespace-nowrap'>");
    //Username
    document.write("<a href='javascript:copyToClipboard('" + username + "');'>");
    document.write("<svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-user' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='12' cy='7' r='4' /><path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' /></svg></a></td><td class='px-1 py-4 whitespace-nowrap'>");
    //Password
    document.write("<a href='javascript:copyToClipboard('" + password + "');'>");
    document.write("<svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-key' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg></a></td><td class='px-1 py-4 whitespace-nowrap'>");
    //ID
    document.write("<a href='javascript:editPassword(" + id + ")'>");
    document.write("<svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-edit' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' /><path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' /><line x1='16' y1='5' x2='19' y2='8' /></svg></a></td></tr>");
}