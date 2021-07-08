const { ipcMain, app, globalShortcut, webFrame, BrowserWindow, Menu } = require('electron')
const path = require('path')

let site = '../Visuals'

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        title: 'WBBD',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        },
        frame: false
    })    

    win.loadFile(`${site}/index.html`)
    // Menu.setApplicationMenu(null)

    ipcMain.on("toMain", (event, args) => {
        console.log(args)
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
