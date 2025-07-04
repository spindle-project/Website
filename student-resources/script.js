import { getGlobalData, getData, setData, userInfo } from "/Global/firebase.js";
const setUpUserGreeting = (userInfo) => {
  if (userInfo == undefined) {
    document.getElementById("userInfoSegmeant").style.display = "none";
    return;
  }
  // user is signed in
  document.getElementById("userGreeting").textContent = `Hiya, ${
    userInfo.username.split(" ")[0]
  }!`;

  // set up user libary
  // upload data
  getData("user_set_list.json", userInfo.id, (userSetList) => {
    let SetList = JSON.parse(userSetList);
    console.log(SetList);
    if (SetList.length == 0 || SetList == null || SetList == undefined) {
      document.getElementById("setLibaryWrapper").style.display = "none";
    } else {
      for (let i = 0; i < SetList.length; i++) {
        let set = SetList[i];
        let ResultingSet = BuildSet(
          set.title,
          set.description,
          set.numQuestions,
          set.category,
          "u"
        );
        document
          .getElementById("recentSetsContainer")
          .appendChild(ResultingSet);
      }
    }
  });
};

setUpUserGreeting(userInfo);

// populate the global set libary
var globalLibary;
getGlobalData("Global Set Detail List.json", (globalSetLibary) => {
  populateGlobalLibary(JSON.parse(globalSetLibary));
  globalLibary = JSON.parse(globalSetLibary);
});
function populateGlobalLibary(globalSetLibary) {
  for (let i = 0; i < globalSetLibary.length; i++) {
    let set = globalSetLibary[i];
    // Check if there's the title of a set in the url
if(window.location.href.split("/?").length > 1 && set.title == window.location.href.split("/?")[1].replace(/%20/g," ")){
  ChooseSet(set.title, 'g')
}
    let ResultingSet = BuildSet(
      set.title,
      set.description,
      set.numQuestions,
      set.category,
      "g"
    );
    document.getElementById("generatedContent").appendChild(ResultingSet);
  }
}

const ChooseSet = (title, scope) => {
  if (scope == "g") {
    let e = getGlobalData(`/${title}.json`, (data) => {
      sessionStorage.setItem("ChoosenSet", data);
      window.location.assign("/viewset/index.html");
    });
  } else {
    let e = getData(`/${title}.json`, userInfo.id, (data) => {
      sessionStorage.setItem("ChoosenSet", data);
      window.location.assign("/viewset/index.html");
    });
  }
};

const input = document.querySelector("#searchSets");
const suggestions = document.querySelector(".suggestions ul");
//   Make Set search work
const search = (str) => {
  let results = [];
  let fullSetResults = [];
  const val = str.toLowerCase();
  for (let i = 0; i < globalLibary.length; i++) {
    if (globalLibary[i].title.toLowerCase().indexOf(val) > -1) {
      results.push(globalLibary[i].title);
      fullSetResults.push(globalLibary[i]);
    }
  }
  return [results, fullSetResults];
};
const searchHandler = (e) => {
  const inputVal = e.currentTarget.value;
  let results = [];
  let resultContents = [];
  if (inputVal.length > 0) {
    results = search(inputVal)[0];
    resultContents = search(inputVal)[1];
  }
  showSuggestions(results, inputVal, resultContents);
};

const showSuggestions = (results, inputVal, resultContents) => {
  suggestions.innerHTML = "";
  document.getElementById("results").innerHTML = "";
  if (results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      // Item is the Set's Title
      let item = results[i];
      const match = item.match(new RegExp(inputVal, "i"));
      item = item.replace(match[0], `${match[0]}`);
      // upgrading results
      let set = resultContents[i];
      let ResultingSet = document.createElement("span");
      ResultingSet.textContent = set.title;
      document.getElementById("results").appendChild(ResultingSet);
      ResultingSet.addEventListener("click", function () {
    ChooseSet(set.title, 'g');
  });
    }
    suggestions.classList.add("has-suggestions");
  } else {
    results = [];
    suggestions.innerHTML = "";
    suggestions.classList.remove("has-suggestions");
  }
  
};
function useSuggestion(e) {
  input.value = e.target.innerText;
  input.focus();
  suggestions.innerHTML = "";
  suggestions.classList.remove("has-suggestions");
}
input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", () => {
  ChooseSet(input.value);
});

function BuildSet(
  title = "null",
  description = "null",
  NOQ = 0,
  category = "null",
  scope = "g"
) {
  // -- Create a wrapper for the set
  let SetContainer = document.createElement("div");
  SetContainer.classList.add("setContainer");
  SetContainer.classList.add("surface-layer-one");
  // -- Creating the title
  let SetTitle = document.createElement("b");
  SetTitle.classList.add("setTitle"); //.text-size-h5
  SetTitle.classList.add("text-size-h5");
  SetTitle.textContent = title;
  SetContainer.appendChild(SetTitle);
  // -- ... and the metadata
  let SetMetadataContainer = document.createElement("div");
  SetMetadataContainer.classList.add("setMetaData");
  SetMetadataContainer.classList.add("text-caption");
  SetContainer.appendChild(SetMetadataContainer);
  // -- now populate it with the set's metadata
  // ==================== Creating the NOQ Stat ===========
  // NOQ = Number Of Questions
  let NOQContainer = document.createElement("b");
  // Adding Data ===================================================
  NOQContainer.innerHTML += `${NOQ} Terms`;
  NOQContainer.classList.add("stat-chip");
  SetMetadataContainer.appendChild(NOQContainer);
  // ==================== End of NOQ Stat ===========
  // ==================== Creating the category Stat ===========
  // NOQ = Number Of Questions
  let categoryContainer = document.createElement("b");
  // Adding Data ===================================================
  categoryContainer.innerHTML += category;
  categoryContainer.classList.add("stat-chip");
  SetMetadataContainer.appendChild(categoryContainer);
  // ==================== End of category Stat ===========
  //==================== Creating set des
  let setDescription = document.createElement("b");
  setDescription.classList.add("setDescription");
  setDescription.classList.add("text-size-body");
  setDescription.textContent = description;
  SetContainer.appendChild(setDescription);

  // Adding functionality for when clicked
  SetContainer.addEventListener("click", function () {
    ChooseSet(title, scope);
  });
  // Returning the element
  return SetContainer;
}

console.log("Hello World")