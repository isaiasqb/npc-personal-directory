const path = require('path');
const router = require('express').Router();

// GET request to create the root route of the server! This is the route used to create a HOMEPAGE for a server.
// the respond is an HTML page to display in the browser. Instead of res.json(), we're using res.sendFile()
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// GET request to create the NPCs html page.
router.get('/npcs', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/npcs.html'))
});

// GET request to create the GAMES html page.
router.get('/games', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/games.html'))
});

// Wildcard HTML page
// The * route should always come last. Otherwise, it will take precedence
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;