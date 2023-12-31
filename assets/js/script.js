// Dom element references

const welcomeRules = document.getElementById('welcome-rules');
const quizArea = document.getElementById('quiz-area');
const answerButtonsElement = document.getElementById('answer-btn-area');
const questionElement = document.getElementById('question');
const nextQuizBtn = document.getElementById('next-question-btn');
const timeCount = document.querySelector('.timer_sec');
const result_box = document.querySelector('.result-box');
const quit_quiz = document.querySelector('.quit-quiz-btn');
const restartBtn = document.querySelector('.restart-quiz-btn');

// Global variables

let questionNumber = 0;
let que_numb = 1;
let timeCounter;
let timeValue = 15;
let userScore = 0;

/**
 * when you click on the quit button it reload the page.
 */
restartBtn.onclick = () => {
  startGame();
};

quit_quiz.onclick = () => {
  window.location.reload();
};

nextQuizBtn.onclick = () => {
  nextQueBtn();
};

// Quiz game structure

/**
 * StartGame function hide the welcome rules page when you click the start quiz button.
 */
function startGame() {
  welcomeRules.style.display = 'none';
  questionNumber = 0;
  que_numb = 1;
  userScore = 0;
  quizArea.classList.remove('hide');
  result_box.style.display = 'none';
  showQuestion(0);
  queCounter(1);
  startTimer(15);
}

/**
 * showQuestion function show the questions, the 4 answer and the next button for the quiz.   
 */
function showQuestion(index) {
  let que_tag = '<span>' + questions[index].numb + '. ' + questions[index].question + '</span>';
  let option_tag = '<button class="answer-button">' + questions[index].options[0] + '</button>' +
    '<button class="answer-button">' + questions[index].options[1] + '</button>' +
    '<button class="answer-button">' + questions[index].options[2] + '</button>' +
    '<button class="answer-button">' + questions[index].options[3] + '</button>';
  questionElement.innerHTML = que_tag;
  answerButtonsElement.innerHTML = option_tag;
  const optionsButtons = answerButtonsElement.querySelectorAll(".answer-button");
  optionsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      optionSelected(button);
    });
  });
}

/**
 * This function does so you can see if your answer is correct by showing green or red button,
 * when you click on it.
 */
function optionSelected(answer) {
  clearInterval(timeCounter);
  let userAns = answer.textContent;
  let correctAns = questions[questionNumber].answer;
  let allOptions = answerButtonsElement.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    answer.classList.add("correct-btn");
  } else {
    answer.classList.add("wrong-btn");

    /**
     * If answer is incorrect then show the correct answer automatically.
     */
    for (let i = 0; i < allOptions; i++) {
      if (answerButtonsElement.children[i].textContent == correctAns) {
        answerButtonsElement.children[i].classList.add("correct-btn");
      }
    }
  }

  /**
   *  Once the player/user selected a option, disabled all the other questions.
   */
  for (let i = 0; i < allOptions; i++) {
    answerButtonsElement.children[i].classList.add("disabled");
  }

  nextQuizBtn.style.display = "block";
}

/**
 * nextQuizBtn function does so you can click next question
 */
function nextQueBtn() {
  if (questionNumber < questions.length - 1) {
    questionNumber++;
    que_numb++;
    showQuestion(questionNumber);
    queCounter(que_numb);
    clearInterval(timeCounter);
    startTimer(timeValue);
    nextQuizBtn.style.display = "none";
  } else {
    showResultbox();
  }
}

/**
 * Function queCounter keep the scoreboard upadating
 */
function queCounter(index) {
  const bottomQuestionNr = document.getElementById('q-left-answer-correct');
  let totalQuestionsTag = '<span><p>' + index + '</p> <p class="gold">/</p> <p class="gold">' + questions.length + '</p></span>';
  bottomQuestionNr.innerHTML = totalQuestionsTag;
}

/**
 * Show the result after all the quiz questions, shows also two buttons,
 * restart quiz and quit quiz.
 */
