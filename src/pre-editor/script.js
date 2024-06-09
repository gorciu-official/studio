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

function startEditor(path) {
    window.electronAPI.runEditor(path, false);
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
        var isProject = false;

        projects.forEach(project => {
            isProject = true;

            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            const projectH3 = document.createElement('h3');
            projectH3.textContent = project.name;

            const projectDesc = document.createElement('p');
            projectDesc.textContent = 'Type: ' + project.about.type;

            projectDiv.appendChild(projectH3);
            projectDiv.appendChild(projectDesc);

            document.querySelector('.myprojects').appendChild(projectDiv);
        });
        
        if (!isProject) {
            document.querySelector('.myprojects').innerHTML = '<p><b>Projects not found!</b> Try creating a project in the section below.</p>';
        }
    })
}

document.addEventListener('DOMContentLoaded', getProjects)