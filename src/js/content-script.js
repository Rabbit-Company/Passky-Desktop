chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let username = null;
  let password = null;
  let usernameFilled = false;
  let passwordFilled = false;

  if(typeof(request.password) !== 'undefined') password = request.password;
  if(typeof(request.username) !== 'undefined') username = request.username;
  if(username === null || password === null) return;

  let inputs = document.getElementsByTagName("input");

  // Password input detection
  for(let i = 0; i < inputs.length; i++){
    let type = inputs[i].type?.toLowerCase();
    let autocomplete = inputs[i].autocomplete?.toLowerCase();
    if(type !== 'password') continue;
    if(autocomplete !== 'current-password') continue;

    inputs[i].value = password;
    passwordFilled = true;
    break;
  }

  // Username input detection
  for(let i = 0; i < inputs.length; i++){
    let type = inputs[i].type?.toLowerCase();
    let name = inputs[i].name?.toLowerCase();
    if(!(type === 'text' || type === 'email')) continue;
    if(!(name.includes('user') || name.includes('email'))) continue;

    inputs[i].value = username;
    usernameFilled = true;
    break;
  }

  if(usernameFilled && passwordFilled) return;

  // Desperate password input detection
  for(let i = 0; i < inputs.length; i++){
    if(passwordFilled) break;
    let type = inputs[i].type?.toLowerCase();
    if(type !== 'password') continue;

    inputs[i].value = password;
    passwordFilled = true;
    break;
  }

  // Desperate username input detection
  for(let i = 0; i < inputs.length; i++){
    if(usernameFilled) break;
    let type = inputs[i].type?.toLowerCase();
    if(!(type === 'text' || type === 'email')) continue;

    inputs[i].value = username;
    usernameFilled = true;
    break;
  }
});