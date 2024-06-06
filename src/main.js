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

// Create a function to create a window
function createWindow() {
    // Create a browser window instance
    var bw = new BrowserWindow({
        width: 1000,
        height: 600,
        frame: false,
        webPreferences: {
            devTools: false,
            nodeIntegration: true
        }
    });

    bw.loadFile('./src/editor/editor.html');

    // Returns instance
    return bw;
}

// The app is ready to display window
app.whenReady(() => {
    // Create window
    createWindow();

    // Close app when all windows were closed
    app.on('window-all-closed', () => {
        app.quit();
    })
})