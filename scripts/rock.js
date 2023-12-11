// selectors and variables
const gameSection = document.getElementById("game-section");
const gameTitle = document.getElementById("game-title");
const gameArea = document.getElementById("game-area");

// helper functions
const computerSelection = () => {
  let choices = ["Rock", "Paper", "Scissors"];
  let randomNum = Math.floor(Math.random() * 3);
  return choices[randomNum];
};

// main functions
export const startRock = () => {
  gameTitle.innerText = "Playing Rock Paper Scissors";
  gameSection.classList.toggle("hidden", false);
  gameArea.classList.toggle("hidden", false);

  // Clear previous game elements if any
  gameArea.innerHTML = "";

  const buttonDiv = document.createElement("div");
  gameArea.append(buttonDiv);
  const rockButton = document.createElement("button");
  const paperButton = document.createElement("button");
  const scissorsButton = document.createElement("button");
  const goBack = document.createElement("button");

  buttonDiv.append(rockButton, paperButton, scissorsButton, goBack);

  rockButton.innerText = "Rock";
  paperButton.innerText = "Paper";
  scissorsButton.innerText = "Scissors";
  goBack.innerText = "Go Back";

  rockButton.addEventListener("click", () => selectChoice("Rock"));
  paperButton.addEventListener("click", () => selectChoice("Paper"));
  scissorsButton.addEventListener("click", () => selectChoice("Scissors"));
  goBack.addEventListener("click", () => {
    gameSection.classList.toggle("hidden", true);
  });
};

const selectChoice = (playerChoice) => {
  console.log("Player choice:", playerChoice);
  let computerChoice = computerSelection();
  console.log("Computer choice:", computerChoice);
  determineResults(playerChoice, computerChoice);
};

const determineResults = (playerChoice, computerChoice) => {
  const results = document.createElement("p");
  const playAgain = document.createElement("button");
  playAgain.innerText = "Play Again";

  gameArea.append(results, playAgain);

  // Display choices
  results.innerText = `Player chose: ${playerChoice}\nComputer chose: ${computerChoice}\n`;

  // Determine and display the outcome
  if (playerChoice === computerChoice) {
    results.innerText += "It's a tie!";
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    results.innerText += "Player Wins!";
  } else {
    results.innerText += "Computer wins!";
  }
  playAgain.addEventListener("click", () => {
    results.innerText = "";
    playAgain.classList.toggle("hidden", true);
  });
};
