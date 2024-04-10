//* Do this to support old browser (polyfilling)
import 'core-js/stable'; //Polyfilling async await
import 'regenerator-runtime/runtime'; //Polyfilling promise

import * as model from './model.js';
import recipeView from './views/receipeView.js'

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log('TEST');

const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);
        console.log(id) 

        if (!id) return;
        recipeView.renderSpinner();

        // 1) Loading the recipe
        await model.loadRecipe(id);
        
        // 2) Rendering the recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        console.log('Error here');
        alert(err);
    }
}

const events = ['hashchange', 'load']
events.forEach( ev => 
    window.addEventListener(ev, controlRecipes)
);


