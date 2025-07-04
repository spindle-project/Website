var studySet;
if (sessionStorage.getItem("ChoosenSet") !== null || undefined) {
  studySet = JSON.parse(sessionStorage.getItem("ChoosenSet"));
  document.querySelector("#SetTitle").textContent = studySet.title;
}
document.getElementById("setDescription").textContent = studySet.description;
const convertToFlashcard = () => {
  let distilledArray = [];
  for (let i = 0; i < studySet.content.length; i++) {
    distilledArray.push([
      studySet.content[i].question,
      studySet.content[i].answer.split("|"),
    ]);
  }

  return distilledArray;
};

var studyMethod;
var studySetOptions = [];
const input = document.querySelector("#setSercher");
const suggestions = document.querySelector(".suggestions ul");

/*get array of all study sets*/

const selectStudyMethod = (choosenStudyMethod) => {
  // The user has selected all needed options
  /*Let's save the  choosen set*/
  sessionStorage.setItem("ChoosenSet", JSON.stringify(studySet));
  // and redirest the user
  switch (choosenStudyMethod) {
    case "Game":
      window.location.replace("/review/game/");
      break;
    case "Flashcard":
      window.location.replace("/review/flashcard/");
      break;
    case "Match":
      window.location.replace("/review/match/");
      break;
    case "Quiz":
      window.location.replace("/review/quiz/");
      break;
    // Share the set
    case "Print":
      window.location.replace("/print");
      break;
    case "Share":
      createPopup("info", "🔗 Copied Link!");
      navigator.clipboard.writeText(
        `https://ace-it.glitch.me/?${studySet.title.replace(/ /g, "%20")}`
      );
      break;
  }
};
const selectStudySet = (choosenStudySet) => {
  //studySet = choosenStudySet;
};

//Code for the flashcard
const speakCard = () => {
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      document.getElementById("flashcardTerm").textContent
    )
  );
};

// Assuming convertToFlashcard() returns an array of [question, answer] pairs
var QNAArray = convertToFlashcard();
// Get the flashcard UI elements
let flashcardDiv = document.getElementById("flashcardDiv");
let flashcardTerm = document.getElementById("flashcardTerm");
let flashcardPositionUI = document.getElementById("flashcardPositionUI");
// Initialize the question number and the current question and answer
let questionNumber = 0;
let questionAsked = QNAArray[questionNumber][0];
let questionAnswer = QNAArray[questionNumber][1];
// Update the UI with the current question and position
flashcardTerm.textContent = questionAsked;
maximizeTextSize("flashcardDiv");
flashcardPositionUI.textContent = `1 / ${QNAArray.length}`;
// Define a function to shuffle the QNAArray using the Fisher-Yates algorithm
const shuffleCards = () => {
  for (let i = QNAArray.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1));
    // Swap the elements at i and j
    [QNAArray[i], QNAArray[j]] = [QNAArray[j], QNAArray[i]];
  }
  // Reset the question number and get a new card
  questionNumber = -1;
  getNewCard("forward");
};
// Define a function to flip the flashcard and show the answer or question
const flipFlashcard = () => {
  // Remove the flip animation after 200 ms
  setTimeout(() => {
    flashcardDiv.classList.remove("flip-horizontal-bottom");
  }, 200);
  // Add the flip animation
  flashcardDiv.classList.add("flip-horizontal-bottom");
  // Toggle between the question and answer
  flashcardTerm.textContent =
    flashcardTerm.textContent == questionAnswer
      ? questionAsked
      : questionAnswer;
  maximizeTextSize("flashcardDiv");
};
// Define a function to choose a new question based on the direction
const chooseQuestion = (direction) => {
  // Increment or decrement the question number based on the direction
  // Wrap around if it reaches the end or start of the array
  maximizeTextSize("flashcardDiv");
  questionNumber =
    direction === "forward"
      ? (questionNumber + 1) % QNAArray.length
      : (questionNumber - 1 + QNAArray.length) % QNAArray.length;
  // Update the current question and answer
  questionAsked = QNAArray[questionNumber][0];
  questionAnswer = QNAArray[questionNumber][1];
  maximizeTextSize("flashcardDiv");
};
// Define a function to get a new card and update the UI
const getNewCard = (direction) => {
  // Choose a new question based on the direction
  chooseQuestion(direction);
  // Show the new question on the flashcard
  flashcardTerm.textContent = questionAsked;
  maximizeTextSize("flashcardDiv");
  // Update the position and progress UI elements
  flashcardPositionUI.textContent = `${questionNumber + 1} / ${
    QNAArray.length
  }`;
  maximizeTextSize("flashcardDiv");
};
document
  .getElementById("flashcardSpeakUIIcon")
  .addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    speakCard();

    //  click logic here ...
  });
document
  .getElementById("flashcardShuffleUIIcon")
  .addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    shuffleCards();
  });

function maximizeTextSize(parentElementId) {
  const isOverflown = (element) => {
    return (
      element.scrollHeight > element.clientHeight + 10 ||
      element.scrollWidth > element.clientWidth + 10
    );
  };
  let parentElement = document.getElementById(parentElementId);
  if (isOverflown(parentElement)) {
    while (isOverflown(parentElement)) {
      parentElement.style.fontSize = `${
        parseInt(window.getComputedStyle(parentElement).fontSize) - 2
      }px`;
    }
  } else {
    let n = 0; // n is the safeguard, stopping the loop from running more than 50 times
    while (
      isOverflown(parentElement) == false &&
      parseInt(window.getComputedStyle(parentElement).fontSize) < 100 &&
      n < 50
    ) {
      parentElement.style.fontSize = `${
        parseInt(window.getComputedStyle(parentElement).fontSize) + 1
      }px`;
      n++;
    }
  }
  parentElement.style.fontSize = `${
    parseInt(window.getComputedStyle(parentElement).fontSize) - 2
  }px`;
}
// make sure text size is optimized
maximizeTextSize("flashcardDiv");
function calculateCorrectAnswers(term) {
  return term.answer.split("|");
}
function populatePreviewPlane(setToPreview) {
  let previewPlane = document.getElementById("previewPlane");

  for (let i = 0; i < setToPreview.content.length; i++) {
    let card = setToPreview.content[i];
    previewPlane.innerHTML += `
      <div class="term-def-pair">
  <div class="number">
    ${i + 1}
  </div>
  <div class="content">
  <div class="term">
   <b class="mobile-only-number">(${i + 1})</b> ${card.question}
  </div>
  <div class="def">
    ${calculateCorrectAnswers(card)}
  </div>
  </div>
</div>
      `;
  }
}
populatePreviewPlane(studySet);
