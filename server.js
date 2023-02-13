// project endpoint as the center of the process
projectData = {};

// Require Express to run server and routes
const EXPRESS = require('express');

//Require the dependency (body-parser)
const BODY_PARSER = require('body-parser');

// Start up an instance of app
const APP = EXPRESS();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

// Cors for cross origin allowance
const CORS = require('cors');
const { application, response } = require('express');
APP.use(CORS());

// Initialize the main project folder
APP.use(EXPRESS.static('website'));

// Setup Server with the port: 8000 and activation check function
const PORT = 8000;
let activate = () => console.log(`Server running on localhost: port ${PORT} \nGo to http://localhost:${PORT}`);
const SERVER = APP.listen(PORT, activate);


// Callback function for the `GET` route that sends the projectData object endpoint to the front app. 
let sendData = (req, res) => res.send(projectData);

// Callback function fot the `POST` route that grape data from the front.
let postDataObj = (req, res) => {
    // The Temprature from weather map API.
    let currentTemp = req.body.temp;
    
    // The current date of generating content.
    let currentDate = req.body.date;
    
    // User's feelings.
    let currentContent = req.body.content;
    
    // Assign properties to the endpoint object.
    projectData = {
        temp : currentTemp,
        date : currentDate,
        content : currentContent
    };
    res.send(projectData);
};

//The `GET` route. 
APP.get('/weatherData', sendData);

//The `POST` route.
APP.post('/saveData', postDataObj);