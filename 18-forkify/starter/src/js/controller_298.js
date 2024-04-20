//* Do this to support old browser (polyfilling)
import 'core-js/stable'; //Polyfilling async await
import 'regenerator-runtime/runtime'; //Polyfilling promise

import * as model from './model.js';
import recipeView from './views/receipeView.js'
import searchView from './views/searchView.js';
import resultView from './views/resultView.js'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
    module.hot.accept();
}

const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);
        // console.log(id) 

        if (!id) return;
        recipeView.renderSpinner();

        // 1) Loading the recipe
        await model.loadRecipe(id);
        
        // 2) Rendering the recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        // console.log(`got error ${err}`)
        recipeView.renderError()
    }
}

const controlSearchResults = async function() {
    try {
        resultView.renderSpinner();
        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResult(query);

        // 3) Render results
        console.log(model.state.search);
        resultView.render(model.state.search.results);
    } catch (err) {
        console.log(err);
    }
}

// controlSearchResults();
//Chapter 295: Publisher-Subscriber pattern.
const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
}
init();