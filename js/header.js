if(localStorage.theme == null || typeof(localStorage.theme) == 'undefined') localStorage.theme = "dark";
if(localStorage.lang == null || typeof(localStorage.lang) == 'undefined') localStorage.lang = "en";

if(!(localStorage.theme == "dark" || localStorage.theme == "light")) localStorage.theme = "dark";

switch(localStorage.theme){
    case "light":
        document.getElementById("css-theme").href = "css/themes/light.css";
    break;
}