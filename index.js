/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import games from "./games.js";
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  const gamesContainer = document.getElementById("games-container");

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" />
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Pledged: $${game.pledged}</p>
        <p>Goal: $${game.goal}</p>
        <p>Backers: ${game.backers}</p>
      `;

    gamesContainer.appendChild(gameCard);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addGamesToPage(games);
});

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = games.reduce(
  (total, game) => total + game.backers,
  0
);

// set the total contributions count in the contributions card element
contributionsCard.innerHTML = totalContributions.toLocaleString();

// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the raised card element
const raisedCard = document.getElementById("total-raised");

// use reduce() to calculate the total amount pledged by summing the pledged values
const totalPledged = games.reduce((total, game) => total + game.pledged, 0);

// set the total pledged amount in the raised card element with a dollar sign
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
// grab the games card element
const gamesCard = document.getElementById("num-games");

// get the total number of games
const totalGames = games.length;

// set the total number of games in the games card element
gamesCard.textContent = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  const unfundedGames = games.filter((game) => game.pledged < game.goal);

  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // Use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = games.filter((game) => game.pledged >= game.goal);

  // Use the function we previously created to add funded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(games);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = games.filter(
  (game) => game.pledged < game.goal
).length;
// create a string that explains the number of unfunded games using the ternary operator
const totalRaised = games.reduce((total, game) => total + game.pledged, 0);

const message = `We have raised $${totalRaised.toLocaleString()} for ${totalGames} games. ${
  unfundedGamesCount === 0
    ? "All games are fully funded!"
    : `However, there ${unfundedGamesCount === 1 ? "is" : "are"} currently ${
        unfundedGamesCount === 1 ? "1 game" : `${unfundedGamesCount} games`
      } that ${unfundedGamesCount === 1 ? "needs" : "need"} additional funding.`
}`;

// create a new DOM element containing the template string and append it to the description container
// Create a new paragraph element
const messageParagraph = document.createElement("p");
messageParagraph.textContent = message;

// Append the paragraph element to the descriptionContainer
descriptionContainer.appendChild(messageParagraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = games.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...remainingGames] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
// Create elements for displaying the names of the top two funded games
const firstGameElement = document.createElement("p");
const secondGameElement = document.createElement("p");

// Set the text content of the elements to the names of the games
firstGameElement.textContent = firstGame.name;
secondGameElement.textContent = secondGame.name;

// Append the elements to the respective containers
firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);
// do the same for the runner up item
