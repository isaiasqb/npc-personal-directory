const fs = require('fs');
const path = require('path');
const express = require('express');
const { npcs } = require('./data/npcs.json')

// The require() statements will read the index.js files in the directories. 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

//Heroku apps get served using port 80. here we are telling tell our app to use an environment variable.
// When Heroku runs the app, it sets an environment variable called process.env.PORT. 
//here we tell our app to use that port, if it has been set, and if not, default to port 3001.
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

//middleware to intercept data //takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object. 
//The extended: true option set inside the method call informs our server that there may be sub-array data nested in it as well,
// so it needs to look as deep into the POST data as possible to parse all of the data correctly. 
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
//takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object. 
app.use(express.json());

// Telling the server that any time a client navigates to:
//  <ourhost>/api >> the app will use the router we set up in apiRoutes.
// <ourhost>/ >> then the router will serve back our HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



//middleware for making static documents available
app.use(express.static('public'))


//tell server to listen for requests by chaining the listen() method this function should always come LAST
app.listen(PORT, () => {
  console.log('API server is ready and listening now on port 3001');
});