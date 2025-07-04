
// Generate header -- Create a new div element with the class "header".
const header = document.createElement('div');
header.classList.add('header');

// Create a new anchor element with the class "logo" and the href attribute set to "#default".
const logo = document.createElement('img');
logo.classList.add('logo');
logo.src = "https://cdn.glitch.global/930d3be6-c667-4ce7-99e2-b129dd9b79b2/noBgWhite%20(3).png?v=1737682977458"


// Create a new div element with the class "header-right".
const headerRight = document.createElement('div');
headerRight.classList.add('header-right');

const unregistedAccountContainer = document.createElement('div');
unregistedAccountContainer.classList.add('unreg-account-container');

// Create a new anchor element with the href attribute set to "#home".


const signUpLink = document.createElement('a');
signUpLink.href = '/signin/index.html';
signUpLink.textContent = "Sign up";
const logInLink = document.createElement('a');
logInLink.href = '/signin/index.html';
logInLink.textContent = "Login";





// Append the logo and header-right elements to the header element.
header.appendChild(logo);
header.appendChild(headerRight);

// Append the signInLink element to the header-right element.
headerRight.appendChild(unregistedAccountContainer);
unregistedAccountContainer.appendChild(logInLink)

unregistedAccountContainer.appendChild(signUpLink);
// Append the header element to the document body.
document.body.prepend(header);

// User notification
const createPopup = (type, message) => {
  let popupWrapper = document.createElement("div");
  popupWrapper.classList.add("popupWrapper");
  switch(type){
    case "info":
        popupWrapper.classList.add("info");
      break;
      case "warn":
        popupWrapper.classList.add("warn");
      break;
    case "alert":
        popupWrapper.classList.add("alert");
      break;
  }
  popupWrapper.textContent = message;
  document.body.appendChild(popupWrapper);
      // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
      setTimeout(function () {
        popupWrapper.style.opacity = "0";
      }, 900);
};
//document.head.innerHTML = document.head.innerHTML + '<link rel="stylesheet>...'
