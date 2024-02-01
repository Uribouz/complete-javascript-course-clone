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

//Chapter 238: Refactoring
class App {
    constructor() {
        this._getPosition();

        /* 
        * Use method "bind(this)" to pass 'this' from 
        * the app class to inside of the function handler. */
        form.addEventListener('submit', this._newWorkout.bind(this))
        
        inputType.addEventListener('change', this._toggleElevationField );        
    }
    #map;
    #mapEvent;
    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                /* 
                * In regular function call such as handler function
                * 'this' keywork is set to 'undefined'
                */
                // ! this._loadMap,
                /* 
                * Use method "bind(this)" to pass 'this' from 
                * the app class to inside of the function handler. */
                this._loadMap.bind(this),
                function() {
                    alert('Could not get your position.')
            })
    }

    _loadMap(position) {
        const {latitude} = position.coords
        const {longitude} = position.coords
        console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
        console.log(this);
        const coords = [latitude, longitude]
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        /* 
        * Use method "bind(this)" to pass 'this' from 
        * the app class to inside of the function handler. */
        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden')
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        // ! Default behavior of 'submit' is reloading the page.
        // * We need to prevent it.
        e.preventDefault();
        console.log(this)
    
        // Clear input fields
        inputDistance.value = '';
        inputDuration.value = '';
        inputCadence.value = '';
        inputElevation.value = '';
    
        //Display marker
        const {lat, lng} = this.#mapEvent.latlng
        L.marker({lat, lng})
            .addTo(this.#map)
                .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup',
                })
            )
            .setPopupContent('Workout')
            .openPopup();
    }
}

const app = new App();


//Chapter 239: Managing workout data
class Workout {

    date = new Date();

    // * Create Unique ID 
    // ! (Never do this in real applications, instead use 3rd party library.)
    id = (Date.now() + '').slice(-10); 

    constructor(coords, distance, duration) {
        // this.date = ...
        // this.id = ...
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }
    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }
    calcSpeed() {
        // km/hour
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

// Just for testing
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);
