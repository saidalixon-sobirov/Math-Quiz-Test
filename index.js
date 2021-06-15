// Variable Declarations
const question = document.querySelector(".question");
const form = document.querySelector("form");
const userAnswer = document.querySelector("form input");
const popUp = document.querySelector(".overlay");
const bg = document.querySelector(".problem");
const progressBar = document.querySelector(".progress-bar");
const statement = document.querySelector(".statement");
const gameStatus = document.querySelector(".game-status");
const reset = document.querySelector(".overlay button");

userAnswer.focus();

let state = {
  wrongAnswers: 0,
  questionsLeft: 10
};

// Function Declarations
function generateNumber(x) {
  return Math.floor(Math.random() * x + 1);
}

function generateQuestion() {
  let a = generateNumber(10);
  let b = generateNumber(10);
  if (b > a) {
    a = a + b;
    b = a - b;
    a = a - b;
  }
  return {
    value1: a,
    value2: b,
    operator: ["+", "-", "x"][generateNumber(2)]
  };
}

function updateQuestion() {
  state.currentQuestion = generateQuestion();
  let q = state.currentQuestion;
  question.textContent = `${q.value1} ${q.operator} ${q.value2}`;
}

function updateStatement() {
  let x = state.questionsLeft;
  let y = state.wrongAnswers;
  let message = `Siz ${x} ta savolga`;
  if (x > 1) {
    message += ``;
  }
  message += `  javob berdingiz<br>va sizda ${3 - y} ta imkoniyat bor`;
  if (3 - y > 1) {
    message += ``;
  }
  message += ".";
  return message;
}

function formSub(e) {
  e.preventDefault();
  userAnswer.focus();

  let q = state.currentQuestion;
  let correctAnswer;

  if (q.operator === "+") correctAnswer = q.value1 + q.value2;
  if (q.operator === "-") correctAnswer = q.value1 - q.value2;
  if (q.operator === "x") correctAnswer = q.value1 * q.value2;

  // form.focus();

  if (correctAnswer === userAnswer.valueAsNumber) {
    state.questionsLeft -= 1;
    statement.innerHTML = updateStatement();
    progressBar.style.transform = `scaleX(0.${10 - state.questionsLeft})`;

    if (state.questionsLeft === 0) {
      reset.focus();
      gameOver(true);
    }
  } else {
    state.wrongAnswers += 1;
    question.classList.add("error");
    statement.innerHTML = updateStatement();
    setTimeout(() => {
      question.classList.remove("error");
    }, 550);
    if (state.wrongAnswers === 3) {
      reset.focus();
      gameOver(false);
    }
  }
  userAnswer.value = "";
  updateQuestion();
}

function gameOver(won) {
  form.blur();
  userAnswer.blur();

  bg.classList.add("blur");
  popUp.classList.remove("hid");
  progressBar.style.transform = `scaleX(0.0)`;

  if (won) {
    gameStatus.textContent = `Tabriklaymiz! Siz yutdingiz!`;
  } else {
    gameStatus.textContent = `Kechirasiz, siz yutqazdingiz.`;
  }
  reset.focus();
}

function resetGame() {
  state.questionsLeft = 10;
  state.wrongAnswers = 0;

  bg.classList.remove("blur");
  popUp.classList.add("hid");
  progressBar.style.transform = `scaleX(0.0)`;
  statement.innerHTML = `Siz ${
    state.questionsLeft
  } ta savolga savob berdingiz<br>va sizda ${3 - state.wrongAnswers} ta imkoniyat bor.`;
  updateQuestion();

  userAnswer.focus();
}

// Events
form.addEventListener("submit", formSub);
reset.addEventListener("click", resetGame);

// Function Calls
updateQuestion();

