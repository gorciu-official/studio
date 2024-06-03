document.addEventListener('DOMContentLoaded', () => {
    changeTitle('Welcome');
});

function openFileTab(filename) {}

function openTab(type, name) {
    if (!type || !name) {
        return false;
    }
    
    if (type=='file') {
        return openFileTab(name);
    }
}