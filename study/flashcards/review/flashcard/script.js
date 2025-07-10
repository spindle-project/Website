var studySet;
var setData;

if (sessionStorage.getItem("ChoosenSet") == null || undefined) {
  window.location.replace("/review/flashcard/index.html");
} else {
  studySet = JSON.parse(sessionStorage.getItem("ChoosenSet"));
  setData = JSON.parse(localStorage.getItem(`${studySet.title} Metadata`));
  // Set data
  localStorage.setItem(`${studySet.title} Metadata`, JSON.stringify(setData));
}

// Log the result to the console

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

convertToFlashcard();
//Code for the flashcard
const speakCard = () => {
  // const synth = window.speechSynthesis;
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
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  };
  let parentElement = document.getElementById(parentElementId);
  if (isOverflown(parentElement)) {
    while (isOverflown(parentElement)) {
      parentElement.style.fontSize = `${parseInt(window.getComputedStyle(parentElement).fontSize) - 1}px`;
      
    }
  } else {
    let n = 0; // n is the safeguard, stopping the loop from running more than 50 times
    while (isOverflown(parentElement) == false && parseInt(window.getComputedStyle(parentElement).fontSize) < 100 && n < 50) {
      parentElement.style.fontSize = `${parseInt(window.getComputedStyle(parentElement).fontSize) + 1}px`;
      n++
    }
  }
}
// make sure text size is optimized
  maximizeTextSize("flashcardDiv");

function calculateCorrectAnswers(term) {
  return term.answer.split("|");
}
function populatePreviewPlane(setToPreview) {
  document.getElementById("generatedContent").classList.add("generated-content-with-preview");
    document.getElementById("generatedContent").classList.remove("generated-content-no-preview");

  let previewPlane = document.getElementById("previewPlane");
  previewPlane.classList.add("preview-active");
        previewPlane.innerHTML = "";
  
   previewPlane.innerHTML += ` <div id="setTitle"> <h2>${setToPreview.title}</h2> ${setToPreview.description} </div> `
   
   
   for (let i = 0; i < setToPreview.content.length; i++) {
      let card = setToPreview.content[i];
      previewPlane.innerHTML += `
      <div class="term-def-pair">
  <div class="number">
    ${i+1}
  </div>
  <div class="content">
  <div class="term">
   <b class="mobile-only-number">(${i+1})</b> ${card.question}
  </div>
  <div class="def">
    ${calculateCorrectAnswers(card)}
  </div>
  </div>
</div>
      `;
      
    }
 
  document.getElementById("studySet").addEventListener("click", function () {
      window.location.assign("/viewset/index.html");
  });
}
populatePreviewPlane(studySet);