const fs = require('fs');
const path = require('path');

const express = require('express');
const { npcs } = require('./data/npcs.json')


//Heroku apps get served using port 80. here we are telling tell our app to use an environment variable.
// When Heroku runs the app, it sets an environment variable called process.env.PORT. 
//here we tell our app to use that port, if it has been set, and if not, default to port 3001.
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

//middleware to intercept data //takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object. 
//The extended: true option set inside the method call informs our server that there may be sub-array data nested in it as well,
// so it needs to look as deep into the POST data as possible to parse all of the data correctly. 
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
//takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object. 
app.use(express.json())

//function for filtering data through the query parameters
//This function will take in req.query as an argument and filter through the npcs accordingly, returning the new filtered array.
function filterByQuery(query, npcsArray) {
  let personalityTraitsArray = [];
  let filteredResults = npcsArray;

  if (query.personalityTraits) {
    //save personamlityTrraits as a dedicated array.
    // if personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits
    }
    // Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
      //check the trait against each npc in the filteredResults array.
      // remember it is initially a copy of the npcsArray,
      // but here we are updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        npc => npc.personalityTraits.indexOf(trait) !== -1
      );
    });
  }

  if (query.location) {
    filteredResults = filteredResults.filter(npc => npc.location === query.location);
  }
  if (query.race) {
    filteredResults = filteredResults.filter(npc => npc.race === query.race);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(npc => npc.name === query.name);
  }
  return filteredResults
};


function findById(id, npcsArray) {
  const result = npcsArray.filter(npc => npc.id === id)[0];
  return result
};


function createNewNpc(body, npcsArray) {
  //this function is to be executed at the app.post route's call back function
  const newNpc = body;
  npcsArray.push(newNpc);
  fs.writeFileSync(
    path.join(__dirname, './data/npcs.json'),
    JSON.stringify({ npcs: npcsArray }, null, 2)
  );

  return newNpc;
};




//GET route fo all npcs
app.get('/api/npcs', (req, res) => {
  let results = npcs;

  console.log(req.query);
  
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
});

// GET route for requesting specific npc // xtra attention to the order of the routes. A param route must come after the other GET
app.get('/api/npcs/:id', (req, res) => {
  const result = findById(req.params.id, npcs);
  if (result) {
    res.json(result);
  } else {
    res.send(404)
  }
})

//POST route, request action of a client requesting the server to accept data rather than vice versa.
app.post('/api/npcs', (req, res) => {
  //req.body is where the content of our data will be
  console.log(req.body);

  //set id based on the index number
  //This method will only work as long as we don't remove any data
  req.body.id = npcs.length.toString();

  //add the new npc to the json file and the npcs array
  const newNpc = createNewNpc(req.body, npcs)

  res.json(newNpc) 
});


//tell server to listen for requests by chaining the listen() method
app.listen(PORT, () => {
  console.log('API server is ready and listening now on port 3001');
});