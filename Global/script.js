
function addSpindleNavBar() {
  // Create a link element for the stylesheet

    var linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = '/css/modern.css';
  document.head.prepend(linkElement); // Append to the head element
    var linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = '/styles.css';
  document.head.prepend(linkElement); // Append to the head element
  document.body.style.margin = '75px'; // Adjust body padding to prevent content overlap with the navbar
  // Create the nav element-*/.
  const navBar = document.createElement('nav');
  navBar.id = 'navBar';

  // Create the logo link and div
  const logoLink = document.createElement('a');
  logoLink.className = 'page-link';
  logoLink.href = '/';
  const logoMark = document.createElement('div');
  logoMark.id = 'logoMark';
  logoMark.textContent = 'Spindle';
  logoLink.appendChild(logoMark);
  navBar.appendChild(logoLink);

  // Create the page options div
  const pageOptions = document.createElement('div');
  pageOptions.id = 'pageOptions';

  // Create and append the IDE link
  const ideLink = document.createElement('a');
  ideLink.className = 'page-link';
  ideLink.href = '/ide';
  ideLink.textContent = 'IDE';
  pageOptions.appendChild(ideLink);

  // Create and append the Documentation link
  const docsLink = document.createElement('a');
  docsLink.className = 'page-link';
  docsLink.href = '/docs';
  docsLink.textContent = 'Documentation';
  pageOptions.appendChild(docsLink);

  // Create and append the Exam Prep link
  const examPrepLink = document.createElement('a');
  examPrepLink.className = 'page-link';
  examPrepLink.href = '/exam-prep';
  examPrepLink.textContent = 'Exam Prep';
  pageOptions.appendChild(examPrepLink);

  navBar.appendChild(pageOptions);

  // Append the nav bar to the body
  document.body.prepend(navBar);

  // Add the break tags for spacing
  document.body.appendChild(document.createElement('br'));
  document.body.appendChild(document.createElement('br'));
  document.body.appendChild(document.createElement('br'));
}


// To use this function, simply call it when your page loads, for example:
 addSpindleNavBar();

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
