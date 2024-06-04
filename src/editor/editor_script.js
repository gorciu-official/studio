function changeTitle(title) {
    window.top.document.querySelector('title').textContent = title + ' - Gorciu Studio';
    window.top.document.querySelector('.title').textContent = title + ' - Gorciu Studio';
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        changeTitle('Welcome');
    }, 500)
});

let currentDir = null;
let nextTabId = 1;

function readFileContents(filePath, id) {
    if (!filePath || typeof filePath !== 'string') {
        console.error('Invalid file path:', filePath);
        return;
    }

    if (!currentDir) {
        console.error('Current directory is not set.');
        return;
    }

    try {
        const fullPath = path.join(currentDir, filePath);
        fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            displayFileContent(data, id);
        });
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

function displayFileContent(content, id) {
    const currentView = document.querySelector(`.view[data-tabid="${id}"]`);

    if (!currentView) {
        console.error('View with id ' + id + ' does not exist.');
        return;
    }

    const fileContentElement = document.createElement('div');
    fileContentElement.classList.add('file-content');
    fileContentElement.innerText = content;

    currentView.innerHTML = '';
    currentView.appendChild(fileContentElement);
}

function openFileTab(filePath) {
    const view = document.createElement('div');
    view.dataset.tabid = nextTabId;
    view.classList.add('view');

    const tab = document.createElement('div');
    tab.dataset.tabid = nextTabId;
    tab.classList.add('tab');
    tab.textContent = filePath;

    document.querySelector('.views').appendChild(view);
    document.querySelector('.tabs').appendChild(tab);

    if (currentDir === null) {
        filePath = '/' + filePath;
    }

    readFileContents(filePath, nextTabId);

    const currentTabId = nextTabId;
    nextTabId++;

    tab.addEventListener('click', () => {
        switchTab(currentTabId);
    });

    return switchTab(currentTabId);
}

function switchTab(tab_id) {
    const currentView = document.querySelector('.views .view.current');
    if (currentView) {
        currentView.classList.remove('current');
    }
    const currentTab = document.querySelector('.tabs .tab.current');
    if (currentTab) {
        currentTab.classList.remove('current');
    }

    const newView = document.querySelector(`.views .view[data-tabid="${tab_id}"]`);
    const newTab = document.querySelector(`.tabs .tab[data-tabid="${tab_id}"]`);
    if (newView && newTab) {
        newView.classList.add('current');
        newTab.classList.add('current');
    } else {
        console.error('Tab with id ' + tab_id + ' does not exist.');
    }
}

function openTab(type, path) {
    if (!type || !path) {
        return false;
    }

    if (type === 'file') {
        return openFileTab(path);
    }
}

function openStructure(files_json, returning, padding = 0) {
    const elements = [];

    for (const element of files_json) {
        if (typeof element === 'object') {
            // This is a folder
            elements.push(openFolder(element, padding + 5));
        } else {
            // This is a file
            elements.push(openFile(element, padding));
        }
    }

    if (returning) {
        return elements;
    } else {
        const filesIndex = document.querySelector('.files-index');
        filesIndex.style.display = 'none';
        filesIndex.innerHTML = '';
        document.querySelector('.files-open').style.display = 'none';
        elements.forEach(el => {
            filesIndex.appendChild(el);
        });
        filesIndex.style.display = '';
    }
}

function openFolder(element, padding) {
    // Creates a folder
    const folder = document.createElement('div');
    folder.classList.add('folder');
    folder.style.paddingLeft = padding + 'px';

    // Creates a name for the folder
    const folderName = document.createElement('div');
    folderName.classList.add('folder-name');
    folderName.innerText = element.name;
    folder.appendChild(folderName);

    // Recursively open items within the folder
    const inside = openStructure(element.items, true, padding);

    // Append items inside the folder
    inside.forEach(item => {
        folder.appendChild(item);
    });

    return folder;
}

function openFile(filePath, padding) {
    // Creates a file
    const file = document.createElement('div');
    file.classList.add('file');
    file.innerText = filePath;
    file.style.paddingLeft = padding + 'px';

    // Add click event to open the file tab
    file.addEventListener('click', () => {
        openFileTab(filePath);
    });

    return file;
}

function getDirectoryStructure(dirPath) {
    const structure = [];

    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const items = getDirectoryStructure(filePath);
            structure.push({ name: file, items });
        } else {
            structure.push(file);
        }
    });

    return structure;
}

async function openFileSystem() {
    try {
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });

        if (result.canceled || result.filePaths.length === 0) {
            console.error('No directory selected.');
            return;
        }

        currentDir = result.filePaths[0];
        const structure = getDirectoryStructure(currentDir);
        openStructure(structure);
    } catch (error) {
        console.error('Error accessing file system:', error);
    }
}

function unopenFS() {
    currentDir = null;
    const filesIndex = document.querySelector('.files-index');
    filesIndex.style.display = 'none';
    filesIndex.innerHTML = '';
    document.querySelector('.files-open').style.display = 'none';
    document.querySelector('.files-open').style.display = 'block';

    const edt = document.querySelector('.editor');
    edt.innerHTML = '<div class="tabs"></div><div class="views"></div>';
}

function createExampleFileStructure() {
    // This function doesn't do anything in the code, it is only an info for developers how structures are generated
    return [
        "file.txt", // This is a file
        { // This is a folder
            name: "src", // The folder's name
            items: [ // The folder's items
                "file.txt" // This is a file
                // Inside a folder there can be a folder
            ]
        }
    ];
}