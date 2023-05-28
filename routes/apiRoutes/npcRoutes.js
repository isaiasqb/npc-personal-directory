const { filterByQuery, findById, createNewNpc, validateNewNpc } = require('../../lib/npcs-lib');
const { npcs } = require('../../data/npcs.json');
//allows you to declare routes in any file as long as you use the proper middleware.
const router = require('express').Router();

//GET route fo all npcs
router.get('/npcs', (req, res) => {
  let results = npcs;

  console.log(req.query);
  
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
});


// GET route for requesting specific npc // xtra attention to the order of the routes. A param route must come after the other GET
router.get('/npcs/:id', (req, res) => {
  const result = findById(req.params.id, npcs);
  if (result) {
    res.json(result);
  } else {
    res.send(404)
  }
});

//POST route, request action of a client requesting the server to accept data rather than vice versa.
router.post('/npcs', (req, res) => {
  //set id based on the index number
  //This method will only work as long as we don't remove any data
  req.body.id = npcs.length.toString();

  //validation for the submitted data
  if (!validateNewNpc(req.body)) {
    res.status(400).send('The npc is not properly formatted.');
  } else {
    //add the new npc to the json file and the npcs array
    const newNpc = createNewNpc(req.body, npcs)
    res.json(newNpc) 
  }
});

module.exports = router;

