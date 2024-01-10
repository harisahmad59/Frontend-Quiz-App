const questions = [
  {
    question: "What does the acronym 'HTML' stand for?",
    answers: [
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "Hyperlink and Text Markup Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "Hyper Transfer Markup Language", correct: false },
    ],
  },
  {
    question: "In CSS, how can you select an element with the class 'example'?",
    answers: [
      { text: "#example", correct: false },
      { text: ".example", correct: true },
      { text: "example", correct: false },
      { text: "element.example", correct: false },
    ],
  },
  {
    question: "What does the 'DOM' stand for in web development?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Model", correct: false },
      { text: "Design Object Model", correct: false },
      { text: "Document Order Model", correct: false },
    ],
  },
  {
    question: "Which of the following is not a valid JavaScript data type?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Float", correct: true },
      { text: "Object", correct: false },
    ],
  },
  {
    question:
      "In CSS, what property is used to control the space between elements' content and border?",
    answers: [
      { text: "padding", correct: true },
      { text: "margin", correct: false },
      { text: "spacing", correct: false },
      { text: "border-spacing", correct: false },
    ],
  },
  {
    question:
      "What does the JavaScript 'typeof' operator return for a variable with an array value?",
    answers: [
      { text: "string", correct: false },
      { text: "array", correct: false },
      { text: "number", correct: false },
      { text: "object", correct: true },
    ],
  },
  {
    question: "Which event is triggered when a user clicks on an HTML element?",
    answers: [
      { text: "mouseover", correct: false },
      { text: "click", correct: true },
      { text: "change", correct: false },
      { text: "keydown", correct: false },
    ],
  },
  {
    question: "What is the purpose of the HTML canvas element?",
    answers: [
      { text: "Display images", correct: false },
      { text: "Embed videos", correct: false },
      { text: "Create graphics and animations", correct: true },
      { text: "Style text", correct: false },
    ],
  },
  {
    question: "What is the purpose of the CSS z-index property?",
    answers: [
      { text: "Define the elements width", correct: false },
      { text: "Control the stacking order of elements", correct: true },
      { text: "Specify the background color", correct: false },
      { text: "Control the transition of elements", correct: false },
    ],
  },
  {
    question: "In JavaScript, what is the purpose of the querySelector method?",
    answers: [
      { text: "Modify the document's URL", correct: false },
      { text: "Add event listeners to all elements", correct: false },
      { text: "Change the background color", correct: false },
      {
        text: "Select the first element that matches a specified CSS selector",
        correct: true,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
