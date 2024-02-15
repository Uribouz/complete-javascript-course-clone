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
    console.log(data);

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
    countriesContainer.style.opacity = 1;
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
        console.log(this.responseText.data);
    
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
getCountryAndNeighbour('usa');
// getCountryAndNeighbour('germany');
