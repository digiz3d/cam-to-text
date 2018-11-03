export function addEntry(text) {
    let history;
    try {
        history = JSON.parse(localStorage.getItem('history')) || [];
    }
    catch (err) {
        history = [];
    }
    history.push(text);
    localStorage.setItem('history', JSON.stringify(history));
}

export function getEntry(i) {
    let history;
    try {
        history = JSON.parse(localStorage.getItem('history')) || [];
    }
    catch (err) {
        history = [];
    }
    return history[i] ? history[i] : null;
}

export function getEntries() {
    let history;
    try {
        history = JSON.parse(localStorage.getItem('history')) || [];
    }
    catch (err) {
        history = [];
    }
    return history;
}

export function removeEntries() {
    localStorage.setItem('history', JSON.stringify([]));
}