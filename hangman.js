
let wrongGuessedLetters = []; // Track wrong letters
let wrongGuesses = 0;
let selectedMovie = "";
let guessedLetters = [];
let horrorMovies = [];


window.onload = function () {
    const button = document.getElementById("alien");
    if (button) {
        button.addEventListener("click", toggleAlienMode);
    }

    if (localStorage.getItem("alienMode") === "true") {
        applyAlienMode();
    }

    const guessButton = document.querySelector(".guess_button");
    const guessInput = document.querySelector(".guess_input");
    const canvas = document.getElementById("hangman");

    if (guessButton && guessInput) {
        guessButton.addEventListener("click", handleGuess);
        guessInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                handleGuess();
            }
        });
    }

    fetchMovies().then(() => {
        resetHangman(canvas);
    });
}



async function fetchMovies() {
    try {
        const response = await fetch("movies.json"); // Await the fetch response
        if (!response.ok) {
            throw new Error("Failed to fetch movies.json");
        }

        const data = await response.json(); // Parse the JSON
        if (data.horrorMovies && Array.isArray(data.horrorMovies)) {
            horrorMovies = data.horrorMovies; // Assign the movies correctly
        } else {
            throw new Error("Invalid format in movies.json. Expected 'horrorMovies' to be an array.");
        }

        console.log("Movies loaded successfully:", horrorMovies); // Debugging log
    } catch (error) {
        console.error("Error loading movies:", error);
        horrorMovies = ["DEFAULT MOVIE"]; // Fallback in case of error
    }
}

function selectRandomMovie() {
    const randomIndex = Math.floor(Math.random() * horrorMovies.length);
    selectedMovie = horrorMovies[randomIndex].toUpperCase();
    guessedLetters = Array.from(selectedMovie, char => (char === " " ? " " : "_"));
}

function handleGuess() {
    const guessInput = document.querySelector(".guess_input");
    if (!guessInput) return;

    const guess = guessInput.value.toUpperCase(); // Convert to uppercase
    guessInput.value = ""; // Clear the input

    if (!guess || guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
        alert("Please enter a valid single letter!");
        return;
    }

    if (!isCorrectGuess(guess) && !wrongGuessedLetters.includes(guess)) {
        if (!wrongGuessedLetters.includes(guess)) {
            wrongGuessedLetters.push(guess); // Add to wrong guesses
        }
        wrongGuesses++;
        drawNextHangmanPart(wrongGuesses);
        displayWrongGuesses();
    }

    displayWord();
    
    if (wrongGuesses >= 7) {
        drawHangman_blood(document.getElementById("hangman"));
        setTimeout(() => {
            alert("Game Over! The movie was: " + selectedMovie);
            resetHangman(document.getElementById("hangman")); // Reset the game after the alert
        }, 750);
    } else if (guessedLetters.join("") === selectedMovie) {
        alert("Congratulations! You've guessed the movie: " + selectedMovie);
        resetHangman(document.getElementById("hangman"));
    }
}

function isCorrectGuess(guess) {
    let correct = false;
    for (let i = 0; i < selectedMovie.length; i++) {
        if (selectedMovie[i] === guess) {
            guessedLetters[i] = guess;
            correct = true;
        }
    }
    return correct;
}

function drawNextHangmanPart(wrongGuesses) {
    const canvas = document.getElementById("hangman");
    if (!canvas) return;

    switch (wrongGuesses) {
        case 1:
            drawHangman_head(canvas);
            break;
        case 2:
            drawHangman_torso(canvas);
            break;
        case 3:
            drawHangman_leftArm(canvas);
            break;
        case 4:
            drawHangman_rightArm(canvas);
            break;
        case 5:
            drawHangman_leftLeg(canvas);
            break;
        case 6:
            drawHangman_rightLeg(canvas);
            break;
    }
}

function drawHangman_bar(canvas) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(90, 10);
        ctx.lineTo(90, 20);
        ctx.lineTo(90, 10);
        ctx.lineTo(40, 10);
        ctx.lineTo(10, 40);
        ctx.lineTo(10, 10);
        ctx.lineTo(10, 100);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 3.5; // Increased line width for clearer lines
        ctx.stroke();
        ctx.closePath();
    }
}

function drawHangman_head(canvas) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(90, 30, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawHangman_torso(canvas) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(90, 40);
        ctx.lineTo(90, 70);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawHangman_leftArm(canvas) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(90, 50);
        ctx.lineTo(80, 60);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawHangman_rightArm(canvas) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(90, 50);
        ctx.lineTo(100, 60);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawHangman_leftLeg(canvas) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(90, 70);
        ctx.lineTo(80, 80);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawHangman_rightLeg(canvas) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(90, 70);
        ctx.lineTo(100, 80);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawHangman_blood(canvas) {
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;

        // Draw random splatter lines
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height;
            const endX = startX + Math.random() * 20 - 10;
            const endY = startY + Math.random() * 20 - 10;
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.closePath();
        }

        // Add dripping blood effect
        ctx.fillStyle = "red";
        for (let i = 0; i < 10; i++) {
            const dripX = 80 + Math.random() * 40 - 20;
            const dripY = 50 + Math.random() * 100;
            ctx.beginPath();
            ctx.arc(dripX, dripY, 5 + Math.random() * 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }
}

function resetHangman(canvas) {
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHangman_bar(canvas);
    }
    wrongGuesses = 0;
    wrongGuessedLetters = [];
    selectRandomMovie();
    displayWord();
    displayWrongGuesses();
}

function displayWord() {
    const wordDisplay = document.getElementById("wordDisplay");
    if (wordDisplay) {
        wordDisplay.textContent = guessedLetters.join(" ");
    }
}

function displayWrongGuesses() {
    const wrongGuessesDisplay = document.getElementById("wrongGuessesDisplay");
    if (wrongGuessesDisplay) {
        // Show wrong guesses with letters
        wrongGuessesDisplay.textContent = 
            `Wrong guesses (${wrongGuesses}): ${wrongGuessedLetters.join(", ")}`;
    }
}

function applyAlienMode() {
    document.body.style.background = "linear-gradient(to bottom, grey, chartreuse)";
    const h1 = document.querySelector("h1");
    if (h1) h1.style.backgroundColor = "green";
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach(heading => {
        heading.style.backgroundColor = "darkgreen";
    });
    document.querySelectorAll("#splatter, #logo").forEach(element => {
        element.style.filter = "invert(1)";
    });
}

function revertAlienMode() {
    document.body.style.background = "";
    const h1 = document.querySelector("h1");
    if (h1) h1.style.backgroundColor = "";
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach(heading => {
        heading.style.backgroundColor = "";
    });
    document.querySelectorAll("#splatter, #logo").forEach(element => {
        element.style.filter = "";
    });
}

function toggleAlienMode() {
    if (localStorage.getItem("alienMode") === "true") {
        revertAlienMode();
        localStorage.setItem("alienMode", "false");
    } else {
        applyAlienMode();
        localStorage.setItem("alienMode", "true");
    }
}
