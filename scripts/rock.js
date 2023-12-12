// Selectors and variables
const gameSection = document.getElementById("game-section");
const gameTitle = document.getElementById("game-title");
const gameArea = document.getElementById("game-area");

let playerWins = 0;
let computerWins = 0;
let ties = 0;

// Counters for each choice
let playerRock = 0;
let playerPaper = 0;
let playerScissors = 0;
let computerRock = 0;
let computerPaper = 0;
let computerScissors = 0;

// Tally text elements
let playerWinsText, computerWinsText, tiesText;
let playerChoicesText, computerChoicesText;

// Helper function for computer's choice
const computerSelection = () => {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomNum = Math.floor(Math.random() * 3);
  const choice = choices[randomNum];

  // Update computer choice counters
  if (choice === "Rock") computerRock++;
  if (choice === "Paper") computerPaper++;
  if (choice === "Scissors") computerScissors++;

  return choice;
};

// Start game function
export const startRock = () => {
  gameTitle.innerText = "Playing Rock Paper Scissors";
  gameSection.classList.toggle("hidden", false);
  gameArea.classList.toggle("hidden", false);

  gameArea.innerHTML = "";
  setUpTally(); // Set up tally
  setUpChoicesTally(); // Set up choices tally

  // Create and append game buttons
  const buttonDiv = document.createElement("div");
  const rockButton = document.createElement("button");
  const paperButton = document.createElement("button");
  const scissorsButton = document.createElement("button");
  const goBack = document.createElement("button");

  rockButton.innerText = "Rock";
  paperButton.innerText = "Paper";
  scissorsButton.innerText = "Scissors";
  goBack.innerText = "Go Back";

  buttonDiv.append(rockButton, paperButton, scissorsButton);
  gameArea.append(buttonDiv);

  // Event listeners for game choices
  rockButton.addEventListener("click", () =>
    selectChoice("Rock", [rockButton, paperButton, scissorsButton])
  );
  paperButton.addEventListener("click", () =>
    selectChoice("Paper", [rockButton, paperButton, scissorsButton])
  );
  scissorsButton.addEventListener("click", () =>
    selectChoice("Scissors", [rockButton, paperButton, scissorsButton])
  );
  goBack.addEventListener("click", () => {
    resetTally();
    resetChoicesCount();
    gameSection.classList.toggle("hidden", true);
  });
};

// Function to handle player's choice
const selectChoice = (playerChoice, buttons) => {
  const computerChoice = computerSelection();
  determineResults(playerChoice, computerChoice, buttons);

  // Update player choice counters
  if (playerChoice === "Rock") playerRock++;
  if (playerChoice === "Paper") playerPaper++;
  if (playerChoice === "Scissors") playerScissors++;

  updateChoicesTally();
  buttons.forEach((button) => {
    button.disabled = true;
    button.style.backgroundColor = "grey";
  });
};

// Set up tally display
const setUpTally = () => {
  const tallyDiv = document.createElement("div");
  tallyDiv.id = "tally";

  playerWinsText = document.createElement("p");
  playerWinsText.innerText = `Player Wins: ${playerWins}`;
  computerWinsText = document.createElement("p");
  computerWinsText.innerText = `Computer Wins: ${computerWins}`;
  tiesText = document.createElement("p");
  tiesText.innerText = `Ties: ${ties}`;

  tallyDiv.append(playerWinsText, computerWinsText, tiesText);
  gameArea.append(tallyDiv);
};

// Set up choices tally display
const setUpChoicesTally = () => {
  const choicesTallyDiv = document.createElement("div");
  choicesTallyDiv.id = "choices-tally";

  playerChoicesText = document.createElement("p");
  playerChoicesText.innerText = `Player - Rock: ${playerRock}, Paper: ${playerPaper}, Scissors: ${playerScissors}`;
  computerChoicesText = document.createElement("p");
  computerChoicesText.innerText = `Computer - Rock: ${computerRock}, Paper: ${computerPaper}, Scissors: ${computerScissors}`;

  choicesTallyDiv.append(playerChoicesText, computerChoicesText);
  gameArea.append(choicesTallyDiv);
};

// Update choices tally
const updateChoicesTally = () => {
  playerChoicesText.innerText = `Player - Rock: ${playerRock}, Paper: ${playerPaper}, Scissors: ${playerScissors}`;
  computerChoicesText.innerText = `Computer - Rock: ${computerRock}, Paper: ${computerPaper}, Scissors: ${computerScissors}`;
};

// Function to determine game results
// Function to determine game results
const determineResults = (playerChoice, computerChoice, buttons) => {
  let results = document.querySelector("#results");
  if (!results) {
    results = document.createElement("div");
    results.id = "results";
    gameArea.append(results);
  }
  results.innerHTML = `Player chose: ${playerChoice}\nComputer chose: ${computerChoice}\n`;

  if (playerChoice === computerChoice) {
    results.innerText += "It's a tie!";
    ties++;
    tiesText.innerText = `Ties: ${ties}`;
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    results.innerText += "Player Wins!";
    playerWins++;
    playerWinsText.innerText = `Player Wins: ${playerWins}`;
  } else {
    results.innerText += "Computer Wins!";
    computerWins++;
    computerWinsText.innerText = `Computer Wins: ${computerWins}`;
  }

  // Check if 'Play Again' button already exists
  let playAgain = document.querySelector("#play-again");
  if (!playAgain) {
    playAgain = document.createElement("button");
    playAgain.id = "play-again";
    playAgain.innerText = "Play Again";
    playAgain.addEventListener("click", () => {
      results.remove();
      buttons.forEach((button) => {
        button.disabled = false;
        button.style.backgroundColor = "";
      });
    });
    gameArea.appendChild(playAgain);
  }
};

// Reset tally
const resetTally = () => {
  playerWins = 0;
  computerWins = 0;
  ties = 0;
  playerWinsText.innerText = `Player Wins: ${playerWins}`;
  computerWinsText.innerText = `Computer Wins: ${computerWins}`;
  tiesText.innerText = `Ties: ${ties}`;
};

// Reset choices count
const resetChoicesCount = () => {
  playerRock = 0;
  playerPaper = 0;
  playerScissors = 0;
  computerRock = 0;
  computerPaper = 0;
  computerScissors = 0;
  updateChoicesTally();
};
