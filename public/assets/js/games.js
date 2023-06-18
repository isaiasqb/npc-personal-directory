const $displayArea = document.querySelector('#display-area');
const $gamesForm = document.querySelector("#games-form");

const printResults = resultArr => {
  console.log(resultArr);

  const npcHTML = resultArr.map(({ id, name, platform, releaseYear, favoriteNpc }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <h5 class="text-secondary">Released: ${releaseYear}</h5>
      <p>Platform: ${platform}<br/>
      Favorite NPC: ${favoriteNpc.substring(0, 1).toUpperCase() +
        favoriteNpc.substring(1)}<br/>
      </p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = npcHTML.join('');
};


// take the values from game.html seach form  and pass them as an object to getGames()
const handleGetGamesSubmit = event => {
  event.preventDefault();

  const nameHTML = $gamesForm.querySelector('[name="name"]');
  const name = nameHTML.value;

  const ageHTML = $gamesForm.querySelector('[name"release-year"]');
  const age =ageHTML.value;

  const gameObject = { name, age };

  getGames(gameObject)
}

// submit serach button functionality
$gamesForm.addEventListener('submit', handleGetGamesSubmit);



const getGames = (formData = {}) => {
  let queryUrl = '/api/games?';

  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        return alert(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(gamesArr => {
      console.log(gamesArr);
      printResults(gamesArr);
    });
};

getGames();


