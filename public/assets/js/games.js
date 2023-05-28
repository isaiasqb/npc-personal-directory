const $displayArea = document.querySelector('#display-area');

const printResults = resultArr => {
  console.log(resultArr);

  const npcHTML = resultArr.map(({ id, name, platform, releaseYear, mainNpc }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <h5 class="text-secondary">Released: ${releaseYear}</h5>
      <p>Platform: ${platform}<br/>
      Main NPC: ${mainNpc.substring(0, 1).toUpperCase() +
        mainNpc.substring(1)}<br/>
      </p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = npcHTML.join('');
};

const getGames = () => {
  fetch('/api/games')
    .then(response => {
      if (!response.ok) {
        return alert('Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(gamesArr => {
      console.log(gamesArr);
      printResults(gamesArr);
    });
};

getGames();
