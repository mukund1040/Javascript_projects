// DOM Elemnets
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "How many players are there in a cricket team?",
    answers: [
      { text: "10", correct: false },
      { text: "11", correct: true },
      { text: "12", correct: false },
      { text: "13", correct: false },
    ],
  },
  {
    question: "Which continent is known as the 'Dark Continent'?",
    answers: [
      { text: "South America ", correct: false },
      { text: "Antarctica", correct: false },
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
    ],
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Helium", correct: false },
      { text: "Carbon Dioxide", correct: true },
    ],
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    answers: [
      { text: "Euro", correct: false },
      { text: "Yen", correct: false },
      { text: "Rupee", correct: true },
      { text: "Dollar", correct: false },
    ],
  },
];

// QUIZ STATE VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  score = 0;
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // Clear previous answers
  answersContainer.innerHTML = "";

  // Create answer buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    // button.disabled = false;
    button.dataset.correct = answer.correct;

    button.addEventListener("click",selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
   if(answersDisabled) return
   answersDisabled = true;
   const selectedButton = event.target;
   const isCorrect = selectedButton.dataset.correct == 'true';

   Array.from(answersContainer.children).forEach(button => {
    if(button.dataset.correct === 'true'){
        button.classList.add("correct")
    }else{
        button.classList.add("incorrect");
    }
   });
   if(isCorrect){
    score ++;
    scoreSpan.textContent = score;
   }
   setTimeout(() => {
    currentQuestionIndex ++;
    if(currentQuestionIndex < quizQuestions.length){
        showQuestion();
    }else{
        showResults();
    }
   },1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if(percentage === 100){
        resultMessage.textContent = "Great!!!"; 
    }else if (percentage >=70){
        resultMessage.textContent = "Keep it up";
    }else if (percentage >= 40){
        resultMessage.textContent = "You can do better";
    }else{
        resultMessage.textContent = "Handwork needed";
    }
}

function restartQuiz() {
 resultScreen.classList.remove("active");
 startQuiz();
}
  
///////// the ///////