document.addEventListener('DOMContentLoaded', () => {
    changeTitle('Welcome');
});

var currentDir = null;
var nextTabId = 1;

async function readFileContents(filename, id) {
    try {
        const fileHandle = await currentDir.getFileHandle(filename);
        const file = await fileHandle.getFile();
        const reader = new FileReader();
        
        reader.onload = function(event) {
            displayFileContent(event.target.result, id);
        };
        
        reader.readAsText(file);
    } catch (error) {
        console.error('Error reading file:', error);
        if (error instanceof DOMException && error.name === 'NotFoundError') {
            console.error('File not found:', filename);
        }
    }
}

function displayFileContent(content, id) {
    const currentView = document.querySelector('.view[data-tabid="'+id+'"]');

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

function openFileTab(filename) {
    var view = document.createElement('div');
    view.dataset.tabid = nextTabId;
    view.classList.add('view');

    var tab = document.createElement('div');
    tab.dataset.tabid = nextTabId;
    tab.classList.add('tab');
    tab.textContent = filename;

    document.querySelector('.views').appendChild(view);
    document.querySelector('.tabs').appendChild(tab);

    readFileContents(filename, nextTabId);

    nextTabId++;

    return switchTab(nextTabId - 1);
}

function switchTab(tab_id) {
    var currentView = document.querySelector('.views .view.current');
    if (currentView) {
        currentView.classList.remove('current');
    }
    var currentTab = document.querySelector('.tabs .tab.current');
    if (currentTab) {
        currentTab.classList.remove('current');
    }
    var newView = document.querySelector('.views .view[data-tabid="'+tab_id+'"]');
    var newTab = document.querySelector('.tabs .tab[data-tabid="'+tab_id+'"]');
    if (newView && newTab) {
        newView.classList.add('current');
        newTab.classList.add('current');
    } else {
        console.error('Tab with id ' + tab_id + ' does not exist.');
    }
}

function openTab(type, name) {
    if (!type || !name) {
        return false;
    }

    if (type == 'file') {
        return openFileTab(name);
    }
}

// Switchs cards
function switchTab(tab_id) {
    var currentView = document.querySelector('.views .view.current');
    if (currentView !== null) {
        currentView.classList.remove('current');
    }
    var currentTab = document.querySelector('.tabs .tab.current');
    if (currentTab !== null) {
        currentTab.classList.remove('current');
    }
    var newView = document.querySelector('.views .view[data-tabid="'+tab_id+'"]');
    var newTab = document.querySelector('.tabs .tab[data-tabid="'+tab_id+'"]');
    if (newView !== null && newTab !== null) {
        newView.classList.add('current');
        newTab.classList.add('current');
    } else {
        console.error('Tab with id ' + tab_id + ' does not exist.');
    }
}

// Opens files
async function openStructure(files_json, returning, padding = 0) {
    var elements = [];

    for (const element of files_json) {
        if (typeof element === 'object') {
            // This is a folder
            elements.push(await openFolder(element, padding + 5));
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

async function openFolder(element, padding) {
    // Creates a folder
    var folder = document.createElement('div');
    folder.classList.add('folder');
    folder.style.paddingLeft = padding + 'px';

    // Creates a name for the folder
    var folderName = document.createElement('div');
    folderName.classList.add('folder-name');
    folderName.innerText = element.name;
    folder.appendChild(folderName);

    // Recursively open items within the folder
    var inside = await openStructure(element.items, true, padding);

    // Append items inside the folder
    inside.forEach(item => {
        folder.appendChild(item);
    });

    return folder;
}

function openFile(filename, padding) {
    // Creates a file
    var file = document.createElement('div');
    file.classList.add('file');
    file.innerText = filename;
    file.style.paddingLeft = padding + 'px';

    // Add click event to open the file tab
    file.addEventListener('click', () => {
        openTab('file', filename);
    });

    return file;
}

async function getDirectoryStructure(directoryHandle) {
    const structure = [];

    for await (const [name, handle] of directoryHandle) {
        if (handle.kind === 'file') {
            structure.push(name);
        } else if (handle.kind === 'directory') {
            const items = await getDirectoryStructure(handle);
            structure.push({ name, items });
        }
    }

    return structure;
}

async function openFileSystem() {
    try {
        const directoryHandle = await window.showDirectoryPicker();
        currentDir = directoryHandle;
        const structure = await getDirectoryStructure(directoryHandle);
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

    var edt = document.querySelector('.editor');
    edt.innerHTML = '<div class="tabs"></div><div class="views"></div>';
}

function createExampleFileStructure() {
    // This function doesn't do anything in the code, it is only an info for developers how structures are generated
    return [
        "file.txt", // This is a file
        { // This is a folder
            "name": "src", // The folder's name
            "items": [ // The folder's items
                "file.txt" // This is a file
                // Inside a folder there can be a folder
            ]
        }
    ];
}