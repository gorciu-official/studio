document.addEventListener('DOMContentLoaded', () => {
    changeTitle('Welcome');
    loadFilesAndFolders();
});

function loadFilesAndFolders() {
    const filesIndex = document.querySelector('.files-index');
    const filesOpen = document.querySelector('.files-open');
    filesOpen.style.display = 'none';

    const fileStructure = {
        'Folder 1': {
            'Subfolder 1.1': {
                'file1.txt': 'Content of file1.txt',
                'file2.txt': 'Content of file2.txt'
            },
            'file3.txt': 'Content of file3.txt'
        },
        'Folder 2': {
            'file4.txt': 'Content of file4.txt'
        }
    };

    filesIndex.appendChild(createFolderTree(fileStructure));
}

function createFolderTree(structure) {
    const ul = document.createElement('ul');

    for (const name in structure) {
        const li = document.createElement('li');
        const item = structure[name];

        if (typeof item === 'object') {
            li.innerHTML = `<span class="folder">${name}</span>`;
            li.appendChild(createFolderTree(item));
            li.querySelector('.folder').onclick = function() {
                const sublist = this.nextElementSibling;
                if (sublist.style.display === 'none') {
                    sublist.style.display = 'block';
                } else {
                    sublist.style.display = 'none';
                }
            };
        } else {
            li.innerHTML = `<span class="file">${name}</span>`;
            li.querySelector('.file').onclick = function() {
                openFile(name, item);
            };
        }

        ul.appendChild(li);
    }

    return ul;
}

function openFile(name, content) {
    const editor = document.querySelector('.editor');
    editor.innerHTML = `<h2>${name}</h2><pre>${content}</pre>`;
}