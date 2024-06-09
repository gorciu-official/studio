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

// Get required items from normal libraries
const path = require('path');
const os = require('os');
const fs = require('fs');
const url = require('url');

// Let the pre-editor variable
let preEditor = null;

/**
 * Creates a new electron window.
 * @param {string} filename   The file path to load.
 * @param {string} [search]   The optional URL search parameters.
 */
function createNewWindow(filename, search) {
    // Format the URL with optional search parameters
    filename = url.format({
        protocol: 'file:',
        pathname: filename,
        slashes: true,
        search: search ? `?${search}` : ''
    });

    // Create the browser window
    const electronWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 1000,
        minHeight: 800,
        icon: 'assets/logo.jpg',
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            devTools: false,
        }
    });

    // Load the URL into the window
    electronWindow.loadURL(filename);

    return electronWindow;
}

/**
 * Runs a new Gorciu Studio pre-editor instance.
 */
function runGorciuStudio() {
    preEditor = true;
    return createNewWindow('src/pre-editor/start.html');
}

/**
 * Runs a new Gorciu Studio editor instance.
 * @param {string} filePath         The file path of the project.
 * @param {boolean} isOpenedFirst   Flag indicating if the project is opened for the first time.
 */
function runEditor(filePath, isOpenedFirst) {
    preEditor = false;
    const searchParams = `project=${encodeURIComponent(filePath)}&created=${isOpenedFirst}`;
    return createNewWindow('src/editor/editor.html', searchParams);
}

/**
 * Validates the project type.
 * @param {string} type The type of the project.
 * @returns {boolean}   True if the type is valid, false otherwise.
 */
function validateType(type) {
    return ["default-normal", "default-basic"].includes(type);
}

/**
 * Creates a new project.
 * @param {string} type        The type of the project.
 * @param {string} name        The name of the project.
 * @returns {BrowserWindow}    The window instance running the new project.
 */
function createProject(type, name) {
    const dir = path.join(os.homedir(), 'gs/repos', name);
    if (name == '') {
        return runGorciuStudio(); // Project cannot be blank
    }

    if (fs.existsSync(dir)) {
        return runGorciuStudio(); // Project already exists, return to pre-editor
    }

    if (!validateType(type)) {
        return runGorciuStudio(); // Invalid type, return to pre-editor
    }

    fs.mkdirSync(dir, { recursive: true }); // Create the project directory
    return runEditor(dir, true); // Open the new project in the editor
}

// Handle IPC event to run editor
ipcMain.on('run-editor', (event, filePath, isOpenedFirst) => {
    runEditor(filePath, isOpenedFirst);
});

// Handle IPC event to create a new project
ipcMain.on('create-project', (event, type, name) => {
    createProject(type, name);
});

// Run Gorciu Studio when the app is ready
app.whenReady().then(runGorciuStudio);

// Handle all windows closed event
app.on('window-all-closed', () => {
    if (preEditor) {
        app.quit(); // Quit the app if in pre-editor mode
    } else {
        runGorciuStudio(); // Otherwise, return to pre-editor
    }
});

// Handle app activation (macOS specific behavior)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0 && preEditor == null) {
        runGorciuStudio();
    }
});