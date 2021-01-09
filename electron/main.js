const { app, BrowserWindow, Notification, ipcMain, Menu, Tray } = require('electron');
const path = require('path');

const createTemplate = require('../utils/Menu');

const dockIcon = path.join(__dirname, 'assets', 'images', 'react_app_logo.png');
const trayIcon = path.join(__dirname, 'assets', 'images', 'react_icon.png');

const isProd = app.isPackaged; // if isPackaged returns true, we're running a production build. If false, we must be in dev.

const createSplashScreen = () => {
  const window = new BrowserWindow({
    width: 400,
    height: 200,
    backgroundColor: '#6e707e',
    frame: false,
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
    },
  });
  window.loadFile('splash.html');
  return window;
};

let win = {};
const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#6e707e',
    show: false, // hide the window while it loads, and we reveal it within the app.whenReady() logic
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
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('electron-reloader')(module, {
    debug: true,
    watchRenderer: true,
  });
}

if (process.platform === 'darwin') {
  app.dock.setIcon(dockIcon);
}

let tray = null;
app.whenReady().then(() => {
  // build the menu to display @ top of screen on Mac / top of window on Windows
  // const template = require('../utils/Menu').createTemplate(app);
  const template = createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu); // we could make a different menu for the tray if we want, but we'll just reuse the OS menu for now

  const splash = createSplashScreen();
  const mainApp = createWindow();

  mainApp.once('ready-to-show', () => {
    splash.destroy();
    mainApp.show();
  });

  // const notification = new Notification({ title: 'Yo', body: 'My super cool notification' }); // creates a native OS notification using Electron Modules
  // notification.show();
});

ipcMain.on('notify', (e, str) => {
  Notification({ title: 'Notification', body: str });
});

ipcMain.on('quit', () => {});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
