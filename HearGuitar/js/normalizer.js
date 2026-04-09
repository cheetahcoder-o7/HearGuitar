function normalizeChord(input) {
    if (!input) return "";

    let str = input.trim();

    // Match root + accidental + suffix
    const match = str.match(/^([a-gA-G])([#b]?)(.*)$/);
    if (!match) return str;

    let [, root, accidental, suffix] = match;

    root = root.toUpperCase();

    // Normalize flats to sharps
    if (accidental === "b") {
        root = flatToSharp(root);
        accidental = "#";
    }

    return root + accidental + suffix;
}

function flatToSharp(note) {
    const map = {
        A: "G#",
        B: "A#",
        C: "B",
        D: "C#",
        E: "D#",
        F: "E",
        G: "F#"
    };

    return map[note] || note;
}