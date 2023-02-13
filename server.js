// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const EXPRESS = require('express');

//Require body-parser to ...
const BODY_PARSER = require('body-parser');

// Start up an instance of app
const APP = EXPRESS();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

// Cors for cross origin allowance
const CORS = require('cors');
APP.use(CORS());

// Initialize the main project folder
APP.use(EXPRESS.static('website'));

// Setup Server

const PORT = 8000;
activate = () => {console.log(`Server running on localhost: port ${PORT}`)};
const SERVER = APP.listen(PORT, activate);

