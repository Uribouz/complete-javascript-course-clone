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

getCountryData('australia');