function showResultbox() {
  welcomeRules.style.display = 'none';
  quizArea.classList.add('hide');
  result_box.style.display = "block";
  const scoreText = document.querySelector('.score_text');
  if (userScore > 6) {
    let scoreTag = '<p class="score_text">Good job you had a great score! </p><p>' + userScore + ' of ' + questions.length + '</p>';
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag = '<p class="score_text">Your score was not so good! </p><p>' + userScore + ' of ' + questions.length + '</p>';
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = '<p class="score_text">Your score was not so good! </p><p>' + userScore + ' of ' + questions.length + '</p>';
    scoreText.innerHTML = scoreTag;
  }
}

/**
 * Clock on the quiz
 */
function startTimer(time) {
  timeCounter = setInterval(timer, 1000);

  function timer() {
    timeCount.innerText = time;
    time--;

    /**
     * Add zero when the time become 9 or lower.
     * Clear time and stop on 00 when the time is finnish 
     */
    if (time < 9) {
      let addzero = timeCount.innerText;
      timeCount.innerText = "0" + addzero;
    }
    if (time < 0) {
      clearInterval(timeCounter);
      timeCount.innerText = "00";
      nextQuizBtn.style.display = "block";

      /**
       * When the time is finnish you see the right answer and you can click on next question.
       * Also so you cant make a choose after the time is finnish.
       */
      let correctAns = questions[questionNumber].answer;
      let allOptions = answerButtonsElement.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (answerButtonsElement.children[i].textContent == correctAns) {
          answerButtonsElement.children[i].classList.add("correct-btn");
        }
      }
      for (let i = 0; i < allOptions; i++) {
        answerButtonsElement.children[i].classList.add("disabled");
      }

      nextQuizBtn.style.display = "block";
    }
  }
}

// questions for the quiz

const questions = [{
    numb: 1,
    question: "Which player has scored the most goals in Champions League history?",
    answer: "Cristiano Ronaldo",
    options: [
      "Leo Messi",
      "Cristiano Ronaldo",
      "Robert Lewandowski",
      "Zlatan Ibrahimovic"
    ]
  },
  {
    numb: 2,
    question: "Which player has the most appearances in Champions League history?",
    answer: "Iker Casillas",
    options: [
      "Xavi",
      "Iker Casillas",
      "Raúl",
      "Cristiano Ronaldo"
    ]
  },
  {
    numb: 3,
    question: "Which of the following players has scored the most goals in the Champions League?",
    answer: "Zlatan Ibrahimovic",
    options: [
      "Didier Drogba",
      "Robert Lewandowski",
      "Zlatan Ibrahimovic",
      "Filippo Inzaghi"
    ]
  },
  {
    numb: 4,
    question: "Who has won the Champions League with the most different clubs (three)?",
    answer: "Clarence Seedorf",
    options: [
      "Samuel Eto'o",
      "Clarence Seedorf",
      "Cristiano Ronaldo",
      "Toni Kroos"
    ]
  },
  {
    numb: 5,
    question: "Which team has scored the most goals (25, season 2017/2018) in a Champions League group stage?",
    answer: "PSG",
    options: [
      "PSG",
      "Real Madrid",
      "Manchester City",
      "Monaco"
    ]
  },
  {
    numb: 6,
    question: "How many goals did Cristiano Ronaldo score in the 2013/2014 season when he broke a new record for goals in one season in the Champions League?",
    answer: "17",
    options: [
      "15",
      "16",
      "17",
      "18"
    ]
  },
  {
    numb: 7,
    question: "Who has the most assists in Champions League history?",
    answer: "Cristiano Ronaldo",
    options: [
      "Leo Messi",
      "Cristiano Ronaldo",
      "Xavi",
      "Mesut Özil"
    ]
  },
  {
    numb: 8,
    question: "How many hattricks have Cristiano Ronaldo and Leo Messi scored in the Champions Leauge?",
    answer: "8",
    options: [
      "4",
      "6",
      "8",
      "10"
    ]
  },
  {
    numb: 9,
    question: "Which player has represented the most clubs in the Champions League group stage?",
    answer: "Zlatan Ibrahimovic",
    options: [
      "Zlatan Ibrahimovic",
      "Javier Saviola",
      "Samuel Eto'o",
      "Hernán Crespo"
    ]
  },
  {
    numb: 10,
    question: "Who has scored the fastest goal in Champions League history?",
    answer: "Roy Makaay",
    options: [
      "Raúl",
      "Fernando Torres",
      "Hernán Crespo",
      "Roy Makaay"
    ]
  }
];