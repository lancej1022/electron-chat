exports.createTemplate = (app) => {
  return [
    {
      label: process.platform === 'darwin' ? app.getName() : 'Menu',
      submenu: [
        {
          label: 'Exit',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          selector: 'undo:', // roles provide predefined behavior provided by Electron
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          selector: 'redo:', // roles provide predefined behavior provided by Electron
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          selector: 'cut:', // roles provide predefined behavior provided by Electron
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          selector: 'copy:', // roles provide predefined behavior provided by Electron
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          selector: 'paste:', // roles provide predefined behavior provided by Electron
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:', // roles provide predefined behavior provided by Electron
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (_, focusedWindow) => {
            if (focusedWindow) {
              // on reload, start fresh and close any old
              // open secondary windows
              if (focusedWindow.id === 1) {
                const { BrowserWindow } = require('electron');
                BrowserWindow.getAllWindows().forEach((win) => {
                  if (win.id > 1) {
                    win.close();
                  }
                });
              }
              focusedWindow.reload();
            }
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Ctrl+Command+F';
            } else {
              return 'F11';
            }
          })(),
          click: (_, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Alt+Command+I';
            } else {
              return 'Ctrl+Shift+I';
            }
          })(),
          click: (_, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          },
        },
        {
          type: 'separator', // provides a noticeable horizontal divider within the menu
        },
        {
          label: 'App Menu Demo',
          click: function (_, focusedWindow) {
            if (focusedWindow) {
              const options = {
                type: 'info',
                title: 'Application Menu Demo',
                buttons: ['Ok'],
                message:
                  'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.',
              };
              dialog.showMessageBox(focusedWindow, options);
            }
          },
        },
      ],
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          // nooooop
          role: 'minimize',
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
        {
          type: 'separator',
        },
        {
          label: 'Reopen Window',
          accelerator: 'CmdOrCtrl+Shift+T',
          enabled: false,
          click: () => {
            app.emit('activate');
          },
        },
      ],
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: () => {
            // The shell module provides functions related to desktop integration.
            // An example of opening a URL in the user's default browser:
            const { shell } = require('electron');
            shell.openExternal('http://electron.atom.io');
          },
        },
      ],
    },
  ];
};
