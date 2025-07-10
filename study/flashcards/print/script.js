let data = JSON.parse(sessionStorage.getItem("ChoosenSet")).content;
let printedElement = document.getElementById("printedContent");
function makeLengthDivisibleBy8(arr) {
  while (arr.length % 8 !== 0) {
    arr.push({question: " ", answer: " "});
  }
  return arr;
}
data = makeLengthDivisibleBy8(data)
function makeTermDefinitionnPair(term, def, num) {
  printedElement.innerHTML += `
  <div class="termDefPair" align="center"> <div class="term"> ${term} </div> <div class="def"> ${def} </div> </div>
  `;
}
function generatePrintedContent() {
  for (let i = 0; i < data.length; i = i + 8) {
    // question
    try {
      makeTermDefinitionnPair(
        data[i].question || "undefined",
        data[i + 4].question || "undefined",
        i
      );
    } catch (e) {
      console.log(e);
    }
    try {
      makeTermDefinitionnPair(
        data[i + 1].question || "undefined",
        data[i + 5].question || "undefined",
        i
      );
    } catch (e) {
      console.log(e);
    }
    try {
      makeTermDefinitionnPair(
        data[i + 2].question || "undefined",
        data[i + 6].question || "undefined",
        i
      );
    } catch (e) {
      console.log(e);
    }
    try {
      makeTermDefinitionnPair(
        data[i + 3].question || "undefined",
        data[i + 7].question || "undefined",
        i
      );
      // an
    } catch (e) {
      console.log(e);
    }

    try {
      makeTermDefinitionnPair(
        data[i + 4].answer || "undefined",
        data[i].answer || "undefined",

        i
      );
    } catch (e) {
      console.log(e);
    }

    try {
      makeTermDefinitionnPair(
        data[i + 5].answer || "undefined",
        data[i + 1].answer || "undefined",

        i
      );
    } catch (e) {
      console.log(e);
    }

    try {
      makeTermDefinitionnPair(
        data[i + 6].answer || "undefined",
        data[i + 2].answer || "undefined",

        i
      );
    } catch (e) {
      console.log(e);
    }

    try {
      makeTermDefinitionnPair(
        data[i + 7].answer || "undefined",
        data[i + 3].answer || "undefined",

        i
      );
    } catch (e) {
      console.log(e);
    }
  }
}
function calculateCorrectAnswers(term) {
  return term.answer;
}
generatePrintedContent();

const resizeText = (
  element,
  minSize = 14,
  maxSize = 28,
  step = .5,
  unit = "px"
) => {
  element.forEach((el) => {
    let fontSize = maxSize - el.textContent.length / 20;
    if (fontSize < minSize) {
      fontSize = minSize;
    }
    el.style.fontSize = `${fontSize}${unit}`;
  });
};
resizeText(document.querySelectorAll(".def"));
resizeText(document.querySelectorAll(".term"));

const element = document.getElementById("printedContent");
const container = document.getElementById("container");
window.print()
