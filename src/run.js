/**
 * ==================================================================
 *                        Gorciu Studio
 *                       (C) 2024 Gorciu
 * ==================================================================
 * 
 * Please contribute with looking at license
**/

const {app, BrowserWindow, ipcMain, dialog} = require('electron');

ipcMain.handle('show-open-dialog', async (event, options) => {
    const result = await dialog.showOpenDialog(options);
    return result;
});

/**
 * Creates a new electron window.
*/
function createNewWindow(filename) {
    var electronWindow = new BrowserWindow({
        width: 600,
        height: 800,
        minWidth: 600,
        minHeight: 800,
        icon: './assets/logo.jpg',
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            //devTools: false,
            preload: "./build/preload.js"
        }
    });

    electronWindow.loadFile(filename);
    electronWindow.maximize();

    return electronWindow;
}

/**
 * Runs a new Gorciu Studio instance
*/
function runGorciuStudio() {
    return createNewWindow('./src/editor/editor_window.html');
}

/**
 * Finnally run a Gorciu Studio
*/
app.whenReady().then(runGorciuStudio);

app.on('window-all-closed', () => {
    app.quit();
})