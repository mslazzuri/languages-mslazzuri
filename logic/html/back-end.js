const quizQuestions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: 1 },
    { question: "What is the world's tallest building?", options: ["Eiffel Tower", "Shangai Tower", "Burj Khalifa", "Empire State"], answer: 2 },
    { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Osmium", "Oganesson"], answer: 0 },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"], answer: 0 },
    { question: "In which year did the Titanic sink?", options: ["1912", "1905", "1915", "1918"], answer: 0 },
    { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Gazelle", "Horse"], answer: 0 },
    { question: "Which country is home to the kangaroo?", options: ["Australia", "South Africa", "India", "Brazil"], answer: 0 },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], answer: 1 },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Granite"], answer: 2 },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Mercury", "Jupiter"], answer: 1 },
    { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: 2 },
    { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "Malta", "San Marino"], answer: 1 },
    { question: "Which year was the first man on the moon?", options: ["1959", "1965", "1969", "1972"], answer: 2 },
    { question: "What is the boiling point of water in Celsius?", options: ["90°C", "100°C", "110°C", "120°C"], answer: 1 },
    { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
    { question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Dynamic Nuclear Atom", "Deoxygenated Nitrogen Acid", "Data Nucleic Array"], answer: 0 },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Gd"], answer: 0 },
    { question: "What is the largest continent?", options: ["Africa", "Asia", "Europe", "North America"], answer: 1 }
];

let currentQuestion = 0;
let lives = 2; // Player starts with 2 lives

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const options = document.querySelectorAll(".option");
    const livesElement = document.getElementById("lives");
    const nextButton = document.getElementById("next");

    // Display lives
    livesElement.textContent = `Lives remaining: ${lives}`;

    // Display the current question and its options
    questionElement.textContent = quizQuestions[currentQuestion].question;
    options.forEach((button, index) => {
        button.textContent = quizQuestions[currentQuestion].options[index];
        button.onclick = () => checkAnswer(index);
    });

    // Hide the next button until the correct answer is selected
    nextButton.style.display = "none";
}

function checkAnswer(selectedIndex) {
    const feedback = document.getElementById("feedback");
    const livesElement = document.getElementById("lives");
    const nextButton = document.getElementById("next");

    if (selectedIndex === quizQuestions[currentQuestion].answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        // Show the Next button when the answer is correct
        nextButton.style.display = "block";

        // Check if it's the last question
        if (currentQuestion === quizQuestions.length - 1) {
            feedback.textContent = "Congratulations! You've won the quiz!";
            nextButton.style.display = "none"; // Hide the next button
            showResetButton(); // Show reset button at the end
        }
    } else {
        feedback.textContent = "Incorrect!";
        feedback.style.color = "red";

        // Decrease lives when the answer is wrong
        lives--;
        livesElement.textContent = `Lives remaining: ${lives}`;

        // Check if player lost all lives
        if (lives === 0) {
            alert("Game Over! You've lost all your lives.");
            resetGame();
        }
    }
}

function showResetButton() {
    const resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.textContent = "Reset Quiz";
    document.querySelector(".quiz-container").appendChild(resetButton);

    resetButton.onclick = () => {
        // Reset the quiz and lives
        currentQuestion = 0;
        lives = 2;
        displayQuestion();
        document.getElementById("feedback").textContent = "";
        resetButton.remove(); // Remove the reset button after resetting
    };
}

function resetGame() {
    currentQuestion = 0;
    lives = 2; // Reset lives
    displayQuestion();
    document.getElementById("feedback").textContent = "";
}

document.getElementById("next").onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
        document.getElementById("feedback").textContent = "";
    }
};

// Start the quiz
window.onload = function() {
    displayQuestion();  // This ensures that the question appears as soon as the page loads
};
