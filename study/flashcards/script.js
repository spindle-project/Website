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
          "u",
          set.id // Pass the set ID
        );
          if (set.category.substring(0, 8) != "APCSP - ") {
      continue
    }
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
      "g",
      set.id // Pass the set ID
    );
    if (set.category.substring(0, 8) != "APCSP - ") {
      continue
    }
    document.getElementById("generatedContent").appendChild(ResultingSet);
  }
}

const ChooseSet = (title, scope) => {
  if (scope == "g") {
    let e = getGlobalData(`/${title}.json`, (data) => {
      sessionStorage.setItem("ChoosenSet", data);
      window.location.assign("/study/flashcards/viewset/");
    });
  } else {
    let e = getData(`/${title}.json`, userInfo.id, (data) => {
      sessionStorage.setItem("ChoosenSet", data);
      window.location.assign("/study/flashcards/viewset/");
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
    // Only include sets whose title starts with 'APCSP - '
    if (!globalLibary[i].category.startsWith('APCSP - ')) {
      continue;
    }
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
  scope = "g",
  setId = null // Optionally pass a set ID for linking
) {
  // Remove 'APCSP - ' prefix from category if present
  let displayCategory = category.startsWith('APCSP - ') ? category.slice(8) : category;
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
  //==================== Creating set des
  let setDescription = document.createElement("b");
  setDescription.classList.add("setDescription");
  setDescription.classList.add("text-size-body");
  setDescription.textContent = description;
  SetContainer.appendChild(setDescription);
  // -- Bottom bar for metadata and button
  let setBottomBar = document.createElement("div");
  setBottomBar.classList.add("setBottomBar");
  // -- Combined metadata section
  let SetMetadataContainer = document.createElement("div");
  SetMetadataContainer.classList.add("setMetaData");
  SetMetadataContainer.classList.add("text-caption");
  // Format: [category] ⸱ [numcards]
  let metaText = document.createElement("span");
  metaText.classList.add("meta-combined");
  metaText.textContent = `${displayCategory} ⸱ ${NOQ} cards`;
  SetMetadataContainer.appendChild(metaText);
  setBottomBar.appendChild(SetMetadataContainer);
  // Add the View Set button below the metadata
  let viewSetBtn = document.createElement("a");
  viewSetBtn.classList.add("view-set-btn");
  viewSetBtn.textContent = "View Set";
  if (setId) {
    viewSetBtn.onclick  = () => {
      sessionStorage.setItem("ChoosenSet", setId);
     // window.location.assign("/study/flashcards/viewset/");
    }
  } else {
    viewSetBtn.onclick = () => {
      ChooseSet(title, scope);
    }
  }
  viewSetBtn.setAttribute("tabindex", "0");
  viewSetBtn.style.width = "100%";
  setBottomBar.appendChild(viewSetBtn);
  SetContainer.appendChild(setBottomBar);
  return SetContainer;
}

console.log("Hello World")