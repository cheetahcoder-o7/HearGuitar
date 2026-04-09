function readSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    let text = "";

    // Collect readable text (ignore buttons)
    const elements = section.querySelectorAll("h2, h3, p, li");

    elements.forEach(el => {
        text += el.textContent + ". ";
    });

    speak(text);
}