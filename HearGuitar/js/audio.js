const AudioEngine = (() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Standard tuning (frequency in Hz)
    const stringFrequencies = {
        6: 82.41,   // E2
        5: 110.00,  // A2
        4: 146.83,  // D3
        3: 196.00,  // G3
        2: 246.94,  // B3
        1: 329.63   // E4
    };

    function getFrequency(string, fret) {
        const baseFreq = stringFrequencies[string];
        return baseFreq * Math.pow(2, fret / 12);
    }

    function playFrequency(freq, duration = 1) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.value = freq;

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();

        gain.gain.setValueAtTime(0.9, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.stop(audioCtx.currentTime + duration);
    }

    function playSingle(string, fret) {
        const freq = getFrequency(string, fret);
        playFrequency(freq);
    }

function playChord(data) {
    let muted = new Set();
    let fretted = {};
    let barFret = null;

    // Parse data
    for (let i = 0; i < data.length; i += 3) {
        const fret = data[i + 1];
        const string = data[i + 2];

        // Muted string
        if (fret === -1) {
            muted.add(string);
        }

        // Barre
        else if (string === 7) {
            barFret = fret;
        }

        // Normal fretted note
        else if (fret > 0) {
            fretted[string] = fret;
        }
    }

    // Play from string 6 → 1
    for (let s = 6; s >= 1; s--) {
        if (muted.has(s)) continue;

        let fret;

        if (fretted[s] !== undefined) {
            fret = fretted[s];
        } else if (barFret !== null) {
            fret = barFret;
        } else {
            fret = 0;
        }

        const freq = getFrequency(s, fret);

        setTimeout(() => {
            playFrequency(freq);
        }, (6 - s) * 80);
    }
}

    return {
        playSingle,
        playChord
    };
})();