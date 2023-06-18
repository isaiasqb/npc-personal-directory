const router = require('express').Router();
const npcRoutes = require('../apiRoutes/npcRoutes');
const gameRoutes = require("../apiRoutes/gameRoutes") 


// this way, we're using apiRoutes/index.js as a central hub
// for all routing functions we may want to add to the application
router.use(npcRoutes);
router.use(gameRoutes);

module.exports = router;