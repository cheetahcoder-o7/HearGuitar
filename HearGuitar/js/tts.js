let currentUtteranceId = 0;

function speak(text, onEnd) {
    currentUtteranceId++;

    const utteranceId = currentUtteranceId;
    const utterance = new SpeechSynthesisUtterance(text);

    speechSynthesis.cancel();

    utterance.onend = () => {
        // Only fire if this is the latest utterance
        if (utteranceId === currentUtteranceId) {
            if (onEnd) onEnd();
        }
    };

    speechSynthesis.speak(utterance);
}