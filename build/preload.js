/**
 * ==================================================================
 *                        Gorciu Studio
 *                       (C) 2024 Gorciu
 * ==================================================================
 * 
 * Please contribute with looking at license
**/

// Define constants
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Create context bridge
contextBridge.exposeInMainWorld('electron', {
    fs: {
        readFile: (filePath, encoding, callback) => {
            fs.readFile(filePath, encoding, callback);
        },
        readdir: (dirPath, callback) => {
            fs.readdir(dirPath, callback);
        },
        stat: (filePath, callback) => {
            fs.stat(filePath, callback);
        }
    },
    path: {
        join: (...args) => path.join(...args)
    },
    dialog: {
        showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options)
    }
});
