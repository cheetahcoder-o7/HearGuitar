function InstructionCreator(data, useLetters) {
    const fingerNames = ["thumb", "index", "middle", "ring", "pinky"];
    const stringLetters = ["high E", "B", "G", "D", "A", "low E"];

    let instructions = [];
    let mutedStrings = [];

    for (let i = 0; i < data.length; i += 3) {
        const fingerIndex = data[i];
        const fret = data[i + 1];
        const string = data[i + 2];

        // Handle muted strings
        if (fret === -1) {
            mutedStrings.push(string);
            continue;
        }

        // Ignore open strings
        if (fret === 0) continue;

        const finger = fingerNames[fingerIndex - 1];
        const fretWord = numberToOrdinalWord(fret);

        if (string === 7) {
            instructions.push(`Use ${finger} finger to bar the ${fretWord} fret.`);
        } else {
            let stringText;

            if (useLetters) {
                stringText = `${stringLetters[string - 1]} string`;
            } else {
                const stringWord = numberToOrdinalWord(string);
                stringText = `${stringWord} string`;
            }

            instructions.push(
                `Place ${finger} finger on the ${stringText} at the ${fretWord} fret.`
            );
        }
    }

    // Final strum instruction
    instructions.push(generateStrumInstruction(mutedStrings, useLetters));

    return instructions;
}

function generateStrumInstruction(mutedStrings, useLetters) {
    const stringLetters = ["high E", "B", "G", "D", "A", "low E"];

    if (mutedStrings.length === 0) {
        return "Strum!";
    }

    const formatted = mutedStrings.map((string) => {
        if (useLetters) {
            return `${stringLetters[string - 1]} string`;
        } else {
            return `${numberToOrdinalWord(string)} string`;
        }
    });

    // Handle grammar (and / commas)
    let listText = "";

    if (formatted.length === 1) {
        listText = formatted[0];
    } else if (formatted.length === 2) {
        listText = `${formatted[0]} and ${formatted[1]}`;
    } else {
        listText =
            formatted.slice(0, -1).join(", ") +
            ", and " +
            formatted[formatted.length - 1];
    }

    return `Strum!, but mute the ${listText}${formatted.length > 1 ? "s" : ""}`;
}

function numberToOrdinalWord(n) {
    const ordinals = [
        "zeroth","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth",
        "eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eighteenth","nineteenth","twentieth",
        "twenty-first","twenty-second","twenty-third","twenty-fourth"
    ];

    return ordinals[n] || `${n}`;
}