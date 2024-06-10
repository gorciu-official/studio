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
    const fileContainer = document.querySelector('.files');

    // Clear previous files
    fileContainer.innerHTML = '';

    if (files.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'No files found.';
        emptyMessage.classList.add('no-files');
        fileContainer.appendChild(emptyMessage);
    } else {
        const buildTree = (nodes, parentElement, isRoot = false) => {
            const ulElement = document.createElement('ul');
            if (isRoot) ulElement.classList.add('root');
            parentElement.appendChild(ulElement);
            nodes.forEach(node => {
                const liElement = document.createElement('li');
                liElement.textContent = node.name;
                ulElement.appendChild(liElement);
                if (node.children) {
                    buildTree(node.children, liElement);
                }
            });
        };

        buildTree(files, fileContainer, true);
    }
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