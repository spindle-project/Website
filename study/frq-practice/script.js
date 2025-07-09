const SPINDLE_CODE_SNIPPETS = [
  {
    title: 'FRQ 1: Data Abstraction',
    prompt: 'Describe how the following code uses data abstraction. Explain your reasoning in detail.',
    code: `var scores = [95, 87, 78, 92]
var sum = 0
for i in scores:
    sum += i
var average = sum / len(scores)
print(average)`
  },
  {
    title: 'FRQ 2: Algorithm Implementation',
    prompt: 'Explain how the following code implements a searching algorithm. What type of search is it?',
    code: `var numbers = [10, 20, 30, 40, 50]
var target = 30
var found = false
for i in numbers:
    if i == target:
        found = true
        break
if found:
    print("Found!")
else:
    print("Not found")`
  },
  {
    title: 'FRQ 3: List Operations',
    prompt: 'What does this code do with the list? Describe its purpose and output.',
    code: `var nums = [1, 2, 3, 4, 5]
var doubled = []
for num in nums:
    doubled.append(num * 2)
print(doubled)`
  },
  {
    title: 'FRQ 4: Conditional Logic',
    prompt: 'Explain the conditional logic in this code. What are the different outcomes?',
    code: `var age = 18
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")`
  },
  {
    title: 'FRQ 5: Function Definition',
    prompt: 'Describe what this function does and how it processes its input.',
    code: `def calculate_area(length, width):
    var area = length * width
    return area

var result = calculate_area(5, 3)
print(result)`
  },
  {
    title: 'FRQ 6: String Manipulation',
    prompt: 'Explain how this code manipulates strings and what the output will be.',
    code: `var name = "Spindle"
var greeting = "Hello, " + name + "!"
var length = len(name)
print(greeting)
print("Name length:", length)`
  },
  {
    title: 'FRQ 7: Loop Patterns',
    prompt: 'Describe the pattern this loop creates and explain its purpose.',
    code: `for i in range(1, 6):
    var stars = ""
    for j in range(i):
        stars += "*"
    print(stars)`
  },
  {
    title: 'FRQ 8: Data Processing',
    prompt: 'Explain how this code processes the data array and what it accomplishes.',
    code: `var temperatures = [72, 68, 75, 80, 65]
var total = 0
var count = 0
for temp in temperatures:
    if temp > 70:
        total += temp
        count += 1
var average = total / count
print("Average high temp:", average)`
  }
];

// Random code snippets for variety
const RANDOM_CODE_SNIPPETS = [
  `var grades = [88, 92, 76, 95, 89]
var highest = grades[0]
for grade in grades:
    if grade > highest:
        highest = grade
print("Highest grade:", highest)`,

  `var colors = ["red", "blue", "green", "yellow"]
var count = 0
for color in colors:
    if len(color) > 3:
        count += 1
print("Colors with more than 3 letters:", count)`,

  `var numbers = [15, 23, 8, 42, 17]
var even_sum = 0
for num in numbers:
    if num % 2 == 0:
        even_sum += num
print("Sum of even numbers:", even_sum)`,

  `var words = ["hello", "world", "spindle", "coding"]
var long_words = []
for word in words:
    if len(word) >= 5:
        long_words.append(word)
print(long_words)`,

  `var scores = [85, 92, 78, 96, 88]
var total = 0
for score in scores:
    total += score
var average = total / len(scores)
if average >= 90:
    print("Excellent class!")
elif average >= 80:
    print("Good class!")
else:
    print("Needs improvement")`,

  `def find_max(arr):
    var max_val = arr[0]
    for val in arr:
        if val > max_val:
            max_val = val
    return max_val

var data = [12, 45, 23, 67, 34]
var result = find_max(data)
print("Maximum value:", result)`,

  `var text = "programming"
var vowels = 0
for char in text:
    if char in ["a", "e", "i", "o", "u"]:
        vowels += 1
print("Number of vowels:", vowels)`,

  `var matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
var sum = 0
for row in matrix:
    for num in row:
        sum += num
print("Sum of all elements:", sum)`
];

let currentFrq = 0;
let attemptCount = 0;

function getRandomCode() {
  const randomIndex = Math.floor(Math.random() * RANDOM_CODE_SNIPPETS.length);
  return RANDOM_CODE_SNIPPETS[randomIndex];
}

function loadFrq(index) {
  const frq = SPINDLE_CODE_SNIPPETS[index];
  document.getElementById('frqNumber').textContent = `${index + 1} / ${SPINDLE_CODE_SNIPPETS.length}`;
  document.getElementById('currentFrqTitle').textContent = frq.title;
  document.getElementById('frqPrompt').textContent = frq.prompt;
  document.getElementById('frqCode').value = getRandomCode();
  document.getElementById('frqResponse').value = localStorage.getItem(`frqResponse${index}`) || '';
}

function saveFrqResponse(index) {
  const response = document.getElementById('frqResponse').value;
  const code = document.getElementById('frqCode').value;
  localStorage.setItem(`frqResponse${index}`, response);
  localStorage.setItem(`frqCode${index}`, code);
}

function updateAttemptCount() {
  document.getElementById('attemptCount').textContent = attemptCount;
}

document.addEventListener('DOMContentLoaded', function() {
  loadFrq(currentFrq);
  updateAttemptCount();

  document.getElementById('prevFrq').addEventListener('click', function() {
    if (currentFrq > 0) {
      saveFrqResponse(currentFrq);
      currentFrq--;
      loadFrq(currentFrq);
    }
  });

  document.getElementById('nextFrq').addEventListener('click', function() {
    if (currentFrq < SPINDLE_CODE_SNIPPETS.length - 1) {
      saveFrqResponse(currentFrq);
      currentFrq++;
      loadFrq(currentFrq);
    }
  });

  document.getElementById('submitFrq').addEventListener('click', function() {
    saveFrqResponse(currentFrq);
    attemptCount++;
    updateAttemptCount();
    this.textContent = 'Saved!';
    setTimeout(() => {
      this.innerHTML = '<span class="material-symbols-rounded">send</span> Submit Response';
    }, 1200);
  });
}); 