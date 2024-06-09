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

// Say that the script has been loaded
console.log("Loaded `script.js`");

// Changes title
function changeTitle(newTitle) {
    newTitle = newTitle + ' - Gorciu Studio';
    document.querySelector('.title-bar .title').textContent = newTitle;
    document.querySelector('title').textContent = newTitle;
}

// Display files
function displayFiles(files) {
    const fileContainer = document.createElement('div');
    fileContainer.style.padding = '5px';
    files.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.textContent = file;
        fileContainer.appendChild(fileElement);
    });
    document.body.appendChild(fileContainer);
}

// The resources have been loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get search params
    var params = new URLSearchParams(window.location.search);

    // Change title to project path
    changeTitle(params.get('project').replaceAll('\\', '/'));

    // Get and display files in src
    const projectPath = params.get('project');
    if (projectPath) {
        window.electronAPI.getFilesInSrc(projectPath, (files) => {
            displayFiles(files);
        });
    }
});