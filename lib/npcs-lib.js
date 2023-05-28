const fs = require('fs');
const path = require('path')

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
    console.log(personalityTraitsArray + "- from filterByQuery()")
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
    path.join(__dirname, '../data/npcs.json'),
    JSON.stringify({ npcs: npcsArray }, null, 2)
  );
  return newNpc;
};

// VALIDATION for the data than users will inpur through the post request
function validateNewNpc(npc) {
  if (!npc.name || typeof npc.name !== "string") {
    return false;
  }
  if (!npc.race || typeof npc.race !== 'string') {
    return false;
  }
  if (!npc.location || typeof npc.location !== 'string') {
    return false;
  }  
  if (!npc.personalityTraits || !Array.isArray(npc.personalityTraits)) {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewNpc,
  validateNewNpc
};