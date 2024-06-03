document.addEventListener('DOMContentLoaded', () => {
    changeTitle('Welcome');
});

// Opens card

function openFileTab(filename) {
    // Implement logic to open the file tab
    console.log(`Opening file tab: ${filename}`);
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
function openStructure(files_json, returning) {
    var elements = [];
    var elementsNumber = 1;

    files_json.forEach(element => {
        if (typeof element === 'object') {
            // This is a folder
            elementsNumber++;
            elements[elementsNumber] = openFolder(element);
        } else {
            // This is a file
            elementsNumber++;
            elements[elementsNumber] = openFile(element);
        }
    });

    if (returning) {
        return elements;
    } else {
        elements.forEach(el => {
            document.getElementById('editor').appendChild(el);
        });
    }
}

function openFolder(element) {
    // Creates a folder
    var folder = document.createElement('div');
    folder.classList.add('folder');

    // Creates a padding for items
    folder.style.paddingLeft = '5px';

    // Creates a name for the folder
    var folderName = document.createElement('div');
    folderName.classList.add('folder-name');
    folderName.innerText = element.name;
    folder.appendChild(folderName);

    // Recursively open items within the folder
    var inside = openStructure(element.items, true);

    // Append items inside the folder
    inside.forEach(item => {
        folder.appendChild(item);
    });

    return folder;
}

function openFile(filename) {
    // Creates a file
    var file = document.createElement('div');
    file.classList.add('file');
    file.innerText = filename;

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