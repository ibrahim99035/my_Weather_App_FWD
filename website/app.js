/* Global Variables */
// The base API to make all requeste using zip code and my own API key. 
const API_BASE = 'https://api.openweathermap.org/data/2.5/forecast?zip=';

// My own API key :)
const API_KEY = '&appid=92ee75ac2c3cec25ce8569734c7f9afb&units=imperial';

// Three constants global variables for HTML divs that holds the dynamic data (data - temp - content).
const DATE_DIV = document.getElementById('date');
const TEMP_DIV = document.getElementById('temp');
const CONT_DIV = document.getElementById('content');

// Input field fro ZIP code.
const ZIP_INPUT = document.getElementById('zip');

// textarea field for the user to enter his current mode feeling.
const FEELINGS = document.getElementById('feelings');

// The button generate that starts the action for our processes.
const GENERATE_BTN = document.getElementById('generate');

// Create a new date instance dynamically with JS
let myDate = new Date();
let newDate = `${myDate.getMonth()}/${myDate.getDate()}/${myDate.getFullYear()} in ${myDate.getHours()}:${myDate.getMinutes()}`;

// Callback function for the envent listener on the button with `click`.
let handleGenerate = () => {
    let enteredZip = ZIP_INPUT.value;
    let enteredfeelings = FEELINGS.value;

    // Call the function that gets weather temprature data from the API. 
    weatherResultGenerate(API_BASE, enteredZip, API_KEY).then((data) => {
        // then create the required object to post it to the server through `POST` route.
        entryObj = {
            date : newDate,
            temp: data.list[0].main.temp,
            content: enteredfeelings
        };
        postDataToServer('/saveData', entryObj);

        // Update the UI according to the dynamic data after clicking on generate button.
        dynmaicUI_Update();
    })
};

// add the listener to `click` event to generate button.
GENERATE_BTN.addEventListener('click', handleGenerate);

// Show teh catched error from every try/catch exception.
let showError = (error) => console.log(`There is an error: ${error}`);

/* Start: Asynchrounous functions */

// Asynchrounous function that fetch weather map API.
/* It takes 3 parameters :
    - the base URL.
    - the zip code.
    - the personal API key.
*/
let weatherResultGenerate = async(base, zip, key) => {
    // generate the API call and fetch it. 
    let apiFetch = `${base}${zip}${key}`;
    let myResponse = await fetch(apiFetch);

    try{
        let currentData = await myResponse.json();
        return currentData;

    } catch(error){
        showError(error);
    }
};

/* post the oblect data to the server on the POST route (/saveData),
    it takes the /saveData URL and the data object as parameter.
*/ 
let postDataToServer = async(url = '', data = {}) => {

    // prepare JSON to be in JS object.
    let userResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // return the data  from fetch.
    try{
        let myData = await userResponse.json();
        return myData;

    } catch(error){
        showError(error);
    }
};

// get the data from the endpoint through the GET route to update the page UI with the dynamic data.
let dynmaicUI_Update = async() => {
    // fetch data from GET route.
    let userRequest = await fetch('/weatherData');

    try{
        // data container.
        let container = await userRequest.json();

        // our dynamic generated lines.
        let date_line = `Request date : ${container.date}`;
        let temp_line = `The tempreature now is : ${container.temp}`;
        let content_line = `Your Feelings is : ${container.content}`;

        // apply changes to div elements in HTML.
        DATE_DIV.innerHTML = date_line;
        TEMP_DIV.innerHTML = temp_line;
        CONT_DIV.innerHTML = content_line;
    } catch(error){
        showError(error);
    }
};

/* End: Asynchrounous functions */