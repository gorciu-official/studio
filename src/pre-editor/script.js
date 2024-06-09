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

/**
 * Starts an editor
 * 
 * @param {String} path 
*/
function startEditor(path) {
    window.electronAPI.runEditor(path, false);
    window.close();
}

/**
 * Creates an editor
 * 
 * @param {String} type 
*/
function createEditor(type) {
    var name = document.querySelector('.pn').value;
    if (name == '') {
        name = 'project';
    }
    window.electronAPI.createProject(type, name);
    window.close();
}

/**
 * A function for getting projects via Electron API
*/
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

// Create a getProjects() callback after window spawn
document.addEventListener('DOMContentLoaded', getProjects)

// Make these functions available via HTML structure
window.startEditor = startEditor;
window.getProjects = getProjects;
window.createEditor = createEditor;