//address
// http://localhost:3001/api/npcs

const express = require('express');
const { npcs } = require('./data/npcs.json')


//Heroku apps get served using port 80. here we are telling tell our app to use an environment variable.
// When Heroku runs the app, it sets an environment variable called process.env.PORT. 
//here we tell our app to use that port, if it has been set, and if not, default to port 3001.
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

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


//create a route that the front-end can request data from
app.get('/api/npcs', (req, res) => {
  let results = npcs;

  console.log(req.query);
  
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
});


//tell server to listen for requests by chaining the listen() method
app.listen(PORT, () => {
  console.log('API server is ready and listening now on port 3001');
});