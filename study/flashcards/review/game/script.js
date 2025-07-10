/*var setObject;
var setData;
var set;
if (sessionStorage.getItem("ChoosenSet") == null || undefined) {
  window.location.replace("/Apps/Reviewly/Home/index.html");
} else {
  setObject = JSON.parse(sessionStorage.getItem("ChoosenSet"));
  set = setObject.content;
  setData = JSON.parse(localStorage.getItem(`${setObject.title} Metadata`));
}
setData.data.timesPlayed++;
setData.data.lastStudied = getDate("Mm* *Dn_l");
localStorage.setItem(`${setObject.title} Metadata`, JSON.stringify(setData));*/
var studySet = JSON.parse(sessionStorage.getItem("ChoosenSet"));
studySet = studySet.content;
var set = studySet;
var totalTime = 0;
var timeRemaining = totalTime;
var remainingTimePercent = 100;
var timeInbeteewnQuestions = 2500;
var answerEle = [
  document.getElementById("option1"),
  document.getElementById("option2"),
  document.getElementById("option3"),
  document.getElementById("option4"),
];
var choicePicked;
var questionNumber,
  questionAnswer,
  questionAsked,
  streak = 0,
  answerRatio = { wrong: 0, right: 0, streak: 0 };
var sterilizedSet = [];
var answerCorrectnessArray = [];
var timerEnabled = true;
var currentlyTicking = false;
const sterilizeSet = () => {
  var distilledArray = [];
  for (let i = 0; i < studySet.length; i++) {
    let answers = [];
    answers.push(studySet[i].answer.split("|"));
    distilledArray.push([studySet[i].question, answers]);
    answers = [];
  }
  sterilizedSet = distilledArray;
};
sterilizeSet();


// Creating UI
let gobalNavPageLocalUI = document.getElementById("gameStats");
var streakUI = document.createElement("div");
streakUI.id = "streakUI";
streakUI.textContent = 0;
var answerWrongUI = document.createElement("div");
answerWrongUI.id = "answerWrongUI";
answerWrongUI.textContent = 0;
var answerRightUI = document.createElement("div");
answerRightUI.id = "answerRightUI";
answerRightUI.textContent = 0;
gobalNavPageLocalUI.appendChild(streakUI);
gobalNavPageLocalUI.appendChild(answerWrongUI);
gobalNavPageLocalUI.appendChild(answerRightUI);


const circle = (hexColor) => {
  for (let i = 0; i < document.querySelector(".circles").children.length; i++) {
    if (hexColor === "RESET") {
      document.querySelector(".circles").children[i].style.backgroundColor =
        "#FFFFFF";
    } else {
      document.querySelector(".circles").children[i].style.backgroundColor =
        hexColor;
    }
  }
};

const setUpBoard = () => {
  // DO NOT CHANGE IF CURRENTLY ANIMATING
  if (
    document.getElementById(`option1`).classList.contains("cardFlipRight") ||
    document.getElementById(`option1`).classList.contains("cardFlipWrong") || 
    document.getElementById(`option1`).classList.contains("cardFlipPickedWrong")
  ) {
    return;
  }
  questionNumber = Math.round(Math.random() * (sterilizedSet.length - 1));
  questionAnswer = sterilizedSet[questionNumber][1];
  questionAsked = sterilizedSet[questionNumber][0];
  // TODO: ADD A SETTINGS MENU WHERE THIS CAN BE CHANGED =============================
  if (1 == 3 && studySet[questionNumber].timeLimit == "" || null || undefined) {
    timerEnabled = false;
    currentlyTicking = false;
  } else {
    timerEnabled = true;
    currentlyTicking = true;
    totalTime = 30000;
    timeRemaining = totalTime;
  }
  // First, clear elements
  var optionContainer = document.getElementById("theOptionChoicesContainer");
  optionContainer.innerHTML = "";
  document.getElementById("questionHeader").textContent = questionAsked;
  for (let i = 0; i < 4; i++) {
    let optionWrapper = `<div id="option${i+1}" class=""></div>`;
    optionContainer.innerHTML += optionWrapper;
    answerEle[i - 1] = document.getElementById(`option${i+1}`);
    if (!(Array.isArray(questionAnswer) && questionAnswer.length == 1)) {
      let chosenAnswerMarker = document.createElement("input");
      chosenAnswerMarker.type = "checkbox";
      chosenAnswerMarker.id = `RightAnswerMarker${i+1}`;
      chosenAnswerMarker.classList = "RightAnswerMarker";
      document.getElementById(`option${i+1}`).appendChild(chosenAnswerMarker);
    } else {
      const functionWrapper = () => {
        handleAnswer(i+1);
      };
      document
        .getElementById(`option${i+1}`)
        .setAttribute("onclick", `handleAnswer(${i+1})`);
    }
  }
  var awnserPool = [];
  // Pick answers provided by the user always
  awnserPool.push(studySet[questionNumber].answer);
  if (awnserPool.length < 4) {
    for (let i = awnserPool.length; i < 4; i++) {
      let randomNumber = Math.round(Math.random() * studySet.length);
      // TODO: ADD MULITPLE ANSWER SUPPORT
      awnserPool.push(studySet[randomNumber].answer);
    }
  }
  console.log(awnserPool);

  // and add the answers to their wrappers TODO: RANDOMMIZE THIS
  awnserPool = shuffle(awnserPool);
  for (let i = 0; i < 4; i++) {
    document.getElementById(`option${i + 1}`).innerHTML = awnserPool[i];
  }
};


