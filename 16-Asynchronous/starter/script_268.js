'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images')

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
    countriesContainer.style.opacity = 1;
}

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeEnd', msg);
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

// btn.addEventListener('click', function() {
//     getCountryData('germany');
// })

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


/*
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
*/
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);


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


/*
        / Example Code
    const el = document.querySelector('img');
        / 1. -> Loading in 'WEB APIs'
    el.src = 'dog.jpg';  
        / 2. -> Register 'Callback' to the 'WEB APIs' envionment
    el.addEventListener('load', () => { 
        el.classList.add('fadeIn');
    })
        / 3. When 'WEB APIs' finished loading, Callback function will be put to 'Callback Queue'
        / 4. Event loop put the callback function to the main 'Call Stack'

        / 5. Register 'Callback'(console.log(res)) to the 'WEB APIs' envionment
    fetch('https://someurl.com/api').then(res => console.log(res));
        / 6. When 'WEB APIs' finished loading, Callback function will be put to 'Microtasks Queue'
        / 7. Event Loop has priority to get the function from 'Microtasks Queue'
        / and put callback function to the main 'Call Stack'
        / (Event loop will try to empty 'Microtasks Queue' first, before looking at 'Callback Queue')
*/

//Chapter 259: The Event Loop in practice

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//     for (let i = 0; i < 1000000000; i++) {}
//     console.log(res)
// });
// console.log('Test End');

/* Results

Test Start
script.js:388 Test End
script.js:383 Resolved promise 1
script.js:386 Resolved promise 2
script.js:382 0 sec timer

*/
// * Becareful when using Promise it can delayed another callback functions.

//Chapter 260: Building a simple promise

// const lotteryPromise = new Promise(function(resolve, reject) {
//     console.log('Lottery draw is happening 🔮')
//     setTimeout(function() {
//         if (Math.random() >= 0.5) {
//             resolve('You WIN 💰');
//         }
//         reject(new Error('You lost your money 💩'));
//     }, 2000)
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// ! Bad practice using timeout chained.
// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//       console.log('2 seconds passed');
//       setTimeout(() => {
//         console.log('3 second passed');
//         setTimeout(() => {
//           console.log('4 second passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);

// Promisifying setTimeout
const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds*1000)
    })
};
// wait(1).then(() => { 
//     console.log('1 seconds passed');
//     return wait(1);
// }).then(() => {
//     console.log('2 seconds passed')
//     return wait(1);
// }).then(() => {
//     console.log('3 seconds passed')
//     return wait(1);
// }).then(() => {
//     console.log('4 seconds passed')
// })


// //Immediately happens
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));




///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const createImage = function(imgPath) {
//     return new Promise(function(resolve, reject) {
//         const el = document.createElement('img')
//         el.src = imgPath
//         el.addEventListener('load', function() {
//             // images.insertAdjacentElement('beforeEnd', el)
//             images.append(el)
//             resolve(el)
//         });
//         el.addEventListener('error', function(error) {
//             reject(new Error ('Image not found ' +error))
//         });
//     })
// }
// let currentImage
// createImage('./img/img-1.jpg')
// .then(el => {
//     currentImage = el
//     return wait(2)
// }).then(() => {
//     currentImage.style.display = "none";
//     return createImage('./img/img-2.jpg')
// }).then(el => {
//     currentImage = el
//     return wait(2)
// }).then(() => {
//     currentImage.style.display = "none"
// }).catch( err => console.error(err))


//Chapter 263: Consuming promise with 'Async/Await'


// console.log('Getting position');

const getPosition = function() {
    return new Promise(function(resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position), 
        //     err => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(
            resolve, reject
        );
    })
}

// ! Old way of using Promise
// function whereAmI(lat, lng) {
//     getPosition().then(pos => {
//         const { latitude: lat, longitude: lng} = pos.coords;
//         return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`) 
//     })
//     .then(response =>  {
//         // console.log(response);
//         if (!response.ok) {
//             throw new error(`cannot fetch data, error status ${response.status}`);
//         }
//         return response.json()
//     })
//     .then(data => {
//         // console.log(data);
//         console.log(`You are in ${data.city}, ${data.countryName}.`);
//         return fetch(`https://countries-api-836d.onrender.com/countries/name/${data.countryName}`)
//     })
//     .then(response =>{
//         if (!response.ok) 
//             throw new Error(`Country not found ${response.status}`);
//         return response.json()
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//         console.log(`Cannot fetch data, ${err}`);
//     })
//     .finally(() => {
//         // Commonly use this when to hide loading spinner when loading has finished.
//         countriesContainer.style.opacity = 1;
//     })
// };


//Chapter 264: Error handling with try-catch
//Example
/*
try {
    let  y=1;
    const x = 2;
    x = 3;
} catch (err) {
    alert(err.message);
}
*/

