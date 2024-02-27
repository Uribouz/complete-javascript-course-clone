'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//chapter 247:

//Examples

/*
const img = document.querySelector('.dog'); //Synchronous #1
img.src = 'dog.jpg' //Asynchronous (#4)
img.addEventListener('load', function() { //Synchronous #2
    img.classList.add('fadeIn'); //Non-Asycnchronous, Just wait for the event to happen
});
p.style.width = '300px'; //Synchronous #3
*/


//Chapter 249: First AJAX call 'XMLHttpRequest'

//API URL:
// https://restcountries.com/
// https://countries-api-836d.onrender.com/countries/


const renderCountry = function(data, className = '') {
    // console.log(data);

    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('beforeEnd', html);
}

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeEnd', msg);
}

//Chapter 251: Welcome to Callback Hell
const getCountryAndNeighbour = function (country) {

    //Old way to use APIs, AJAX calls
    const request = new XMLHttpRequest();
    request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);

    /* 
    ! Cannot do it like this, beacuse request send is asynchronous call
    ** const data = request.send();
    ** console.log(request.responseText);
    */

    request.send();

    request.addEventListener('load', function() {
        // console.log(this.responseText.data);
    
        const [data] = JSON.parse(this.responseText);

        //Render Country 1
        renderCountry(data);
       
        //Get neighbour countries 2
        const neighbour = data.borders?.[0]; //Only get first neighbour
        if(!neighbour) return;

        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
        request2.send();
        
        request2.addEventListener('load', function() {
            const data2 = JSON.parse(this.responseText);
            // console.log(data2);
            //Render Country 2
            renderCountry(data2, 'neighbour');
        });
    })
}

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('germany');


//chapter 252: promise

/* Old Way to get data from API
// const request2 = new XMLHttpRequest();
// request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
// request2.send();
*/

// * Modern Way to get data from API
/*
* Promise: an object that is used as a placeholdeer for the future result of an asynchronous operation.

* A Container for an asynchronously delivered value.

* A container for a future value (Examples: response from AJAX call)

 Pros:
 - We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.
 - Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell.

 Promises Lifecycle
 - Pending: Before the future value is available
    - change state to 'Settled' when asynchronous task has finished
 - Settled: 
    - FULFILLED: Success, the value is now available
    or
    - REJECTED: An error happended

    We are able to handle these diferent states in our code!

    A. Build Promise = fetch() function
    B. Consume Promise: when we already have a promised, a response return from an API.

 */

/*
const request = fetch('https://countries-api-836d.onrender.com/countries/name/portugal')
console.log(request);
*/


//Chapter 253: Consume Promise
/* Debug version ...
const getCountryData = function(country) {
    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`).then(
        function(response) {
            console.log(response);
            return response.json()
        }
    ).then(function(data) {
        console.log(data);
        renderCountry(data[0])
    })
}
*/

//Chapter 254: Chaining Promises
/*
const getCountryData = function(country) {
    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`
    ).then(response => response.json()
    ).then(data => {
        renderCountry(data[0])
        const neighbour = data[0].borders[0];

        if (!neighbour) return;

        //Country 2
        // return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${country}`)
        return 23;
    }).then(data => alert(data))
}
*/
//! Dont do it like this, this is Callback Hell
/*const getCountryData = function(country) {
    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`
    ).then(response => response.json()
    ).then(data => {
        renderCountry(data[0])
        const neighbour = data[0].borders[0];

        if (!neighbour) return;

        //Country 2
        return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'))
    })
}*/

//* Return value in 'then' method always return as a promise containing that return value.

// ? Not good ways to catch errors
/*
const getCountryData = function(country) {
    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`
    ).then(
        response => response.json(),
        err => alert(err) // ! Handling errors
    ).then(data => {
        renderCountry(data[0])
        const neighbour = data[0].borders[0];

        if (!neighbour) return;

        //Country 2
        return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
    }).then(
        response => response.json(),
        err => alert(err) // ! Handling errors
    )
    .then(data => renderCountry(data, 'neighbour'))
}
*/

