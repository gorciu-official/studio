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
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Let the pre-editor variable
let preEditor = null;

/**
 * Creates a new electron window.
*/
function createNewWindow(filename) {
    var electronWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 1000,
        minHeight: 800,
        icon: 'assets/logo.jpg',
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'), 
            //devTools: false,
        }
    });

    electronWindow.loadFile(filename);

    return electronWindow;
}

/**
 * Runs a new Gorciu Studio instance
*/
function runGorciuStudio() {
    preEditor = true;
    return createNewWindow(path.join(__dirname, 'pre-editor/start.html'));
}

/**
 * Runs a new Gorciu Studio editor instance
*/
function runEditor(filePath, isOpenedFirst) {
    preEditor = false;
    const url = 'src/editor/editor.html' + '?project=' + encodeURIComponent(filePath) + '&created=' + isOpenedFirst;
    return createNewWindow(url);
}

// Handle IPC event to run editor
ipcMain.on('run-editor', (event, filePath, isOpenedFirst) => {
    runEditor(filePath, isOpenedFirst);
});

// Run a Gorciu Studio finnally
app.whenReady().then(runGorciuStudio);

app.on('window-all-closed', () => {
    if (preEditor == true) {
        app.quit();
    } else {
        return runGorciuStudio();
    }
});