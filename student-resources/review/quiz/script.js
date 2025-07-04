var studySet = JSON.parse(sessionStorage.getItem("ChoosenSet"));
document.title = `${studySet.title} Quiz`;

document.getElementById("maxQuestionsNum").value = studySet.content.length;
document.getElementById("maxQuestionsNum").max = studySet.content.length;
document.getElementById("maxQuestionsNum").min = Math.floor(studySet.content.length/10);


document.getElementById("maxQuestionLabel").textContent = `Questions (max ${studySet.content.length}) `;

var title = studySet.title;
studySet = shuffle(studySet.content);

function submitPopupModel() {
  // set flags
  let maxQuestionsNum = document.getElementById("maxQuestionsNum").value;
  let allowFivePossibleAnswers = document.getElementById("allowMoreAnswers").value;
  let immediateFeedback = false; // not implimented yet
  setUpQuiz(maxQuestionsNum,allowFivePossibleAnswers,immediateFeedback);
  document.getElementById("modelPopup").style.display = "none";
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    // While there remain elements to shuffle.
    randomIndex = Math.floor(Math.random() * currentIndex); // Pick a remaining element.
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
function getCompleteAnswerArray() {
  let a = [];
  for (let i = 0; i < studySet.length; i++) {
    a.push(studySet[i].answer);
  }
  return a;
}

// Generate the quiz
function setUpQuiz (maxQuestionsNum,allowFivePossibleAnswers,answerQsWithTerm,answerQsWithDef) {
  studySet = shuffle(studySet);
  
  document.getElementById("title").textContent = `${title} Quiz`;
  
  for (let i = 0; i < maxQuestionsNum; i++) {
    var awnserPool = [studySet[i].answer]; // add the correct answer to the answer pool
    let falseAnswerArray = [...new Set(getCompleteAnswerArray())];
    falseAnswerArray.splice(falseAnswerArray.indexOf(studySet[i].answer), 1);
    for (let i = 0; i < 4; i++) {
      // pick 3 incorrect answers
      let randomNum = Math.floor(Math.random() * falseAnswerArray.length);
      awnserPool.push(falseAnswerArray[randomNum]);
      if(falseAnswerArray[randomNum] == "undefined"){
        console.log(`${randomNum} of ${falseAnswerArray.length}`);
      }
      falseAnswerArray.splice(randomNum, 1); // remove the choosen answer from the array
    }
    awnserPool = shuffle(awnserPool); // shuffle it to add a layer of randomness
    // Append the element
    document.getElementById("quizForm").innerHTML += `<fieldset id="fieldset${
      i + 1
    }" form="form="quizForm" class="questionBlock"  required>
            <p class="question text-size-h5">${i + 1}. ${
      studySet[i].question
    }</p>
            <label class="option">
              <input
                type="radio"
                name="question${i + 1}"
                value="option1"
                class="blockA"
                form="quizForm"
                required
              />
              ${awnserPool[0]}
            </label>

            <label class="option">
              <input
                type="radio"
                name="question${i + 1}"
                value="option2"
                class="blockB"
                form="quizForm"
                required
              />
              ${awnserPool[1]}
            </label>
            <label class="option">
              <input
                type="radio"
                name="question${i + 1}"
                value="option3"
                class="blockC"
                form="quizForm"
                required
              />
              ${awnserPool[2]}
            </label>
            <label class="option">
              <input
                type="radio"
                name="question${i + 1}"
                value="option4"
                class="blockD"
                form="quizForm"
                required
              />
              ${awnserPool[3]}
            </label>
            </fieldset>`;
    if(allowFivePossibleAnswers){
      document.getElementById(`fieldset${i + 1}`).innerHTML += 
        `<label class="option">
              <input
                type="radio"
                name="question${i + 1}"
                value="option4"
                class="blockE"
                form="quizForm"
                required
              />
              ${awnserPool[4]}
            </label>`
    }
  }
   document.getElementById("quizForm").innerHTML +=`<div class="form-group">
            <button
                    onclick="checkAnswers()"
              class="submitButton"
                    type="submit"
            >
              Check Answers
            </button>
          </div>`
};

// grade the quiz
function checkAnswers() {
  if(!document.getElementById("quizForm").checkValidity()){
    return
  }
  let questionNumber = 0,
    correctAnswers = 0,
    correctAnswerElementArray = [],
    wrongAnswers = 0;
  // Loop over each question block
  for (const questionBlock of document.getElementById("quizForm").children) {
    questionNumber++;
    var pickedChoice = null;
    var question = studySet[questionNumber - 1].question;
    var correctChoice = studySet[questionNumber - 1].answer;
    // loop over the answer containers inside each question block
    for (const answerContainer of questionBlock.children) {
      if (answerContainer.tagName == "P") {
        continue; // filter out all elements that are not the answer (ie question name)
      }
      // Check if the answer is checked. The checkec answer  will remain visable
      if (answerContainer.children[0].checked == true) {
        pickedChoice = answerContainer.textContent.replace(/\s+/g, " ").trim();
        if (pickedChoice === correctChoice) {
          // is it correct?
          answerContainer.parentElement.classList.add("correctBlock");
          correctAnswerElementArray.push(answerContainer.parentElement);
          correctAnswers++;
        } else {
          // it's wrong!
          answerContainer.parentElement.classList.add("userPickedwrong");
          wrongAnswers++;
        }
      } else {
        // the user did NOT pick this answer
        if (
          answerContainer.textContent.replace(/\s+/g, " ").trim() ===
          correctChoice
        ) {
          // this answer is CORRECT, but the user DID NOT pick it
          answerContainer.classList.add("correct");
        } else {
          // this asnwer is WRONG and the user DID NOT pick it. Make it disapper
          answerContainer.classList.add("wrong");
        }
      }
    }
  }
  
  showResults(
    studySet.length,
    correctAnswers,
    wrongAnswers,
    correctAnswerElementArray
  );
}
function showResults(
  totalQuestions,
  numRight,
  numWrong,
  correctAnswerElementArray
) {
  document.getElementById("gradingDiv").style.display = "flex !important";
  document.getElementById("gradingDiv").innerHTML = `
    <h1>
        Quiz Results:
      </h1>
      <h2>
        Grade: ${Math.round(
          (numRight / totalQuestions) * 100
        )}% (${numRight}/${totalQuestions})
      </h2>
      <progress value="${Math.round(
        (numRight / totalQuestions) * 100
      )}" min="0" max="100"></progress>

  `;
}
