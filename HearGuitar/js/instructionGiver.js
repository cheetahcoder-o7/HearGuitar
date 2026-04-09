const InstructionGiver = {
    instructions: [],
    rawData: [],
    index: 0,

    init(instructions, data) {
        this.instructions = instructions;
        this.rawData = data;
        this.index = 0;
        this.show(true, true);
    },

    show(playTTS = true, playSound = true) {
        const text = this.instructions[this.index];
        document.getElementById("instructionText").textContent = text;

        if (playTTS) {
            speak(text, () => {
                if (playSound) this.playSound();
            });
        } else if (playSound) {
            this.playSound();
        }
    },

    playSound() {
        // Final instruction → full chord
        if (this.index === this.instructions.length - 1) {
            AudioEngine.playChord(this.rawData);
            return;
        }

        const i = this.index * 3;
        const finger = this.rawData[i];
        const fret = this.rawData[i + 1];
        const string = this.rawData[i + 2];

        // Skip muted or open
        if (fret <= 0) return;

        // Barre → play lowest string
        if (string === 7) {
            AudioEngine.playSingle(6, fret);
        } else {
            AudioEngine.playSingle(string, fret);
        }
    },

    next() {
        if (this.index < this.instructions.length - 1) {
            this.index++;
            this.show(true, true);
        }
    },

    prev() {
        if (this.index > 0) {
            this.index--;
            this.show(true, true);
        }
    },

    repeatTTS() {
        this.show(true, false);
    },

    repeatSound() {
        this.playSound();
    }
};