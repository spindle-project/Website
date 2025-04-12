const questionsUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNx_Vw7mdlWz8V1-OtuamwzE-pxq3z6a5M-HiBReTuLZcOI4xlBQYPsPRtSiQ7Y4q4d2Ajcjre_8mx/pub?gid=721477959&single=true&output=csv";
const tipsUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNx_Vw7mdlWz8V1-OtuamwzE-pxq3z6a5M-HiBReTuLZcOI4xlBQYPsPRtSiQ7Y4q4d2Ajcjre_8mx/pub?gid=0&single=true&output=csv";
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  async function fetchTips(tipsUrl) {
  try {
    const fullUrl = proxyUrl + tipsUrl;
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

async function fetchQuestions(questionsUrl) {
  try {
    const fullUrl = proxyUrl + questionsUrl;
    const response = await fetch(fullUrl);
    const data = await response.text();
    const lines = data
      .split("\n")
      .slice(1)
      .filter((line) => line.trim() !== "");
    const questions = lines.map((line) => {
      const parts = line.split(",");
      const question = parts[0].trim();
      const answer = parts[1].trim();
      return { question, answer };
    });
    console.log("Fetched Questions:", questions);
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

const tipContainer = document.getElementById("tip-container");
const newTipButton = document.getElementById("new-tip-button");
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const feedbackContainer = document.getElementById("feedback-container");
const newQuestionButton = document.getElementById("new-question-button");
const userAnswerInput = document.getElementById("user-answer");

let answerSelected = false;
let newQuestionClicks = 0;
let allQuestions = [];

async function displayTip(tipsUrl) {
  const tips = await fetchTips(tipsUrl);
  if (tips.length > 0) {
    const randomIndex = Math.floor(Math.random() * tips.length);
    tipContainer.textContent = tips[randomIndex];
  } else {
    tipContainer.textContent = "No tips available.";
  }
}

async function displayQuestion(questionsUrl) {
  allQuestions = await fetchQuestions(questionsUrl);
  if (allQuestions.length >= 4) {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    const currentQuestion = allQuestions[randomIndex];

    questionContainer.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";
    feedbackContainer.textContent = "";
    feedbackContainer.className = "";
    answerSelected = false;
    userAnswerInput.value = "";

    const incorrectChoices = [];
    while (incorrectChoices.length < 3) {
      const randomIncorrectIndex = Math.floor(
        Math.random() * allQuestions.length
      );
      if (randomIncorrectIndex !== randomIndex) {
        incorrectChoices.push(allQuestions[randomIncorrectIndex].answer);
      }
    }

    const choices = [currentQuestion.answer, ...incorrectChoices].sort(
      () => Math.random() - 0.5
    );
    const letters = ["A", "B", "C", "D"];

    choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = letters[index] + ". " + choice;
      choiceButton.addEventListener("click", () => {
        if (!answerSelected) {
          answerSelected = true;
          choiceButton.classList.add("selected");
          if (choice === currentQuestion.answer) {
            feedbackContainer.textContent = "Correct! Great job!";
            choiceButton.classList.add("correct");
          } else {
            feedbackContainer.textContent =
              "Incorrect. The correct answer is: " + currentQuestion.answer;
            choiceButton.classList.add("incorrect");
          }
          const choiceButtons = choicesContainer.querySelectorAll("button");
          choiceButtons.forEach((button) => {
            button.disabled = true;
          });
        }
      });
      choicesContainer.appendChild(choiceButton);
    });
  } else {
    questionContainer.textContent = "Not enough questions available.";
  }
}

newTipButton.addEventListener("click", displayTip);

newQuestionButton.addEventListener("click", () => {
  newQuestionClicks++;
  if (newQuestionClicks >= 1) {
    newQuestionClicks = 0;
    displayQuestion(questionsUrl);
  } else {
    if (!answerSelected) {
      feedbackContainer.textContent = "Please select an answer first.";
    }
  }
});

displayTip(tipsUrl);
displayQuestion(questionsUrl);
