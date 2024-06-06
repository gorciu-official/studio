/**
 * ======================================================================
 *                           Gorciu Studio
 *                          (C) 2024 Gorciu
 * ======================================================================
 * 
 * Read before doing anything:  README.MD
 * Contributing instructions:   CONTRIBUTING.MD
 * License:                     LICENSE.MD
*/

// Get required items from Electron library
const {app, BrowserWindow} = require('electron');

/**
 * Creates a new electron window.
*/
function createNewWindow(filename) {
    var electronWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 1000,
        minHeight: 800,
        icon: './assets/logo.jpg',
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
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