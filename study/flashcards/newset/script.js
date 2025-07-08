import {
  userInfo,
  getData,
  setData,
  getGlobalData,
  setGlobalData,
} from "/Global/firebase.js";
if (userInfo == null || undefined) {
  // show sign in model
  document.getElementById("bodyContainer").classList.add("disabled");
  document.getElementById("signInPromt").classList.remove("disabled");
}
var cardId = 1;
function createCard(type) {
  // Create a function that takes an id and a class name as parameters and returns a new div element with those attributes
  function createDiv(id, className) {
    let div = document.createElement("div");
    if (id) {
      div.id = id;
    }
    if (className) {
      div.className = className;
    }
    return div;
  }

  // Create a function that takes a type, a class name and a value as parameters and returns a new input element with those attributes
  function createInput(type, className, value, cardId) {
    let input;
    if (type == "textarea") {
      input = document.createElement("textarea");
    } else {
      input = document.createElement("input");
    }
    //input.type = type;

    if (className) {
      input.className = className;
    }
    if (value) {
      input.placeholder = value;
    }
    input.rows = 2;
    return input;
  }

  // Create a function that takes a class name and a text as parameters and returns a new span element with those attributes
  function createSpan(className, text) {
    let span = document.createElement("span");
    if (className) {
      span.className = className;
    }
    if (text) {
      span.textContent = text;
    }
    return span;
  }

  // Create the main div element with id "Card1" and class "surface"
  let card = createDiv(`Card ${cardId}`, "surface");
  card.dataset.type = type;
  // Create the card tool bar div element with class "CardToolBar"
  let cardToolBar = createDiv(null, "CardToolBar");
  card.appendChild(cardToolBar);
  // Create the card number div element with class "CardNumber" and text "1"
  let cardNumber = createDiv(null, "CardNumber");
  cardNumber.textContent = cardId;

  // Create the card modifiers div element with class "CardModifiers"
  let cardModifiers = createDiv(null, "CardModifiers");

  // Create the time limit wrapper div element with class "timeLimitWrapper"
  let timeLimitWrapper = createDiv(null, "timeLimitWrapper");

  // Create the hourglass span element with class "material-symbols-rounded" and text "hourglass_top"

  // Create the points wrapper div element with class "pointsWrapper"
  let pointsWrapper = createDiv(null, "pointsWrapper");

  // Create the leaderboard span element with class "material-symbols-rounded" and text "social_leaderboard"
  let leaderboard = createSpan("", "Group:");

  // Create the points input element with class "points", type "number" and value "1"
  let points = createInput("number", "points", "1", cardId);
  points.id = `Card ${cardId} Grouping`;
  points.min = "1";
  points.max = "10";
  points.value = "1";
  // Append the leaderboard and the points to the points wrapper
  pointsWrapper.appendChild(leaderboard);
  pointsWrapper.appendChild(points);

  // Append the time limit wrapper and the points wrapper to the card modifiers
  // cardModifiers.appendChild(timeLimitWrapper);
  cardModifiers.appendChild(pointsWrapper);

  // Append the card number and the card modifiers to the card tool bar
  cardToolBar.appendChild(cardNumber);
  cardToolBar.appendChild(cardModifiers);

  // Create the card content div element with class "CardContent"
  let cardContent = createDiv(null, "CardContent");
  card.appendChild(cardContent);
  // Create the card question wrapper div element with class "CardQuestionWrapper"
  let cardQuestionWrapper = createDiv(null, "CardQuestionWrapper");
  cardContent.appendChild(cardQuestionWrapper);

  // Create the card question input element with type "text", id "CardQuestion" and placeholder "Add question"
  let cardQuestion = createInput("textarea", null, null);
  cardQuestion.id = `Card ${cardId} Question`;
  cardQuestion.class = "CardQuestion";
  cardQuestion.placeholder = "Add question";

  // Append the card question to the card question wrapper
  cardQuestionWrapper.appendChild(cardQuestion);

  // Create the card answer wrapper div element with class "CardAnswerWrapper"
  let cardAnswerWrapper = createDiv(null, "CardAnswerWrapper");

  cardContent.appendChild(cardAnswerWrapper);
  let answerContainer = createDiv(null, null);
  let textContent = (i) => {
    if (i == 1) {
      return "True";
    } else {
      return "False";
    }
  };
  let answerWrapper = createInput(
    "textarea",
    `exactAnswer`,
    `Add an answer. Seperate multiple answers with "|"`
  );
  answerWrapper.id = `Card ${cardId} Answer`;

  answerContainer.appendChild(answerWrapper);
  cardAnswerWrapper.appendChild(answerContainer);
  // Add Card to the list
  document.getElementById("CardList").appendChild(card);
  cardId++;
}

function createSet(scope) {
  let SetData = { content: [] };
  // Add the title
  SetData.title = document.getElementById(`title`).value;
  SetData.description = document.getElementById(`description`).value;
  SetData.subject = document.getElementById(`subject`).value;
  let setDetails = {
    title: document.getElementById(`title`).value,
    description: (SetData.description =
      document.getElementById(`description`).value),
    category: document.getElementById(`subject`).value,
    numQuestions: cardId,
  };
  // Before we continue, check for any erros in the set
  if (SetData.title.length == 0) {
    createPopup("Warning", "Give your set a title!");
    return;
  }
  if (SetData.description.length == 0) {
    createPopup("Warning", "Give your set a desciption!");
    return;
  }
  if (cardId < 1) {
    createPopup("Error", "You need at least 5 cards to create a set");
    return;
  }
  for (let i = 1; i < cardId; i++) {
    let inputArray = document
      .getElementById(`Card ${i}`)
      .querySelectorAll("input");
    console.log(document.getElementById(`Card ${i} Grouping`));
    /* if(inputArray[2].value == null || undefined) {
         // createPopup("Error", `Card ${i + 1} needs a question`);
      return;
    }*/
    SetData.content.push({
      cardId: i,
      groupNumber: document.getElementById(`Card ${i} Grouping`).value,
      question: document.getElementById(`Card ${i} Question`).value,
      answer: document.getElementById(`Card ${i} Answer`).value,
    });
  }
  sessionStorage.setItem("ChoosenSet", JSON.stringify(SetData));
  localStorage.setItem(
    "LocalSets",
    localStorage.getItem("LocalSets" + JSON.stringify(SetData))
  );
  if (scope == "g") {
    getGlobalData("Global Set Detail List.json", (globalSetList) => {
      let SetList = JSON.parse(globalSetList);
      console.log(SetList);
      SetList.push(setDetails);
      setGlobalData("Global Set Detail List.json", JSON.stringify(SetList));
      setGlobalData(`${setDetails.title}.json`, JSON.stringify(SetData));
     // window.location.assign("/viewset/index.html");
    });
  } else {
    // upload data
    getData("user_set_list.json", userInfo.id, (userSetList) => {
      let SetList = JSON.parse(userSetList);
      console.log(SetList);
      SetList.push(setDetails);
      setData("user_set_list.json", userInfo.id, JSON.stringify(SetList));
      setData(`${setDetails.title}.json`, userInfo.id, JSON.stringify(SetData));
     // window.location.assign("/viewset/index.html");
    });
  }
}

// simple functions kndlk
function createCardExact() {
  createCard("Exact");
}

document
  .querySelector("#createSetButton")
  .addEventListener("click", function () {
    createSet("g"); // u for user, g for global: TODO - add a toggle to switch between user and global.
  });

document
  .querySelector("#exactCardCreaterButton")
  .addEventListener("click", createCardExact);
