import { bluePage } from "../main.js";
import { backBtn } from "./components/back_btn.js";
import { menuPage } from "./menu.js";

export let gameArr = ["a", "b"];

export async function joinGamePage() {
  const joinGameP = document.createElement("div");
  joinGameP.className = "joinGamePage page";
  joinGameP.innerHTML = `
    <div id="formFlex">
        <h3 id="joinGame">Join Game</h3>
        <div id="playersList"></div>
    </div>`;

  const playersList1 = joinGameP.querySelector("#playersList");

  const rooms = await getRooms();
  rooms.forEach((room, index) => {
    const game = document.createElement("div");
    game.className = "room";
    game.innerHTML = `<span>${room.name}</span><span>➡️</span>`;

    game.addEventListener("click", async () => {
      const oldContent = joinGameP.children[0];
      oldContent.remove();

      joinGameP.innerHTML = `<h2>Waiting for ${
        room.capacity - room.users.length
      } more players...</h2>`;

      const response = await fetch(`/rooms/${room.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        gamepage(data["questions"]);
      }
    });
    playersList1.appendChild(game);
  });

  const intergame = joinGameP.querySelectorAll(".room");
  intergame.forEach((room) => room.addEventListener("click", gamepage));

  const oldContent = bluePage.children[0];
  oldContent.remove();

  joinGameP.appendChild(backBtn(oldContent, joinGameP));
  bluePage.appendChild(joinGameP);
}

export function gamepage(questions) {
  let solvedQuestions = 1;
  let score = 100;
  const gameP = document.createElement("div");
  let currentQuestionIndex = 0;
  gameP.id = "gameP";
  gameP.className = "game page";
  bluePage.appendChild(gameP); // Append game to the main game container

  // Create a persistent timer element
  const timerDisplay = document.createElement("div");
  timerDisplay.className = "timer";
  timerDisplay.textContent = "Time Left: 03:00";
  gameP.appendChild(timerDisplay);

  // Function to update the display of a question
  function displayQuestion(questionObj) {
    const questionContent = document.createElement("div");
    questionContent.innerHTML = `
            <div class="facts-block" id="navigationDiv">
                <div class="divFlex">
                    <div class="question-container opt">
                        <div class="question-number">Q${
                          currentQuestionIndex + 1
                        }</div>
                        <div class="question">${questionObj.question}</div>
                    </div>
                    <div class="options">${questionObj.answers
                      .map(
                        (answer, index) =>
                          `<button class="btn" data-index="${index}">${answer}</button>`
                      )
                      .join("")}</div>
                </div>
            </div>`;

    // Remove previous question content if exists
    const oldQuestionContent = gameP.querySelector("#navigationDiv");
    if (oldQuestionContent) {
      gameP.removeChild(oldQuestionContent.parentNode);
    }
    gameP.appendChild(questionContent);

    const buttons = questionContent.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        checkAnswer(questionObj, parseInt(this.getAttribute("data-index")));
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          displayQuestion(questions[currentQuestionIndex]);
        } else {
          gameP.innerHTML = `<h2 style="margin-bottom: 15px;"> You solved ${solvedQuestions} out of 10! <br>
                                            You gained ${
                                              (solvedQuestions /
                                                questions.length) *
                                              10
                                            } points!</h2>
                                        <button id="backMenu">Go Back To Menu</button>`;
          const backMenu = gameP.querySelector("#backMenu");
          backMenu.addEventListener("click", menuPage);
        }
      });
    });
  }

  function checkAnswer(questionObj, userSelected) {
    if (userSelected === questionObj.correctAnswer) {
      // alert("Correct!");
      solvedQuestions++;
    } else {
      // alert("Wrong answer!");
    }
  }

  function startTimer() {
    let timeLeft = 300; // 300 seconds for 5 minutes
    const interval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `Time Left: ${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(interval);
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    alert("Time's up! The game is now over.");
    gameP.innerHTML = "<p>Game Over! Time has expired.</p>";
    // Optionally, clean up any game state or redirect as needed
  }

  // Initialize the timer when the game page is loaded
  startTimer();

  // Initial call to display the first question
  if (questions.length > 0) {
    displayQuestion(questions[currentQuestionIndex]);
  }

  const oldContent = bluePage.children[0];
  oldContent.remove();

  gameP.appendChild(backBtn(oldContent, gameP));
}

async function getRooms() {
  const response = await fetch("/rooms");
  const rooms = await response.json();
  return rooms;
}