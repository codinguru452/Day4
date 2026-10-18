// Select the HTML elements
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const DRAFT_KEY = "quicknotes-draft";
const THEME_KEY = "quicknotes-theme";

// Update the character and word counters
function updateCounts() {
    const text = noteText.value;
    const characters = text.length;

    // Count words, ignoring extra spaces
    const trimmedText = text.trim();
    const words = trimmedText === ""
        ? 0
        : trimmedText.split(/\s+/).length;

    // Update the counter text
    charCount.textContent = `${characters} / 200 characters`;
    wordCount.textContent = `${words} words`;

    // Remove old warning classes
    charCount.classList.remove("warning", "over");

    // Show a warning after 180 characters
    if (characters > 180) {
        charCount.classList.add("warning");
    }

    // Show a red warning after 200 characters
    if (characters > 200) {
        charCount.classList.add("over");
    }
}

// Save the note as a draft
function saveDraft() {
    localStorage.setItem(DRAFT_KEY, noteText.value);
}

// Clear the note and remove the saved draft
function clearNote() {
    noteText.value = "";
    localStorage.removeItem(DRAFT_KEY);
    updateCounts();
}

// Apply the selected theme
function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);

    themeToggle.textContent = isDark
        ? "Light mode"
        : "Dark mode";
}

// Restore the saved draft when the page loads
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
    noteText.value = savedDraft;
}

// Restore the saved theme
const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark");

// Update counters using the restored draft
updateCounts();

// Update counters and save the draft whenever the user types
noteText.addEventListener("input", function () {
    updateCounts();
    saveDraft();
});

// Clear the note when the Clear button is clicked
clearBtn.addEventListener("click", function () {
    clearNote();
});

// Clear the note when Escape is pressed inside the textarea
noteText.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        clearNote();
    }
});

// Toggle and save the selected theme
themeToggle.addEventListener("click", function () {
    const isDark = !document.body.classList.contains("dark");

    applyTheme(isDark);

    localStorage.setItem(
        THEME_KEY,
        isDark ? "dark" : "light"
    );
});