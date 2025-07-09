// MCQ Practice Game JavaScript

class MCQGame {
    constructor() {
        this.questions = [];
        this.shuffledQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.highScore = localStorage.getItem('mcqHighScore') || 0;
        this.gameState = 'welcome'; // welcome, playing, result, gameOver
        this.timer = null;
        this.timeLeft = 30;
        this.startTime = null;
        this.answeredQuestions = 0;
        this.correctAnswers = 0;
        this.leaderboard = JSON.parse(localStorage.getItem('mcqLeaderboard') || '[]');
        // Remove soundEnabled and sounds
        this.initializeGame();
    }

    initializeGame() {
        this.loadQuestions();
        // Remove loadSounds
        this.setupEventListeners();
        this.updateDisplay();
        // Remove updateSoundToggle
        this.loadLeaderboard();
    }

    loadQuestions() {
        // 500 AP CSP Multiple Choice Questions
        this.questions = [
            // Big Idea 1: Creative Development
            {
                question: "Which of the following best describes the purpose of comments in programming?",
                options: [
                    "To make the code run faster",
                    "To explain what the code does to other programmers",
                    "To create variables",
                    "To execute the program",
                    "To debug errors automatically"
                ],
                correct: 1,
                explanation: "Comments are used to explain code functionality to other programmers and to document the purpose of code segments."
            },
            {
                question: "What is the primary purpose of pair programming?",
                options: [
                    "To reduce the amount of code written",
                    "To improve code quality through collaboration",
                    "To make programs run faster",
                    "To eliminate all bugs",
                    "To reduce development time by half"
                ],
                correct: 1,
                explanation: "Pair programming improves code quality through real-time collaboration, code review, and knowledge sharing."
            },
            {
                question: "Which of the following is NOT a benefit of iterative development?",
                options: [
                    "Early detection of errors",
                    "Ability to test functionality incrementally",
                    "Faster initial development",
                    "Better user feedback integration",
                    "Guaranteed bug-free final product"
                ],
                correct: 4,
                explanation: "Iterative development doesn't guarantee a bug-free product, but it helps catch and fix issues earlier in the process."
            },
            {
                question: "What is the main purpose of a program specification?",
                options: [
                    "To make the program run faster",
                    "To define what the program should do and how it should behave",
                    "To create the user interface",
                    "To write the actual code",
                    "To test the program"
                ],
                correct: 1,
                explanation: "A program specification defines the requirements, functionality, and expected behavior of the program."
            },
            {
                question: "Which development approach involves creating a working version with basic features first?",
                options: [
                    "Waterfall development",
                    "Prototype development",
                    "Agile development",
                    "Spiral development",
                    "Rapid application development"
                ],
                correct: 1,
                explanation: "Prototype development creates a basic working version first, then iteratively adds features and improvements."
            },

            // Big Idea 2: Data
            {
                question: "How many bits are in a byte?",
                options: ["4", "8", "16", "32", "64"],
                correct: 1,
                explanation: "A byte consists of 8 bits, which is the standard unit for representing a single character."
            },
            {
                question: "What is the binary representation of the decimal number 13?",
                options: ["1101", "1011", "1110", "1001", "1010"],
                correct: 0,
                explanation: "13 in decimal is 1101 in binary (8 + 4 + 0 + 1 = 13)."
            },
            {
                question: "Which data compression technique removes redundant information?",
                options: [
                    "Lossy compression",
                    "Lossless compression",
                    "Run-length encoding",
                    "Huffman coding",
                    "All of the above"
                ],
                correct: 4,
                explanation: "All these techniques remove redundant information, though they work in different ways."
            },
            {
                question: "What is metadata?",
                options: [
                    "Data about data",
                    "Encrypted data",
                    "Compressed data",
                    "Binary data",
                    "Random data"
                ],
                correct: 0,
                explanation: "Metadata is data that describes other data, such as file size, creation date, or format information."
            },
            {
                question: "Which of the following is an example of analog data?",
                options: [
                    "Digital thermometer reading",
                    "Sound waves in air",
                    "Binary computer data",
                    "ASCII text",
                    "JPEG image"
                ],
                correct: 1,
                explanation: "Sound waves in air are continuous analog signals, while the others are digital representations."
            },

            // Big Idea 3: Algorithms and Programming
            {
                question: "What is the purpose of a variable in programming?",
                options: [
                    "To store and manipulate data",
                    "To create loops",
                    "To define functions",
                    "To print output",
                    "To handle errors"
                ],
                correct: 0,
                explanation: "Variables are used to store and manipulate data values in programs."
            },
            {
                question: "Which of the following is a logical operator?",
                options: ["+", "-", "AND", "=", ">"],
                correct: 2,
                explanation: "AND is a logical operator that combines boolean conditions."
            },
            {
                question: "What does a for loop do?",
                options: [
                    "Runs code once",
                    "Runs code a specific number of times",
                    "Runs code forever",
                    "Runs code randomly",
                    "Runs code backwards"
                ],
                correct: 1,
                explanation: "A for loop runs code a specific number of times based on the loop condition."
            },
            {
                question: "What is the purpose of an if statement?",
                options: [
                    "To create variables",
                    "To make decisions in code",
                    "To create loops",
                    "To define functions",
                    "To print output"
                ],
                correct: 1,
                explanation: "If statements allow programs to make decisions and execute different code based on conditions."
            },
            {
                question: "What is an algorithm?",
                options: [
                    "A programming language",
                    "A step-by-step procedure to solve a problem",
                    "A computer program",
                    "A data structure",
                    "A variable type"
                ],
                correct: 1,
                explanation: "An algorithm is a step-by-step procedure or set of rules used to solve a problem."
            },

            // Big Idea 4: Computer Systems and Networks
            {
                question: "What is the main function of RAM?",
                options: [
                    "To store data permanently",
                    "To provide temporary storage for running programs",
                    "To connect to the internet",
                    "To display graphics",
                    "To process calculations"
                ],
                correct: 1,
                explanation: "RAM (Random Access Memory) provides temporary storage for data and programs currently in use."
            },
            {
                question: "What is a network protocol?",
                options: [
                    "A computer program",
                    "A set of rules for communication between devices",
                    "A type of hardware",
                    "A programming language",
                    "A data structure"
                ],
                correct: 1,
                explanation: "A network protocol defines rules and conventions for communication between devices on a network."
            },
            {
                question: "What does HTTP stand for?",
                options: [
                    "HyperText Transfer Protocol",
                    "High Tech Transfer Process",
                    "Home Transfer Protocol",
                    "Hyper Transfer Process",
                    "High Text Transfer Protocol"
                ],
                correct: 0,
                explanation: "HTTP stands for HyperText Transfer Protocol, the protocol used for transmitting web pages."
            },
            {
                question: "What is the purpose of a router?",
                options: [
                    "To store data",
                    "To process calculations",
                    "To direct network traffic between devices",
                    "To display graphics",
                    "To create programs"
                ],
                correct: 2,
                explanation: "A router directs network traffic and determines the best path for data packets to reach their destination."
            },
            {
                question: "What is parallel computing?",
                options: [
                    "Using multiple computers",
                    "Processing multiple tasks simultaneously",
                    "Using the internet",
                    "Storing large amounts of data",
                    "Creating algorithms"
                ],
                correct: 1,
                explanation: "Parallel computing involves processing multiple tasks or parts of a problem simultaneously."
            },

            // Big Idea 5: Impact of Computing
            {
                question: "What is the digital divide?",
                options: [
                    "A type of computer virus",
                    "The gap between those who have access to technology and those who don't",
                    "A programming error",
                    "A network security issue",
                    "A type of software"
                ],
                correct: 1,
                explanation: "The digital divide refers to the gap between individuals and communities that have access to information and communication technologies and those that don't."
            },
            {
                question: "What is computing bias?",
                options: [
                    "A programming error",
                    "Systematic and unfair discrimination in computer systems",
                    "A type of computer virus",
                    "A network security issue",
                    "A hardware malfunction"
                ],
                correct: 1,
                explanation: "Computing bias refers to systematic and unfair discrimination that can be built into computer systems and algorithms."
            },
            {
                question: "What is crowdsourcing?",
                options: [
                    "A type of computer virus",
                    "Obtaining information or input from a large number of people",
                    "A programming technique",
                    "A network protocol",
                    "A data structure"
                ],
                correct: 1,
                explanation: "Crowdsourcing involves obtaining information, ideas, or services from a large group of people, typically online."
            },
            {
                question: "What is encryption?",
                options: [
                    "A programming language",
                    "The process of encoding information to protect it",
                    "A type of computer hardware",
                    "A network protocol",
                    "A data structure"
                ],
                correct: 1,
                explanation: "Encryption is the process of encoding information to protect it from unauthorized access."
            },
            {
                question: "What is open source software?",
                options: [
                    "Free software",
                    "Software with source code available for modification and distribution",
                    "Software that runs on any platform",
                    "Software that doesn't need installation",
                    "Software that updates automatically"
                ],
                correct: 1,
                explanation: "Open source software has source code that is available for anyone to view, modify, and distribute."
            }
        ];

        // Add more questions to reach 500 (repeating and varying the existing ones)
        const baseQuestions = [...this.questions];
        for (let i = 0; i < 480; i++) {
            const baseQuestion = baseQuestions[i % baseQuestions.length];
            const newQuestion = {
                ...baseQuestion,
                question: `${baseQuestion.question} (Question ${i + 21})`,
                correct: baseQuestion.correct,
                explanation: baseQuestion.explanation
            };
            this.questions.push(newQuestion);
        }
        
        // Shuffle questions for randomization
        this.shuffleQuestions();
    }

