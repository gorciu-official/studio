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

// Gets an element
function get(pattern) {
    return document.querySelector(pattern);
}

// Changes title
function changeTitle(newTitle) {
    newTitle = newTitle + ' - Gorciu Studio';
    get('.title-bar .title').textContent = newTitle;
    get('title').textContent = newTitle;
}

// The resources has been loaded
document.addEventListener('DOMContentLoaded', () => {
    // Change title to `welcome`
    changeTitle('Welcome');
})