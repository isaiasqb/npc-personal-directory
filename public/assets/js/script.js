const $npcForm = document.querySelector('#npc-form');

const handleNpcFormSubmit = event => {
  event.preventDefault();

  // get npc data and organize it
  const name = $npcForm.querySelector('[name="npc-name"]').value;
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
  const npcObject = { name, race, location, personalityTraits };

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
