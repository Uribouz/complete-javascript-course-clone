import {API_URL,RES_PER_PAGE} from './config.js';
import {getJSON} from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        
        // console.log(res, data);
        const {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            bookmarked: state.bookmarks.some(bookmark => bookmark.id === id)
        };

        console.log(state.recipe); 
    } catch (err) {
        console.log(`cannot loadReceipe, ${err} 💥💥💥`);
        throw err;
    }
}

export const loadSearchResult = async function(query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`)
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        })
        state.search.page = 1;
    } catch (err) {
        console.log(`cannot loadReceipe, ${err} 💥💥💥`);
        throw err;
    }
}

export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;
    const start = (page-1) * state.search.resultsPerPage; // 0;
    const end = page*state.search.resultsPerPage // 10;

    return state.search.results.slice(start,end);
}

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings /state.recipe.servings;
        // newQt = oldQt * newServings/oldServings
    })
    state.recipe.servings = newServings;
    console.log('updateServings...'); 
    console.log(state.recipe); 
}

const persistBookmarks = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
    state.bookmarks.push(recipe);
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
}

export const deleteBookmark = function(id) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmarks();
}

const init = function() {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}
init();
// console.log(state.bookmarks);

const clearBookmarks = function() {
    localStorage.clear('bookmarks');
}
// clearBookmarks();