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

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    runEditor: (filePath, isOpenedFirst) => ipcRenderer.send('run-editor', filePath, isOpenedFirst),
    createProject: (type, name) => ipcRenderer.send('create-project', type, name),
    getProjects: (callback) => {
        ipcRenderer.send('get-projects');
        ipcRenderer.once('projects-list', (event, projects) => {
            callback(projects);
        });
    },
    getFilesInSrc: (projectPath, callback) => {
        ipcRenderer.send('get-files-in-src', projectPath);
        ipcRenderer.once('files-list', (event, files) => {
            callback(files);
        });
    }
});