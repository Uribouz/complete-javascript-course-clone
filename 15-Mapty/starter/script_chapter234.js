'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


//Chapter 232: How to plan a web project

/*
*   1. User Stories: Description of the application's functionality from the user's perspective
*   Common format: As a [type of user], I want [an action] so that [a benefit]
*                   Who? What? and Why?
*       
*       1) As a user, I want to log my running workouts with location, distinace, time, pace and
*   step/minute, so I can keep a log of all my running.
*       2) As a user, I want to log my cycling workouts with location, distance, time, speed and
*   elevation gain, so I can keep a log of all my cycling.
*       3) As a user, I want to see all my workouts at a glance, so I can easily track my progress
*   over time.
*       4) As a user, I want to see my workouts on a map, so I can easily check where I work out the most
*       5) As a user, I want to see all my workouts when I leave the app and come back later, so that
*   I can keep using the app over time.
*
*
*   2. Features:
*       1) Log my running workouts with location, distance, time, pace and step/minute
*           -> Map where user clicks to add new workout  (best way to get location coordinates)
*           -> Geolocation to display map at the current location (more user friendly)
*           -> Form to input distance, time, pace, steps/minute
*       2) Log my cycling workouts with location, distance, time, speed and elevation gain.
*           -> Form to input distance, time, speed, elevation gain
*       3) See all my workouts at a glance
*           -> Display all workouts in a list
*       4) See my workouts on a map
*           -> Display all workouts on the map
*       5) See all my workouts when I leave the app and come back later
*           -> Store workout data in the browser using local storage API
*           -> On page load, read the saved data from local storage and dislay.
*
*
*   3. Flowchart
*       View in file "Mapty-flowchart-chapter232.png"
*
*
*   
*   4. Archecture
*       ... For now let's just start coding ....
*       will come back for this later.
*
*/

//Chapter 233 & 234
if (navigator.geolocation)
navigator.geolocation.getCurrentPosition(
 function(position) {
    const {latitude} = position.coords
    const {longitude} = position.coords
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude]
    var map = L.map('map').setView(coords, 13);

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
}, function() {
    alert('Could not get your position.')
})
