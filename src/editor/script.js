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

// The resources has been loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get search params
    var params = new URLSearchParams(window.location.search);

    // Change title to project path
    changeTitle(params.get('project'));
})