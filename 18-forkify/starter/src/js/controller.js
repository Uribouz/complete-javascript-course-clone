//* Do this to support old browser (polyfilling)
import 'core-js/stable'; //Polyfilling async await
import 'regenerator-runtime/runtime'; //Polyfilling promise

import {MODAL_CLOSE_SEC} from './config.js';
import * as model from './model.js';
import recipeView from './views/receipeView.js'
import searchView from './views/searchView.js';
import resultView from './views/resultView.js'
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// * This code let parcel no to reload the runningn website everytime we save a file.
// if (module.hot) {
//     module.hot.accept();
// }

const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        recipeView.renderSpinner();

        // 0) Update results view to mark selected search result
        resultView.update(model.getSearchResultsPage())
        // debugger;
        bookmarksView.update(model.state.bookmarks);

        // 1) Loading the recipe
        await model.loadRecipe(id);
        
        // 2) Rendering the recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        console.error(err)
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
        resultView.render(model.getSearchResultsPage());

        // 4) Render Pagination buttons
        paginationView.render(model.state.search);

    } catch (err) {
        console.error(err);
    }
}

const controlPagination = function(goToPage) {
    // 1) Render results
    resultView.render(model.getSearchResultsPage(goToPage));
    
    // 2) Render NEW Pagination buttons
    paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
    //Update the recipe servings (in state)
    model.updateServings(newServings);
    //Update the recipeView
    recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
    // 1) Add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else if (model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id);

    // 2)) Update reipe view
    recipeView.update(model.state.recipe);

    // 3) Render bookmarks
    bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
    bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
    //Uplaod the new recipe data
    try {
        //Show loading spinner
        addRecipeView.renderSpinner();

        await model.uploadRecipe(newRecipe);

        //Render recipe
        recipeView.render(model.state.recipe);

        //Success message
        addRecipeView.renderMessage();

        //Close form window
        setTimeout(function() {
            addRecipeView.toggleWindow()
        }, MODAL_CLOSE_SEC * 1000)

        // Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`)
        
        // Going back to last page
        // window.history.back();

        // Render bookmark view
        bookmarksView.render(model.state.bookmarks);
    } catch(err) {
        console.error('💥', err);
        addRecipeView.renderError(err.message);
    }
}

//* Publisher subscriber patterns.
const init = function() {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();