const router = require('express').Router();
const npcRoutes = require('../apiRoutes/npcRoutes');


// this way, we're using apiRoutes/index.js as a central hub
// for all routing functions we may want to add to the application
router.use(npcRoutes);

module.exports = router;