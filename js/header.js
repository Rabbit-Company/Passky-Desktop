if(localStorage.theme == null || typeof(localStorage.theme) == 'undefined') localStorage.theme = "dark";
if(localStorage.lang == null || typeof(localStorage.lang) == 'undefined') localStorage.lang = "en";
if(localStorage.sessionDuration == null || typeof(localStorage.sessionDuration) == 'undefined') localStorage.sessionDuration = 20;

if(!(localStorage.theme == "dark" || localStorage.theme == "light" || localStorage.theme == "blue")) localStorage.theme = "dark";

switch(localStorage.theme){
    case "light":
        document.getElementById("css-theme").href = "css/themes/light.css";
    break;
    case "blue":
        document.getElementById("css-theme").href = "css/themes/blue.css";
    break;
}