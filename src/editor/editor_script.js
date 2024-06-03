document.addEventListener('DOMContentLoaded', () => {
    changeTitle('Welcome');
});

// Opens card
function openFileTab(filename) {
}

function openTab(type, name) {
    if (!type || !name) {
        return false;
    }

    if (type == 'file') {
        return openFileTab(name);
    }
}

// Opens files
function openStructure(files_json, returning, padding = 0) {
    var elements = [];

    files_json.forEach(element => {
        if (typeof element === 'object') {
            // This is a folder
            elements.push(openFolder(element, padding + 5));
        } else {
            // This is a file
            elements.push(openFile(element, padding));
        }
    });

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
    var folder = document.createElement('div');
    folder.classList.add('folder');

    // Creates a padding for items
    folder.style.paddingLeft = padding + 'px';

    // Creates a name for the folder
    var folderName = document.createElement('div');
    folderName.classList.add('folder-name');
    folderName.innerText = element.name;
    folder.appendChild(folderName);

    // Recursively open items within the folder
    var inside = openStructure(element.items, true, padding);

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