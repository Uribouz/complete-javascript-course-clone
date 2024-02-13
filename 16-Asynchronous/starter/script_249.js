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

//Old way to use APIs
const getCountryData = function (country) {

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
        console.log(data);

        const html = `
            <article class="country">
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
    })
}

getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');