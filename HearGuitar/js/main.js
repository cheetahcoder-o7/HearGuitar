function navigate(page) {
window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");

if (startBtn) {
    const input = document.getElementById("songInput");
    const errorText = document.getElementById("errorText");

    startBtn.addEventListener("click", () => {
        SongTeacher.init(input.value);
    });

    document.addEventListener("keydown", (e) => {
        if (!SongTeacher.chords.length) return;

        if (e.key === "ArrowRight") SongTeacher.next();
        if (e.key === "ArrowLeft") SongTeacher.prev();
        if (e.key === "ArrowDown") SongTeacher.repeat();
        if (e.key === "ArrowUp") SongTeacher.playSound();
    });
}
const teachBtn = document.getElementById("teachBtn");
if (!teachBtn) return;

const input = document.getElementById("chordInput");
const errorText = document.getElementById("errorText");
const toggle = document.getElementById("toggleStrings");

loadSettings(toggle);

teachBtn.addEventListener("click", () => {
    const rawInput = input.value;
    const chord = normalizeChord(rawInput);

    if (!chordData[chord]) {
        errorText.textContent = "Chord not found. Please try again.";
        speak("Chord not found. Please try again.");
        return;
    }

    errorText.textContent = "";

    const useLetters = toggle.checked;
    saveSettings(useLetters);

    const instructions = InstructionCreator(chordData[chord], useLetters);
    InstructionGiver.init(instructions, chordData[chord]);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") InstructionGiver.next();
    if (e.key === "ArrowLeft") InstructionGiver.prev();
    if (e.key === "ArrowDown") InstructionGiver.repeatTTS();
    if (e.key === "ArrowUp") InstructionGiver.repeatSound();
});
});