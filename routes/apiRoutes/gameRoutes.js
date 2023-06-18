const router = require('express').Router();
const {
  filterByQuery,
  findById,
  createNewGame,
  validateNewGame
}  = require('../../lib/games-lib');
const { games } = require("../../data/games.json");

router.get("/games", (req, res) => {
  let results = games;
  if(req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results)
})


router.get("/games/:id", (req, res) => {
  const result = findById(req.params.id, games);
  if(result) {
    res.json(result)
  } else {
    res.send(404);
  }
}); 


router.post("/games", (req, res) => {
  req.body.id = games.length.toString();

  if(!validateNewGame(req.body)) {
    res.status(400).send("The Game is not properly formated");
    // res.json(games);
  } else {
    const game = createNewGame(req.body, games);
    res.json(game);
  }
});

module.exports = router


