// import icons from '../img/icons.svg' //Parcel 1
import icons from 'url:../img/icons.svg' //Parcel 2

//* Do this to support old browser (polyfilling)
import 'core-js/stable'; //Polyfilling async await
import 'regenerator-runtime/runtime'; //Polyfilling promise



console.log(icons)
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = function(parentEl) {
    const markup = `
        <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div>
    `;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log('TEST');

//Chapter 289.
const showRecipe = async function(id) {
    try {
        if (!id) return;
        // 1) Loading the recipe
        renderSpinner(recipeContainer);

        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        )
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`)
        // console.log(res, data);
        let {recipe} = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        console.log(recipe);
        
        // 2) Rendering the recipe
        const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
            <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                </svg>
                </button>
            </div>
            </div>

            <div class="recipe__user-generated">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
            <button class="btn--round">
            <svg class="">
                <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(ing => {
                return `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
                </div>
            </li>`
            } ).join('')}
            </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
            </p>
            <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
            >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>
        `
        recipeContainer.innerHTML = '';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (err) {
        console.log('Error here');
        alert(err);
    }
}
// showRecipe('5ed6604591c37cdc054bc886')

//* Try install npm packages
// $ npm i core-js regenerator-runtime

//Chapter 291
const hashEvents = ['hashchange', 'load']
hashEvents.forEach(
    ev => window.addEventListener(ev, 
        _ => {
            console.log(window.location.hash) 
            const id = window.location.hash.slice(1); //id contains prefix '#' which we want to remove first.
            showRecipe(id)
        }
    )
);


//Chapter 292:
/*
    *Architecture:
        - Like a house, software needs a structure: the way we organize our code.

        - A project is never done!, We need to be able to easily change it in the future.

        - We also need to be able to easily add new features.

        - key focuses:
            - Maintainabilty
            - Structure
            - Expandability

        *Type of architectures:
            - We can use our own architecture. (in small projects)
            - We can use a well-established architecture pattern like MVC, MVP, Flux, etc.
            - We can use framework like 'React', 'Angular', 'Vue', 'Svelte, etc.

        *Components of any architecture:
            - Business Logic: 
                - Code that solves the actual business problem.
                - Directly related to what business does, and what it needs;
                - Example: sending messages, stroing transactions, calculating taxes;
            - State:
                - Essentially stores all the data about the application.
                - Should be the "single source of truth"
                - UI should be kept in sync with the state.
                - State libraries exists like 'Redux', 'Mobx'
                - Keeping in sync with 'Presentation Logic'
            - HTTP Library:
                - Responsible for making and receiving AJAX requests.
                - Optional but always necessary in real-world apps.
                - Examples: 'fetch' function
            - Application Logic (Router):
                - Code that is only concerned about the implementation of the application itself.
                - Handles navigation and UI events;
            - Presentation Logic (UI Layer);
                - Code that is concerned about the visible part of the application;
                - Essentially displays application state.
                - Keeping in sync with 'State'

        *The Model-View-Controller (MVC) architecture

            - Model
                - Business Logic
                - State
                - HTTP Library
                *- Model is standalone (Does not imported 'Controller'/'View')
            - Controller
                - Application Logic
                *- Bridge between model and views, orchestrating whole application.
            - View
                - Presentation Logic show to User
                *- View is standalone (Does not imported 'Controller'/'Model')
        
            *Flows
                1. Show UI to the user
                    - Views --display---> Users
                2. User interact with the UI, Controller handling an event from the user.
                    - User  --interact--> Controller
                3. Controller dispatch getting data to the 'Model' and transfer data to the 'View'
                    - Controller --request data--> Model
                    - Controller --notify data loading--> View
                    - Model --AJAX calls--> WEB API
                    - API --DATA--> Model
                    - Model --DATA--> Controller
                    - Controller --updated DATA--> View
                4. Views show updated UI to the user
                    - Views --display--> Users
    

*/