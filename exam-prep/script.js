const questionsUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNx_Vw7mdlWz8V1-OtuamwzE-pxq3z6a5M-HiBReTuLZcOI4xlBQYPsPRtSiQ7Y4q4d2Ajcjre_8mx/pub?gid=721477959&single=true&output=csv";
const tipsUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNx_Vw7mdlWz8V1-OtuamwzE-pxq3z6a5M-HiBReTuLZcOI4xlBQYPsPRtSiQ7Y4q4d2Ajcjre_8mx/pub?gid=0&single=true&output=csv";
const proxyUrl = ''; // Keep this empty unless you have a proxy server

// DOM Elements
const tipContainer = document.getElementById("tip-container");
const newTipButton = document.getElementById("new-tip-button");
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const feedbackContainer = document.getElementById("feedback-container");
const newQuestionButton = document.getElementById("new-question-button"); // Changed from next-question-button to new-question-button
const userAnswerInput = document.getElementById("user-answer"); // Assuming this is for a potential text input answer, not used in the multiple choice logic below

let allQuestions = [];
let currentQuestionIndex = -1;
let currentQuestion = null;

/**
 * Fetches tips from the provided URL.
 * @param {string} url - The URL to fetch tips from.
 * @returns {Promise<string[]>} A promise that resolves to an array of tip strings.
 */
async function fetchTips(url) {
  try {
    const fullUrl = proxyUrl + url;
    const response = await fetch(fullUrl);
    const data = await response.text();
    let tips = data.split("\n").slice(1);
    tips = tips.map((tip) => tip.trim()).filter((tip) => tip !== "");
    return tips;
  } catch (error) {
    console.error("Error fetching tips:", error);
    return [];
  }
}

/**
 * Fetches questions from the provided URL.
 * @param {string} url - The URL to fetch questions from.
 * @returns {Promise<Array<{question: string, answer: string}>>} A promise that resolves to an array of question objects.
 */
async function fetchQuestions(url) {
  try {
    const fullUrl = proxyUrl + url;
    const response = await fetch(fullUrl);
    const data = await response.text();
    const lines = data
      .split("\n")
      .slice(1)
      .filter((line) => line.trim() !== "");
    const questions = lines.map((line) => {
      const parts = line.split(",");
      // Ensure we handle cases where a line might have fewer than 2 parts
      const question = parts[0] ? parts[0].trim() : "";
      const answer = parts[1] ? parts[1].trim() : "";
      return { question, answer };
    }).filter(q => q.question && q.answer); // Filter out any malformed questions
    console.log("Fetched Questions:", questions);
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

/**
 * Displays a random tip in the tip container.
 * @param {string} url - The URL to fetch tips from.
 */
async function displayTip(url) {
  const tips = await fetchTips(url);
  if (tips.length > 0) {
    const randomIndex = Math.floor(Math.random() * tips.length);
    tipContainer.textContent = tips[randomIndex];
  } else {
    tipContainer.textContent = "No tips available.";
  }
}

/**
 * Displays a random question and its choices.
 */
function displayRandomQuestion() {
  if (allQuestions.length === 0) {
    questionContainer.textContent = "No questions available.";
    choicesContainer.innerHTML = "";
    feedbackContainer.textContent = "";
    newQuestionButton.style.display = 'none'; // Ensure button is hidden if no questions
    return;
  }

  // Get a random question that isn't the current one (if possible)
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * allQuestions.length);
  } while (newIndex === currentQuestionIndex && allQuestions.length > 1);

  currentQuestionIndex = newIndex;
  currentQuestion = allQuestions[currentQuestionIndex];

  questionContainer.textContent = currentQuestion.question;
  choicesContainer.innerHTML = "";
  feedbackContainer.textContent = "";
  feedbackContainer.className = ""; // Clear previous feedback classes
  newQuestionButton.style.display = 'none'; // Hide new question button initially

  // Generate incorrect choices
  const incorrectChoices = [];
  const allAnswers = allQuestions.map(q => q.answer);
  const uniqueAnswers = [...new Set(allAnswers)]; // Get unique answers to avoid duplicate incorrect choices

  // Filter out the correct answer from unique answers
  const potentialIncorrectChoices = uniqueAnswers.filter(answer => answer !== currentQuestion.answer);

  // Randomly select up to 3 unique incorrect choices
  while (incorrectChoices.length < 3 && potentialIncorrectChoices.length > 0) {
    const randomIndex = Math.floor(Math.random() * potentialIncorrectChoices.length);
    const chosenIncorrect = potentialIncorrectChoices.splice(randomIndex, 1)[0]; // Remove chosen to avoid duplicates
    incorrectChoices.push(chosenIncorrect);
  }

  // Combine correct and incorrect choices and shuffle them
  const choices = [currentQuestion.answer, ...incorrectChoices].sort(
    () => Math.random() - 0.5
  );
  const letters = ["A", "B", "C", "D"];

  choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = letters[index] + ". " + choice;
    choiceButton.classList.add("choice-button"); // Add a class for styling
    choiceButton.addEventListener("click", () => handleAnswer(choiceButton, choice, currentQuestion.answer));
    choicesContainer.appendChild(choiceButton);
  });
}

/**
 * Handles the user's answer selection.
 * @param {HTMLButtonElement} selectedButton - The button element that was clicked.
 * @param {string} selectedAnswer - The text of the selected answer.
 * @param {string} correctAnswer - The correct answer for the current question.
 */
function handleAnswer(selectedButton, selectedAnswer, correctAnswer) {
  // Disable all choice buttons to prevent multiple selections
  const choiceButtons = choicesContainer.querySelectorAll(".choice-button");
  choiceButtons.forEach((button) => {
    button.disabled = true;
  });

  selectedButton.classList.add("selected"); // Indicate the user's selection

  if (selectedAnswer === correctAnswer) {
    feedbackContainer.textContent = "Correct! Great job!";
    feedbackContainer.className = "feedback correct-feedback"; // Add class for styling
    selectedButton.classList.add("correct"); // Highlight the correct answer
    newQuestionButton.style.display = 'block'; // Show button to get new question
  } else {
    feedbackContainer.textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
    feedbackContainer.className = "feedback incorrect-feedback"; // Add class for styling
    selectedButton.classList.add("incorrect"); // Highlight the incorrect answer chosen

    // Find and highlight the correct answer
    choiceButtons.forEach(button => {
        if (button.textContent.includes(correctAnswer)) { // Check if the button text contains the correct answer
            button.classList.add("correct-answer-highlight");
        }
    });

    // Re-enable buttons and clear selected/incorrect classes for "try again" functionality
    // This allows the user to re-select if they wish, though the correct answer is highlighted.
    // If you want them to be able to actively "try again" by clicking an unselected button,
    // you'd need to re-enable *all* buttons here. For now, we just highlight the correct one.
    newQuestionButton.style.display = 'block'; // Still allow moving to next question even after incorrect attempt
  }
}

// Event Listeners
newTipButton.addEventListener("click", () => displayTip(tipsUrl));
newQuestionButton.addEventListener("click", displayRandomQuestion); // New name

// Initial setup: Load a tip and a question when the page loads
async function initializeQuiz() {
  await displayTip(tipsUrl); // Display an initial tip
  allQuestions = await fetchQuestions(questionsUrl); // Fetch all questions once
  displayRandomQuestion(); // Display the first question
}

initializeQuiz();