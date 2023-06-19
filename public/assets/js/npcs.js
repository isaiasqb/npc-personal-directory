const $npcForm = document.querySelector('#npcs-form');
const $displayArea = document.querySelector('#display-area');

const printResults = resultArr => {
  console.log(resultArr);

  const npcHTML = resultArr.map(({ id, name, personalityTraits, race, location }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>race: ${race.substring(0, 1).toUpperCase() + race.substring(1)}<br/>
      location: ${location.substring(0, 1).toUpperCase() + location.substring(1)}<br/>
      Personality Traits: ${personalityTraits
        .map(trait => `${trait.substring(0, 1).toUpperCase() + trait.substring(1)}`)
        .join(', ')}</p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = npcHTML.join('');
};



//function to capture the request parameters when looking for an npc capable of making 2 types of request
//  1 - No parameteras added will get = /api/npcs
// 2 - Parameters form the form will turn into an object and be passed as query parameters
const getNpcs = (formData = {}) => {
  let queryUrl = '/api/npcs?';

  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  console.log(queryUrl);

  //FETCH request
  //example: /api/npcs?personalityTraits=anxious&location=mordor
  fetch(queryUrl) 
  .then(response => {
    if (!response.ok) {
      return alert("Error " + response.statusText);
    }
    return response.json();
  })
  .then(npcData => {
    console.log(npcData);
    printResults(npcData);
  })
};



const handleGetNpcsSubmit = event => {
  event.preventDefault();
  const raceRadioHTML = $npcForm.querySelectorAll('[name="race"]');
  let race;

  for (let i = 0; i < raceRadioHTML.length; i += 1) {
    if (raceRadioHTML[i].checked) {
      race = raceRadioHTML[i].value;
    }
  }

  if (race === undefined) {
    race = '';
  }

  const personalityTraitArr = [];
  const selectedTraits = $npcForm.querySelector('[name="personality"').selectedOptions;

  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraitArr.push(selectedTraits[i].value);
  }

  const personalityTraits = personalityTraitArr.join(',');

  const npcObject = { race, personalityTraits };

  getNpcs(npcObject);
};

$npcForm.addEventListener('submit', handleGetNpcsSubmit);

getNpcs();
