function saveSettings(useLetters) {
localStorage.setItem("useLetters", JSON.stringify(useLetters));
}

function loadSettings(toggleElement) {
const saved = JSON.parse(localStorage.getItem("useLetters"));
if (saved !== null) {
toggleElement.checked = saved;
}
}