//Chapters 256: Handle errors
const getJSON = function(url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response =>{
        if (!response.ok) 
            throw new Error(`${errorMsg} ${response.status}`);

        return response.json()
    });
}

// * Great ways to catch errors
const getCountryData = function(country) {
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`, 'Country not found')
    .then(data => {
        renderCountry(data[0])
        const neighbour = data[0].borders[0];

        if (!neighbour) 
            throw new Error(`No neighbour fonud!`);

        //Country 2
        return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
         // * Great way to catch an error from all asynchronous calls.
        console.error(`${err} 💥💥💥`)
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
        // Commonly use this when to hide loading spinner when loading has finished.
        countriesContainer.style.opacity = 1;
    })
}

btn.addEventListener('click', function() {
    getCountryData('germany');
})

// getCountryData('australia');


///////////////////////////////////////
// Chapter 257: Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) 
and a longitude value (lng) (these are GPS coordinates, examples are below).

2. Do 'reverse geocoding' of the provided coordinates. 
Reverse geocoding means to convert coordinates to a meaningful location,
 like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json.
 Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, 
 that is cheating 😉

 https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en

3. Once you have the data, take a look at it in the console to see all the attributes 
that you recieved about the provided location. Then, using this data, log a messsage 
like this to the console: 'You are in Berlin, Germany'

4. Chain a .catch method to the end of the promise chain and log errors to the console

5. This API allows you to make only 3 requests per second. 
If you reload fast, you will get this error with code 403. 
This is an error with the request. Remember, fetch() does NOT reject the promise in this case.
 So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. 
So take the relevant attribute from the geocoding API result, 
and plug it into the countries API that we have been using.

7. Render the country and catch any errors, just like we have done in the last lecture
 (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

function whereAmI(lat, lng) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
    .then(response =>  {
        // console.log(response);
        if (!response.ok) {
            throw new error(`cannot fetch data, error status ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        // console.log(data);
        console.log(`You are in ${data.city}, ${data.countryName}.`);
        return fetch(`https://countries-api-836d.onrender.com/countries/name/${data.countryName}`)
    })
    .then(response =>{
        if (!response.ok) 
            throw new Error(`Country not found ${response.status}`);
        return response.json()
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
        console.log(`Cannot fetch data, ${err}`);
    })
    .finally(() => {
        // Commonly use this when to hide loading spinner when loading has finished.
        countriesContainer.style.opacity = 1;
    })
};




/*
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
*/
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);


/* Chapter 258: How can asynchronous code be executed in a non-blocking way,
** if there is only one thread of execution in the engine ?
*/
// A. Call Stack
//  = Main thread of javascript engine
// B. Callback Queue
//  = Todo list of javascript engine, will be put to 'Call Stack'
// C. Even Loop
//  = Decided who in 'Callback Queue' gonna be put to 'Call Stack' (Orchestration)
// D. WEB APIs
//  = where asyncronous tasks run
// E. Microtasks Queue
//  = Like callback queue, but for backkbacks related to promised.
//  Has priority over callback queue!



// Example Code
el = document.querySelector('img');
//1. -> Loading in 'WEB APIs'
el.src = 'dog.jpg';  
//2. -> Register 'Callback' to the 'WEB APIs' envionment
el.addEventListener('load', () => { 
    el.classList.add('fadeIn');
})
//3. When 'WEB APIs' finished loading, Callback function will be put to 'Callback Queue'
//4. Event loop put the callback function to the main 'Call Stack'

//5. Register 'Callback'(console.log(res)) to the 'WEB APIs' envionment
fetch('https://someurl.com/api').then(res => console.log(res));
//6. When 'WEB APIs' finished loading, Callback function will be put to 'Microtasks Queue'
//7. Event Loop has priority to get the function from 'Microtasks Queue'
// and put callback function to the main 'Call Stack'
// (Event loop will try to empty 'Microtasks Queue' first, before looking at 'Callback Queue')