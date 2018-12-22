const { app, ipcMain } = require('electron')
const mainWindow = require('./mainWindow')

require('electron-reload')(__dirname)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

ipcMain.on('new-item', (e, itemURL)=> {
  setTimeout(() => {
    e.sender.send('new-item-success', 'new read item')
  }, 2000)
})

app.on('ready', mainWindow.createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) mainWindow.createWindow()
})

