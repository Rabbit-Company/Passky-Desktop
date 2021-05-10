const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) return app.quit();

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    minWidth: 500,
    minHeight: 500
  });

  win.setMenuBarVisibility(false);
  win.setTitle("Passky");
  win.setIcon(path.join(__dirname, 'images/logo.png'));

  win.loadFile(path.join(__dirname, 'html/login.html'));
  //win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
