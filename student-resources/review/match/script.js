var studySet; // 4 by 3
var setData;
var questionAndAnswerArray = [],
  simpifiedSetArray = [];
var amountOfRoundsNeeded;
var matchValues;
var amountOfTilesLeft = 12;
var arrayIndex;
var clickOne, clickTwo;
var oldIDs;
if (sessionStorage.getItem("ChoosenSet") == null || undefined) {
  window.location.replace("/Apps/Reviewly/Home/index.html");
} else {
  studySet = JSON.parse(sessionStorage.getItem("ChoosenSet"));
  setData = JSON.parse(localStorage.getItem(`${studySet.title} Metadata`));
  // Set data
}
// simplylify studySetdata
const simplyifyStudySet = () => {
  let distilledArray = [];
  for (let i = 0; i < studySet.content.length; i++) {
    console.log(studySet.content);
    distilledArray.push([
      studySet.content[i].question,
      studySet.content[i].answer,
    ]);
    // distilledArray.push(studySet.content[i].answer);
  }

  return distilledArray;
};
questionAndAnswerArray = simplyifyStudySet();
amountOfRoundsNeeded = Math.trunc((questionAndAnswerArray.length * 2) / 16);
// Create the match board
const matchBoard = document.getElementById("matchBoard");
for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 4; x++) {
    let currentDiv = document.createElement("div");
    currentDiv.id = `${x},${y}`;
    currentDiv.draggable = true;
    currentDiv.addEventListener("dragstart", dragStart);
    currentDiv.addEventListener("dragenter", dragEnter);
    currentDiv.addEventListener("dragover", dragOver);
    currentDiv.addEventListener("dragleave", dragLeave);
    currentDiv.addEventListener("drop", drop);
    currentDiv.addEventListener("click", clicked);
    matchBoard.appendChild(currentDiv);
  }
}
// add a random question and answer
function pickRandomIndices(arr, n) {
  // Create a set to store the unique indices
  let indices = new Set();
  // Loop until the set size is equal to n or the array length
  while (indices.size < n && indices.size < arr.length) {
    // Generate a random index between 0 and arr.length - 1
    let index = Math.floor(Math.random() * arr.length);
    // Add the index to the set
    indices.add(index);
  }
  // Return the set as an array
  return [...indices];
}
//suffle array
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
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}
function generateMatchBoard() {
  simpifiedSetArray = [];
  matchValues = shuffle(questionAndAnswerArray);
  // add values to the match board   matchValues[i] =
  for (let i = 0; i < 6; i++) {
    simpifiedSetArray.push(questionAndAnswerArray[i][0]);
    simpifiedSetArray.push(questionAndAnswerArray[i][1]);
  }
  simpifiedSetArray = shuffle(simpifiedSetArray);
  arrayIndex = 0;
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 3; y++) {
      document.getElementById(`${x},${y}`).textContent =
        simpifiedSetArray[arrayIndex];
      document.getElementById(`${x},${y}`).draggable = true;
      document.getElementById(`${x},${y}`).classList.remove("matchedElement");
      console.log(document.getElementById(`${x},${y}`).textContent);
      maximizeTextSize(`${x},${y}`);
      arrayIndex++;
    }
  }
}
generateMatchBoard();
function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragLeave(e) {
  e.target.classList.remove("drag-over");
}
function findIndex(stringArr, keyString) {
  // Initialising result array to -1 in case keyString is not found
  let result = [-1, -1];
  // Iteration over all the elements of the 2-D array
  for (let i = 0; i < stringArr.length; i++) {
    // Rows
    for (let j = 0; j < stringArr[i].length; j++) {
      // Columns
      if (stringArr[i][j] == keyString) {
        // If keyString is found
        result[0] = i;
        result[1] = j;
        return result;
      }
    }
  }
  return result; // If keyString is not found then -1 is returned
}
function drop(e) {
  e.target.classList.remove("drag-over");
  // get the draggable element
  const id = e.dataTransfer.getData("text/plain");
  //console.log(id, this.id)
  const draggable = document.getElementById(id);
  var resultOne = findIndex(
    questionAndAnswerArray,
    document.getElementById(id).textContent
  );
  var resultTwo = findIndex(
    questionAndAnswerArray,
    document.getElementById(this.id).textContent
  );

  if (
    amountOfTilesLeft == 2 ||
    (resultOne[0] == resultTwo[0] &&
      document.getElementById(id).textContent !==
        document.getElementById(this.id).textContent) ||
    (questionAndAnswerArray[resultOne[0]].includes(
      document.getElementById(id).textContent
    ) &&
      questionAndAnswerArray[resultOne[0]].includes(
        document.getElementById(this.id).textContent
      ) &&
      document.getElementById(id).textContent !==
        document.getElementById(this.id).textContent)
  ) {
    document.getElementById(id).draggable = false;
    document.getElementById(this.id).draggable = false;
    document.getElementById(id).classList.add("matchedElement");
    document.getElementById(this.id).classList.add("matchedElement");
    amountOfTilesLeft = amountOfTilesLeft - 2;
    if (amountOfTilesLeft < 2) {
      amountOfTilesLeft = 16;
      generateMatchBoard();
    }
  } else {
    oldIDs = [id, this.id];
    document.getElementById(id).classList.add("wrongChoice");
    document.getElementById(this.id).classList.add("wrongChoice");
    setTimeout(function () {
      document.getElementById(oldIDs[0]).classList.remove("wrongChoice");
      document.getElementById(oldIDs[1]).classList.remove("wrongChoice");
    }, 500);
  }
}
function clicked(e) {
  if (clickOne == null || undefined || "") {
    clickOne = e.srcElement;
    clickOne.classList.add("clickedElement");
  } else {
    clickTwo = e.srcElement;
    if (clickOne.textContent == clickTwo.textContent) {
      clickTwo == undefined;
      return;
    }
    clickOne.classList.remove("clickedElement");
    console.log("clicked");
    var resultOne = findIndex(questionAndAnswerArray, clickOne.textContent);
    var resultTwo = findIndex(questionAndAnswerArray, clickTwo.textContent);
    if (
      amountOfTilesLeft == 2 ||
      (questionAndAnswerArray[resultOne[0]].includes(clickOne.textContent) &&
        questionAndAnswerArray[resultOne[0]].includes(clickTwo.textContent))
    ) {
      clickOne.draggable = false;
      clickTwo.draggable = false;
      clickOne.classList.add("matchedElement");
      clickTwo.classList.add("matchedElement");
      amountOfTilesLeft = amountOfTilesLeft - 2;
      if (amountOfTilesLeft < 2) {
        amountOfTilesLeft = 16;
        generateMatchBoard();
      }
    } else {
      oldIDs = [clickOne, clickTwo];
      oldIDs[0].classList.add("wrongChoice");
      oldIDs[1].classList.add("wrongChoice");
      setTimeout(function () {
        oldIDs[1].classList.remove("wrongChoice");
        oldIDs[0].classList.remove("wrongChoice");
      }, 500);
    }
    clickOne = undefined;
    clickTwo = undefined;
  }
}
function maximizeTextSize(parentElementId) {
  let parentElement = document.getElementById(parentElementId);
  parentElement.style.fontSize = "1px";
  const isOverflown = (element) => {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  };
  if (isOverflown(parentElement)) {
    while (isOverflown(parentElement)) {
      parentElement.style.fontSize = `${
        parseInt(window.getComputedStyle(parentElement).fontSize) - 1
      }px`;
    }
  } else {
    let n = 0; // n is the safeguard, stopping the loop from running more than 50 times
    while (
      isOverflown(parentElement) == false &&
      parseInt(window.getComputedStyle(parentElement).fontSize) < 50 &&
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
