const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const path = require('path');

const isProd = app.isPackaged; // if isPackaged returns true, we're running a production build. If false, we must be in dev.

let win = {};

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: 'white',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false, // block access to Node methods in the client
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
};

if (isProd === false) {
  // enable hot reloading for dev
  // require('electron-reload')(__dirname, {
  //   electron: path.join(process.cwd(), 'node_modules', '.bin', 'electron'), // specify path to electron
  // });
  require('electron-reloader')(module, {
    debug: true,
    watchRenderer: true,
  });
}

app.whenReady().then(() => {
  createWindow();
  const notification = new Notification({ title: 'Yo', body: 'My super cool notification' }); // creates a native OS notification using Electron Modules
  notification.show();
});

ipcMain.on('notify', (e, str) => {
  new Notification({ title: 'Notification', body: str });
});

ipcMain.on('quit', () => {});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
