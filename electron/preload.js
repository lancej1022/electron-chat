const { ipcRenderer, contextBridge } = require('electron');

/**
 *  'electron' prefix is meant to indicate to other devs that this is part of the electron environment -- its not an official name or method or anything ...
 *  this is so that when you invoke these contextBridge methods over in App.js or whatever by typing 'electron.notificationApi.sendNotification()' you realize where that API comes from ...
 *  because otherwise, if it was just named something like 'notificationApi' without the electron prefix, it could be confusing, since you're not actually writing 'import notificationApi' from XYZ anywhere.
 *  So by using a common prefix like 'e_' or 'electron', you and other developers can quickly recognize where that method actually came from
 */
contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    },
  },

  appApi: {
    quitApp() {
      ipcRenderer.send('app-quit');
    },
  },
});
