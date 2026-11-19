
/* ===================================
   SWETHA BIRTHDAY WEBSITE
   Complete JavaScript
=================================== */

// CHANGE THIS TO YOUR SECRET 4-DIGIT PIN
const SECRET_PIN = "0307";

// Birthday: December 3, 2026
// JavaScript months start from 0, so December = 11.
const BIRTHDAY_DATE = new Date(2026, 11, 3, 0, 0, 0);

let enteredPin = "";
const MAX_PIN_LENGTH = 4;
let wrongAttempts = 0;


// ===================================
// 1. SECRET PIN SYSTEM
// ===================================

function addDigit(digit) {
    if (enteredPin.length >= MAX_PIN_LENGTH) return;

    enteredPin += digit;
    updatePinDots();

    document.getElementById("pinError").style.display = "none";
}

function deleteDigit() {
    enteredPin = enteredPin.slice(0, -1);
    updatePinDots();
}

function clearPin() {
    enteredPin = "";
    updatePinDots();
    document.getElementById("pinError").style.display = "none";
}

function updatePinDots() {
    const dots = document.querySelectorAll("#pinDots span");

    dots.forEach((dot, index) => {
        dot.classList.toggle("filled", index < enteredPin.length);
    });
}

function unlockWebsite() {
    if (enteredPin === SECRET_PIN) {
        showScreen("welcomeScreen");
        startCountdown();
        createFloatingHearts();

        // Attempt to start music after the user's interaction.
        playMusic();
    } else {
        const error = document.getElementById("pinError");
        const hint = document.getElementById("pinError");

        wrongAttempts++;

        error.style.display = "block";

        // Reveal hint after the first wrong attempt
        if (wrongAttempts === 1) {
            document.getElementById("pinHint").style.display = "block";
        }

        enteredPin = "";
        updatePinDots();
    }
}

// Keyboard support for PIN
document.addEventListener("keydown", function(event) {
    const lockScreen = document.getElementById("lockScreen");

    if (!lockScreen.classList.contains("active")) return;

    if (/^[0-9]$/.test(event.key)) {
        addDigit(event.key);
    } else if (event.key === "Backspace") {
        deleteDigit();
    } else if (event.key === "Escape") {
        clearPin();
    } else if (event.key === "Enter") {
        unlockWebsite();
    }
});


// ===================================
// 2. PAGE / CHAPTER NAVIGATION
// ===================================

function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===================================
// 3. BIRTHDAY COUNTDOWN
// ===================================

function startCountdown() {
    updateCountdown();

    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }

    window.countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const difference = BIRTHDAY_DATE.getTime() - now.getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!daysElement) return;

    if (difference <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        document.querySelector(".countdown-label").textContent =
            "TODAY IS YOUR SPECIAL DAY! HAPPY BIRTHDAY ❤️";

        clearInterval(window.countdownInterval);

        // Auto-open the next page (final birthday surprise) when countdown hits Dec 3, 12:00am
        showScreen("birthdayScreen");

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}


// ===================================
// 4. BACKGROUND MUSIC
// ===================================

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

async function playMusic() {
    try {
        await music.play();
        musicButton.textContent = "♫";
        musicButton.title = "Pause music";
    } catch (error) {
        // The browser may require another direct user interaction.
        musicButton.textContent = "♫";
    }
}

function toggleMusic() {
    if (music.paused) {
        playMusic();
    } else {
        music.pause();
        musicButton.textContent = "♪";
        musicButton.title = "Play music";
    }
}


// ===================================
// 5. FLOATING HEART ANIMATION
// ===================================

function createFloatingHearts() {
    const container = document.getElementById("floatingHearts");

    if (window.heartInterval) return;

    window.heartInterval = setInterval(() => {
        const heart = document.createElement("span");

        heart.className = "heart";
        heart.textContent = ["♡", "♥", "✧", "❤"][
            Math.floor(Math.random() * 4)
        ];

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (14 + Math.random() * 18) + "px";
        heart.style.animationDuration = (5 + Math.random() * 4) + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 9500);

    }, 800);
}


// ===================================
// 6. FINAL BIRTHDAY SURPRISE
// ===================================

function celebrate() {
    const message = document.getElementById("surpriseMessage");

    message.classList.add("show");

    const button = document.querySelector(".celebration-button");
    button.textContent = "HAPPY BIRTHDAY, MY AZHAGII! ❤️";

    launchCelebration();
}

function launchCelebration() {
    const container = document.getElementById("floatingHearts");

    const celebrationSymbols = [
        "❤️", "💕", "✨", "🎉", "🌸", "🦚", "💖", "🎂"
    ];

    for (let i = 0; i < 45; i++) {
        const item = document.createElement("span");

        item.className = "heart";
        item.textContent =
            celebrationSymbols[
                Math.floor(Math.random() * celebrationSymbols.length)
            ];

        item.style.left = Math.random() * 100 + "%";
        item.style.fontSize = (18 + Math.random() * 20) + "px";
        item.style.animationDuration = (3 + Math.random() * 4) + "s";
        item.style.animationDelay = (Math.random() * 1.5) + "s";

        container.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, 8500);
    }
}