// NOW LETS HANDLE THE ANSWER WE GET BACK
const handleAnswer = (number) => {
  currentlyTicking = false;
  choicePicked = number;
  if (
    document.getElementById(`option1`).classList.contains("cardFlipRight") ||
    document.getElementById(`option1`).classList.contains("cardFlipWrong")
  ) {
    return;
  }
  document
    .getElementById("timeLimitVisualization")
    .classList.remove("timerTick");

  // there is only one
  if (
    document
      .getElementById(`option${number}`)
      .innerHTML.toString()
      .toUpperCase() == questionAnswer.toString().toUpperCase()
  ) {
    reactToAnswer("Correct");
  } else {
    reactToAnswer("Wrong");
  }
};

function revealAnswers() {
  for (let i = 0; i < 4; i++) {
    let isAnswerCorrect = false;
    if (
      document.getElementById(`option${i + 1}`).textContent == questionAnswer
    ) {
      document.getElementById(`option${i+1}`).classList.add("cardFlipRight");
      setTimeout(() => {
        document
          .getElementById(`option${i + 1}`)
          .classList.remove("cardFlipRight");
      }, timeInbeteewnQuestions);
      isAnswerCorrect = true;
    } else {
      if(i + 1 == choicePicked) {
        // If the user pickedman answer that is wrong
        document
          .getElementById(`option${i + 1}`)
          .classList.add("cardFlipPickedWrong");
        setTimeout(() => {
          document
            .getElementById(`option${i + 1}`)
            .classList.remove("cardFlipPickedWrong");
        }, timeInbeteewnQuestions);
        continue;
      }
      isAnswerCorrect = false;
      document.getElementById(`option${i + 1}`).classList.add("cardFlipWrong");
      setTimeout(() => {
        document
          .getElementById(`option${i + 1}`)
          .classList.remove("cardFlipWrong");
      }, timeInbeteewnQuestions);
    }
    // and update the answer
    switch (isAnswerCorrect) {
      case true:
        document
          .getElementById(`option${i + 1}`)
          .classList.add("cardFlipRight");
        setTimeout(() => {
          document
            .getElementById(`option${i + 1}`)
            .classList.remove("cardFlipRight");
        }, timeInbeteewnQuestions);
        break;
      case false:
      default:
        if (!!document.getElementById(`option${i + 1}`)) {
          document
            .getElementById(`option${i + 1}`)
            .classList.add("cardFlipWrong");
          setTimeout(() => {
            document
              .getElementById(`option${i + 1}`)
              .classList.remove("cardFlipWrong");
          }, timeInbeteewnQuestions);
          break;
        }
    }
  }
}
function reactToAnswer(rightness) {
  switch (rightness) {
    case "Correct":
      circle("#013220");
      answerRatio.right++;
      answerRatio.streak++;
      document.getElementById(
        "questionHeader"
      ).textContent = `Correct!`;
      document.getElementById("questionHeader").style.color = "darkgreen";
      setTimeout(() => {
        document.getElementById("questionHeader").style.color = "inherit";
      }, timeInbeteewnQuestions);
      break;
    case "Wrong":
      circle("#8B0000");
      answerRatio.wrong++;
      answerRatio.streak = 0;
      document.getElementById(
        "questionHeader"
      ).textContent = `Incorrect!`;
      document.getElementById("questionHeader").style.color =
        "darkred";
      setTimeout(() => {
        document.getElementById("questionHeader").style.color = "inherit";
      }, timeInbeteewnQuestions);
      break;
  }
  revealAnswers();
  streakUI.textContent = answerRatio.streak;
  answerRightUI.textContent = answerRatio.right;
  answerWrongUI.textContent = answerRatio.wrong;
  setTimeout(() => {
    setUpBoard(set);
  }, timeInbeteewnQuestions);
}
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
// Code for the time limit functionaility
setInterval(function tick() {
  if (timerEnabled == true && currentlyTicking == true) {
    // only execute this once
    if (timeRemaining == totalTime) {
      document.getElementById(
        "timeLimitVisualization"
      ).style.animationDuration = `${totalTime / 1000}s`;
      document
        .getElementById("timeLimitVisualization")
        .classList.add("timerTick");
    }
    timeRemaining -= 500;
    remainingTimePercent = Math.round((timeRemaining / totalTime) * 100);
    if (remainingTimePercent <= 0) {
      reactToAnswer("Wrong");
      totalTime = set[questionNumber].timeLimit * 1000;
      timeRemaining = totalTime;
      remainingTimePercent = Math.round(timeRemaining / totalTime);
      document
        .getElementById("timeLimitVisualization")
        .classList.remove("timerTick");
    }
  }
}, 500);
// adding support for enter key shortcut
document.addEventListener("keypress", function (event) {
    switch (event.keyCode) {
      case 49: // 1
        handleAnswer(1);
        break;
      case 50: // 2
        handleAnswer(2);
        break;
      case 51: // 3
        handleAnswer(4);
        break;
      case 52: // 4
        handleAnswer(4);
        break;
    }
});
setUpBoard();
