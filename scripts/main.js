// imports

import { startRock } from "./rock.js";

const playRock = document.getElementById("play-rock");
const clearAll = document.getElementById("clear-all");
const gameSection = document.getElementById("game-section");

// helper functions

const restartAll = () => {
  // Toggle visibility instead of clearing innerHTML
  gameSection.classList.toggle("hidden", true);
};

// event listeners

playRock.addEventListener("click", startRock);
clearAll.addEventListener("click", restartAll);
