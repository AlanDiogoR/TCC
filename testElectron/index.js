const { app, BrowserWindow } = require('electron');

let mainWindow; 

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    resizable: false
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`)
})