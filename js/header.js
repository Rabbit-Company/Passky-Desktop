if(localStorage.theme == null || typeof(localStorage.theme) == 'undefined') localStorage.theme = "dark";
if(localStorage.lang == null || typeof(localStorage.lang) == 'undefined') localStorage.lang = "en";
if(localStorage.sessionDuration == null || typeof(localStorage.sessionDuration) == 'undefined') localStorage.sessionDuration = 20;

if(!(["dark", "light", "blue", "dracula", "gray"].includes(localStorage.theme))) localStorage.theme = "dark";
document.getElementById("css-theme").href = "css/themes/" + localStorage.theme + ".css";

document.onkeydown = function(e) {
    if(e.key == "F12") return false;
    if(e.ctrlKey && e.shiftKey && e.key == 'I') return false;
    if(e.ctrlKey && e.shiftKey && e.key == 'C') return false;
    if(e.ctrlKey && e.shiftKey && e.key == 'J') return false;
    if(e.ctrlKey && (e.key == 'u' || e.key == 'U')) return false;
}

document.addEventListener('contextmenu', e => e.preventDefault());