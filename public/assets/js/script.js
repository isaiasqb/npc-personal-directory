const $npcForm = document.querySelector('#npc-form');
const $gameForm = document.querySelector('#game-form');

const handleNpcFormSubmit = event => {
  event.preventDefault();

  // get npc data and organize it
  const npcName = $npcForm.querySelector('[name="npc-name"]').value;
  const location = $npcForm.querySelector('[name="location"]').value;

  const raceOptionsHTML = $npcForm.querySelectorAll('[name="race"]');
  let race;

  for (let index = 0; index < raceOptionsHTML.length; index++) {
    if(raceOptionsHTML[index].checked) {
      race = raceOptionsHTML[index].value;
    }
  } 

  if (race === undefined) {
    race = '';
  }


  const selectedTraits = $npcForm.querySelector('[name="personality"]').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const npcObject = { npcName, race, location, personalityTraits };

  fetch('/api/npcs', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(npcObject)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert('Error: ' + response.statusText);
    })
    .then(postResponse => {
      console.log(postResponse);
      alert('You added a new NPC to the catalog!');
    });

};

$npcForm.addEventListener('submit', handleNpcFormSubmit);



// functionality for the FORM for creating a new game 
const handleGameFormSubmit = event => {
  event.preventDefault();
  
  //get the Game data and organize it
  const gameName = $gameForm.querySelector('[name="game-name"]').value;
  const releaseYear = parseInt($gameForm.querySelector('[name="game-release-year"]').value);
  const favoriteNpc = $gameForm.querySelector('[name="favorite-npc"]').value;
  
  const gameObj = { gameName, releaseYear, favoriteNpc}
  console.log(gameObj);
  
  fetch('api/games', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameObj)
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    alert('Error: ' + response.statusText);
  }) 
  .then(postResponse => {
    console.log(postResponse);
    alert('You have added a new Game to your Catalogue!');
  });
};

$gameForm.addEventListener('submit', handleGameFormSubmit);