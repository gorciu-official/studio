function startEditor(path) {
    window.electronAPI.runEditor('path/to/file', false);
    window.close();
}
function createEditor(type) {
    var name = document.querySelector('.pn').value;
    if (name == '') {
        name = 'project';
    }
    window.electronAPI.createEditor(type, name);
    window.close();
}
function getProjects() {
    window.electronAPI.getProjects((projects) => {
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            const projectH3 = document.createElement('h3');
            projectH3.textContent = project.name;

            const projectDesc = document.createElement('p');
            projectDesc.textContent = 'Typ: ' + project.about.type;

            projectDiv.appendChild(projectH3);
            projectDiv.appendChild(projectDesc);
        });
    })
}