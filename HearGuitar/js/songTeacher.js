const SongTeacher = {
    chords: [],
    index: 0,

    init(input) {
        const rawChords = input.split(",");

        this.chords = rawChords
            .map(c => c.trim())
            .filter(c => c.length > 0);

        // Validate (strict mode)
        for (let chord of this.chords) {
            if (!chordData[chord]) {
                const msg = `Chord ${chord} not found.`;
                document.getElementById("errorText").textContent = msg;
                speak(msg);
                this.chords = [];
                return;
            }
        }

        document.getElementById("errorText").textContent = "";

        this.index = 0;
        this.speakCurrent();
    },

    speakCurrent() {
        const chord = this.chords[this.index];
        const spoken = this.formatChord(chord);

        document.getElementById("instructionText").textContent = chord;

        speak(spoken);
    },

formatChord(chord) {
    const letterMap = {
        A: "hey",
        B: "B",
        C: "C",
        D: "D",
        E: "E",
        F: "F",
        G: "G"
    };

    const root = chord[0].toUpperCase();
    const spokenRoot = letterMap[root] || root;

    if (chord.endsWith("m")) {
        return `${spokenRoot} minor`;
    }

    return spokenRoot;
},

    next() {
        if (this.index < this.chords.length - 1) {
            this.index++;
            this.speakCurrent();
        }
    },

    prev() {
        if (this.index > 0) {
            this.index--;
            this.speakCurrent();
        }
    },

    repeat() {
        this.speakCurrent();
    },

    playSound() {
        const chord = this.chords[this.index];
        AudioEngine.playChord(chordData[chord]);
    }
};