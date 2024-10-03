// Back-end file for the logics of the Interactive Quiz.
// Created by Matheus Lazzuri.

const quizQuestions =
[
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: 1 },
    { question: "What is the world's tallest building?", options: ["Eiffel Tower", "Shangai Tower", "Burj Khalifa", "Empire State"], answer: 2},
    { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Osmium", "Oganesson"], answer: 0 },
    { question: "Who wrote 'Hamlet'?", options: ["J.K. Rowling", "F. Scott Fitzgerald", "William Shakespeare", "George Orwell"], answer: 2 },
    { question: "What is the square root of 64?", options: ["6", "8", "10", "12"], answer: 1 },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
    { question: "Which country is home to the kangaroo?", options: ["Brazil", "Australia", "South Africa", "India"], answer: 1 },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Granite"], answer: 2 },
    { question: "What year did World War II end?", options: ["1940", "1945", "1950", "1939"], answer: 1 },
    { question: "Which planet is closest to the Sun?", options: ["Mars", "Venus", "Earth", "Mercury"], answer: 3 },
    { question: "Which famous scientist developed the theory of relativity?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Marie Curie"], answer: 2 },
    { question: "In which city is the Statue of Liberty located?", options: ["Los Angeles", "New York", "San Francisco", "Chicago"], answer: 1 }

];

let currentQuestion = 0;
let lives = 2; // Player starts with 2 lives

function displayQuestion()
{
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
        button.disabled = false;
        button.onclick = () => checkAnswer(index);
    });

    // Hide the next button until the correct answer is selected
    nextButton.style.display = "none";
}

function checkAnswer(selectedIndex)
{
    const feedback = document.getElementById("feedback");
    const livesElement = document.getElementById("lives");
    const nextButton = document.getElementById("next");
    const options = document.querySelectorAll(".option");

    // CORRECT ANSWER
    if (selectedIndex === quizQuestions[currentQuestion].answer)
    {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        // Disable all buttons after a correct answer
        options.forEach(button => button.disabled = true);

        // Show the Next button when the answer is correct
        nextButton.style.display = "block";

        // Check if it's the last question
        if (currentQuestion === quizQuestions.length - 1)
        {
            feedback.textContent = "Congratulations! You've won the quiz!";
            nextButton.style.display = "none"; // Hide the next button
            showResetButton(); // Show reset button at the end
        }
    }
    else // WRONG ANSWER
    {
        feedback.textContent = "Incorrect!";
        feedback.style.color = "red";

        // Decrease lives when the answer is wrong
        lives--;
        livesElement.textContent = `Lives remaining: ${lives}`;

        // Check if player lost all lives
        if (lives === 0)
        {
            alert("Game Over! You've lost all your lives.");
            resetGame();
        }
    }
}

function showResetButton()
{
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

function resetGame()
{
    currentQuestion = 0;
    lives = 2; // Reset lives
    displayQuestion();
    document.getElementById("feedback").textContent = "";
}

document.getElementById("next").onclick = () =>
{
    currentQuestion++;
    if (currentQuestion < quizQuestions.length)
    {
        displayQuestion();
        document.getElementById("feedback").textContent = "";
    }
};

// Start the quiz
window.onload = function()
{
    displayQuestion();  // This ensures that the question appears as soon as the page loads
};
