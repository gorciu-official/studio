const wt = window.top;

function changeTitle(title) {
    wt.document.querySelector('title').textContent = title + ' - Gorciu Studio';
    wt.document.querySelector('.title').textContent = title + ' - Gorciu Studio';
}

function finishConfiguration() {
    wt.localStorage.setItem('loaded_before', true);
}