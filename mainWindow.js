const { BrowserWindow } = require('electron')

exports.win
exports.createWindow = () => {
    this.win = new BrowserWindow({
        width: 900,
        height: 650,
        minWidth: 350,
        maxWidth: 1200,
        minHeight: 310,
    })

    this.win.webContents.openDevTools()

    this.win.loadURL(`file://${__dirname}/renderer/main.html`)

    this.win.on("closed", () => {
        this.win = null
    })
}