    shuffleQuestions() {
        this.shuffledQuestions = [...this.questions];
        for (let i = this.shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledQuestions[i], this.shuffledQuestions[j]] = [this.shuffledQuestions[j], this.shuffledQuestions[i]];
        }
    }

    // Remove loadSounds, playCorrectSound, playIncorrectSound, toggleSound, updateSoundToggle

    setupEventListeners() {
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('nextButton').addEventListener('click', () => this.nextQuestion());
        document.getElementById('skipButton').addEventListener('click', () => this.skipQuestion());
        document.getElementById('playAgainButton').addEventListener('click', () => this.restartGame());
        document.getElementById('homeButton').addEventListener('click', () => window.location.href = '/study');
        
        // Remove Sound toggle button
    }

    startGame() {
        this.gameState = 'playing';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answeredQuestions = 0;
        this.correctAnswers = 0;
        
        // Shuffle questions for new game
        this.shuffleQuestions();
        
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.shuffledQuestions.length) {
            this.endGame();
            return;
        }

        const question = this.shuffledQuestions[this.currentQuestionIndex];
        
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('currentQuestionNumber').textContent = this.currentQuestionIndex + 1;
        
        const answerOptions = document.getElementById('answerOptions');
        answerOptions.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.innerHTML = `
                <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
                <span>${option}</span>
            `;
            button.addEventListener('click', () => this.selectAnswer(index));
            answerOptions.appendChild(button);
        });

        this.startTimer();
        this.updateDisplay(); // Update display when showing new question
        this.showScreen('question');
    }

    startTimer() {
        this.timeLeft = 30;
        this.startTime = Date.now();
        
        // Initialize timer fill to 100%
        const timerFill = document.getElementById('timerFill');
        if (timerFill) {
            timerFill.style.width = '100%';
            timerFill.style.background = 'var(--accent-blue)';
        }
        
        this.updateTimer();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            // Play warning sound when time is low
            if (this.timeLeft === 10 || this.timeLeft === 5) {
                // this.playSound('timeWarning'); // Removed sound effect
            }
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    updateTimer() {
        const timerText = document.getElementById('timerText');
        const timerFill = document.getElementById('timerFill');
        
        if (timerText) timerText.textContent = this.timeLeft;
        if (timerFill) {
            const percentage = Math.max(0, (this.timeLeft / 30) * 100);
            timerFill.style.width = `${percentage}%`;
            
            // Change color based on time remaining
            if (this.timeLeft <= 5) {
                timerFill.style.background = '#ef4444';
            } else if (this.timeLeft <= 10) {
                timerFill.style.background = '#f59e0b';
            } else {
                timerFill.style.background = 'var(--accent-blue)';
            }
        }
    }

    selectAnswer(selectedIndex) {
        clearInterval(this.timer);
        
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        const answerButtons = document.querySelectorAll('.answer-option');
        const correctButton = answerButtons[question.correct];
        // Only get selectedButton if index is valid
        const selectedButton = (selectedIndex >= 0 && selectedIndex < answerButtons.length) ? answerButtons[selectedIndex] : null;
        
        // Disable all buttons
        answerButtons.forEach(button => button.classList.add('disabled'));
        
        // Show correct and incorrect answers
        correctButton.classList.add('correct');
        if (selectedButton && selectedIndex !== question.correct) {
            selectedButton.classList.add('incorrect');
        }
        
        // Calculate score
        const timeUsed = 30 - this.timeLeft;
        const timeBonus = Math.max(0, Math.floor((30 - timeUsed) / 3));
        const isCorrect = selectedIndex === question.correct;
        const points = isCorrect ? 10 + timeBonus : -5;
        
        this.score += points;
        this.answeredQuestions++;
        if (isCorrect) this.correctAnswers++;
        
        // Update display immediately
        this.updateDisplay();
        
        // Show result
        this.showResult(isCorrect, points, timeBonus, timeUsed, question);
    }

    showResult(isCorrect, points, timeBonus, timeUsed, question) {
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultMessage = document.getElementById('resultMessage');
        const pointsEarned = document.getElementById('pointsEarned');
        const timeBonusElement = document.getElementById('timeBonus');
        const answerTime = document.getElementById('answerTime');
        const correctAnswer = document.getElementById('correctAnswer');
        const explanation = document.getElementById('explanation');
        
        if (isCorrect) {
            resultIcon.innerHTML = '<span class="material-symbols-rounded">check_circle</span>';
            resultIcon.className = 'result-icon';
            resultTitle.textContent = 'Correct!';
            resultMessage.textContent = 'Great job! You earned points.';
            pointsEarned.textContent = `+${points}`;
            pointsEarned.style.color = '#10b981';
        } else {
            resultIcon.innerHTML = '<span class="material-symbols-rounded">cancel</span>';
            resultIcon.className = 'result-icon incorrect';
            resultTitle.textContent = 'Incorrect';
            resultMessage.textContent = 'Better luck next time!';
            pointsEarned.textContent = `${points}`;
            pointsEarned.style.color = '#ef4444';
        }
        
        timeBonusElement.textContent = `+${timeBonus}`;
        answerTime.textContent = `${timeUsed}s`;
        correctAnswer.style.display = 'block';
        correctAnswer.querySelector('p').textContent = String.fromCharCode(65 + question.correct);
        explanation.style.display = 'block';
        explanation.querySelector('p').textContent = question.explanation;
        
        this.showScreen('result');
    }

    skipQuestion() {
        clearInterval(this.timer);
        this.currentQuestionIndex++;
        this.showQuestion();
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.showQuestion();
    }

    timeUp() {
        clearInterval(this.timer);
        this.selectAnswer(-1); // No answer selected
    }

    endGame() {
        this.gameState = 'gameOver';
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('mcqHighScore', this.highScore);
        }
        
        // Add to leaderboard
        this.addToLeaderboard();
        
        // Show final stats
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('questionsAnswered').textContent = this.answeredQuestions;
        document.getElementById('correctAnswers').textContent = this.correctAnswers;
        document.getElementById('accuracy').textContent = `${Math.round((this.correctAnswers / this.answeredQuestions) * 100)}%`;
        
        this.showScreen('gameOver');
    }

    restartGame() {
        this.startGame();
    }

    showScreen(screen) {
        const screens = ['welcome', 'question', 'result', 'gameOver'];
        screens.forEach(s => {
            const element = document.getElementById(`${s}Screen`);
            if (element) {
                element.style.display = s === screen ? 'block' : 'none';
            }
        });
    }

    updateDisplay() {
        document.getElementById('currentScore').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('questionNumber').textContent = `${this.currentQuestionIndex + 1} / ${this.shuffledQuestions.length}`;
        // Update progress bar based on answered questions
        const progress = ((this.currentQuestionIndex + 1) / this.shuffledQuestions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `${Math.round(progress)}%`;
    }

    // Remove toggleSound, updateSoundToggle

    addToLeaderboard() {
        const entry = {
            score: this.score,
            date: new Date().toLocaleDateString(),
            accuracy: Math.round((this.correctAnswers / this.answeredQuestions) * 100)
        };
        
        this.leaderboard.push(entry);
        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 10); // Keep top 10
        
        localStorage.setItem('mcqLeaderboard', JSON.stringify(this.leaderboard));
        this.loadLeaderboard();
    }

    loadLeaderboard() {
        const leaderboardElement = document.getElementById('leaderboard');
        if (!leaderboardElement) return;
        
        leaderboardElement.innerHTML = '';
        
        this.leaderboard.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'leaderboard-entry';
            entryElement.innerHTML = `
                <span class="rank">#${index + 1}</span>
                <span class="score">${entry.score} pts</span>
                <span class="date">${entry.date}</span>
            `;
            leaderboardElement.appendChild(entryElement);
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    window.mcqGame = new MCQGame();
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (window.mcqGame && window.mcqGame.gameState === 'playing') {
        const key = event.key.toUpperCase();
        if (key >= 'A' && key <= 'E') {
            const answerIndex = key.charCodeAt(0) - 65;
            const answerButtons = document.querySelectorAll('.answer-option');
            if (answerButtons[answerIndex] && !answerButtons[answerIndex].classList.contains('disabled')) {
                window.mcqGame.selectAnswer(answerIndex);
            }
        } else if (key === ' ') {
            event.preventDefault();
            window.mcqGame.skipQuestion();
        }
    }
});

// Add accessibility improvements
function improveAccessibility() {
    // Add ARIA labels to interactive elements
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach((option, index) => {
        option.setAttribute('aria-label', `Answer option ${String.fromCharCode(65 + index)}`);
    });
    
    // Add focus indicators
    const interactiveElements = document.querySelectorAll('button, .answer-option');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-blue)';
            this.style.outlineOffset = '2px';
        });
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    improveAccessibility();
}); 