// * Better way of using Promise (Async/Await)
const whereAmI = async function() {
    try {
        const pos = await getPosition();
        const { latitude: lat, longitude: lng} = pos.coords;
        const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`) 
        if (!resGeo.ok) throw new Error ('Problem getting location data');

        const dataGeo = await resGeo.json();
        console.log(`You are in ${dataGeo.city}, ${dataGeo.countryName}.`);

        //! Test invalid url
        // const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName1}`);
        const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName}`);
        if (!res.ok) throw new Error ('Problem getting country');
        const data = await res.json();
        console.log(data);
        renderCountry(data[0]);
        return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
    } catch (err) {
        console.error(err);
        renderError(`💥${err.message}`);
        throw err;
    }
};

//Chapter 265: Returning values from async function.
// console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);

// ! Bad way to handle return value from async function
// whereAmI()
// .then(city => console.log(`2: ${city}`))
// .catch(err => console.error(`2: ${err.message} 💥`))
// .finally(() => console.log(`3. Finished getting location`));

// * Better way to handle return value from async function.
// (async function() {
//     try {
//         const res = await whereAmI();
//         console.log(`2: ${res}`)
//     } catch (err) {
//         console.error(`2: ${err.message} 💥`)
//     }
//     console.log(`3. Finished getting location`);
// })();


//Chapter 266: Running promises in parallel
const get3Countries = async function(c1, c2, c3) {
    try {
        // ! These promises are not dependent on each other (Bad solution).
        // const [data1] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`);
        // const [data2] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`);
        // const [data3] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`);
        // console.log([data1.capital, data2.capital, data3.capital]);
        

        // * Use Promise.all() instead to handle multiple promises
        //* But if one of the promise is rejected, all promises will be rejected
        const data = await Promise.all([
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`)
        ]);
        console.log(data.map(d => d[0].capital));
    } catch (err) {
        console.error(err);
    }
};
// get3Countries('portugal', 'canada', 'tanzania');



//Chapter 267: Other Promise Combinations: race, allSettled and any
(async function() {
    const res = await Promise.race([
        getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
    ]);
    console.log('Promise.race example');
    console.log(res[0]);
})();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('Request took too long!'));
        }, sec * 1000);
    });
};

//* Race is useful when you want to set a timeout of a request just like this !!!
// Promise.race([
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/tanzania`),
//     timeout(0.1),
// ])
// .then (res => {
//     console.log('Promise.race...')
//     console.log(res[0])
// })
// .catch (err => {
//     console.log('Promise.race...')
//     console.error(err)
// })

//* Allsettled will return all promises as fulfiled promise.
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
.then (res => {
    console.log('Promise.allSettled...')
    console.log(res)
})
.catch (err => {
    console.log('Promise.allSettled...')
    console.error(err)
})

//* Promise.all if any promise is rejected, will return the first rejected promise
// Promise.all([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Another success'),
// ])
// .then (res => {
//     console.log('Promise.all...')
//     console.log(res)
// })
// .catch (err => {
//     console.log('Promise.all...')
//     console.error(err)
// })

//* Promise.any if any promise is fulfilled, will return the first fulfilled promis. 
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
.then (res => {
    console.log('Promise.any...')
    console.log(res)
})
.catch (err => {
    console.log('Promise.any...')
    console.error(err)
})

/* 
Chapter 268: Coding Challenge #3
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
*/

const createImage = function(imgPath) {
    return new Promise(function(resolve, reject) {
        const el = document.createElement('img')
        el.src = imgPath
        el.addEventListener('load', function() {
            // images.insertAdjacentElement('beforeEnd', el)
            images.append(el)
            resolve(el)
        });
        el.addEventListener('error', function(error) {
            reject(new Error ('Image not found ' +error))
        });
    })
}
// let currentImage
// createImage('./img/img-1.jpg')
// .then(el => {
//     currentImage = el
//     return wait(2)
// }).then(() => {
//     currentImage.style.display = "none";
//     return createImage('./img/img-2.jpg')
// }).then(el => {
//     currentImage = el
//     return wait(2)
// }).then(() => {
//     currentImage.style.display = "none"
// }).catch( err => console.error(err))

const loadNPause = async function() {
    try {
        let img = await createImage('./img/img-1.jpg');
        await wait(2);
        img.style.display = "none";
        img = await createImage('./img/img-2.jpg');
        await wait(2);
        img.style.display = "none";
    } catch (err) {
        console.error(err)
    }
}
// loadNPause();

/*
Chapter 268: Coding Challenge #3 
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const loadAll = async function(imgArr) {
    try {
        let imgs = imgArr.map(async d => await createImage(d))
        console.log(imgs)
        const imgEl = await Promise.all(imgs)
        imgEl.forEach(each => each.classList.add('parallel'))
    } catch (err) {
        console.error(err);
    }
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
