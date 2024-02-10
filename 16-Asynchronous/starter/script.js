'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//chapter 247:

//Examples

const img = document.querySelector('.dog'); //Synchronous #1
img.src = 'dog.jpg' //Asynchronous (#4)
img.addEventListener('load', function() { //Synchronous #2
    img.classList.add('fadeIn'); //Non-Asycnchronous, Just wait for the event to happen
});
p.style.width = '300px'; //Synchronous #3