const fs = require("fs");
const path = require("path");

function filterByQuery(query, games) {
  let filteredResults = games;
  
  if(query.releaseYear) {
    filteredResults = filteredResults.filter(
      //data comes in STRINGS. Convert them to Numbers to perform this comparison
      (game) => game.releaseYear === Number(query.releaseYear)
    );
  }

  if(query.favoriteNpc) {
    filteredResults = filteredResults.filter(
      (game) => game.favoriteNpc === query.favoriteNpc
    );
  }

  if(query.name) {
    filteredResults = filteredResults.filter(
      (game) => game.name === query.name
    );
  }

  return filteredResults;
};


function findById(id, games) {
  const result = games.filter((game) => game.id === id)[0];
  return result
};


function createNewGame(body, gamesArray) {
  const newGame = body;
  gamesArray.push(newGame);
  fs.writeFileSync(
    path.join(__dirname, "../data/games.json"),
    JSON.stringify({ games: gamesArray }, null, 2)
  );
  return newGame;
};


function validateNewGame(game) {
  if(!game.name || typeof game.name !== "string") {
    return false;
  }
  if(!game.releaseYear || typeof game.releaseYear !== "number") {
    return false;
  }
  if(!game.favoriteNpc || typeof game.favoriteNpc !== "string") {
    return false;
  }
  return true
};


module.exports = {
  filterByQuery,
  findById,
  createNewGame,
  validateNewGame
};

