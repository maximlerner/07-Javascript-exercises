import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

// API: https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    // Here we remove the hash symbol attached to the id
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();

    // 1) update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 2 updating bookmarks view
    bookmarkView.update(model.state.bookmarks);

    // 3) Loading recipe
    await model.loadRecipe(id);

    // 4) Rendering recipe
    recipeView.render(model.state.recipe);
    
  } catch(err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    
    // 1) Get serch query
    const query = searchView.getQuery();
    if(!query) return;
    
    // 2) Load search results
    await model.loadSearchResults(query);
    
    // 3) Render results
    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    
    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

// showRecipe();

const controlPagination = (goToPage) => {
  // 3) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  
  // 4) Render new pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = (newServings) => {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  
  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = () => {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
}

const controlBookmarks = () => {
  bookmarkView.render(model.state.bookmarks)
}

// const controlAddRecipe = async function (newRecipe) {
//   try {
//     // Show loading spinner
//     addRecipeView.renderSpinner();

//     // Upload the new recipe data
//     await model.uploadRecipe(newRecipe);
//     console.log(model.state.recipe);

//     // Render recipe
//     recipeView.render(model.state.recipe);

//     // Success message
//     addRecipeView.renderMessage();

//     // Render bookmark view
//     bookmarksView.render(model.state.bookmarks);

//     // Change ID in URL
//     window.history.pushState(null, '', `#${model.state.recipe.id}`);

//     // Close form window
//     setTimeout(function () {
//       addRecipeView.toggleWindow();
//     }, MODAL_CLOSE_SEC * 1000);
//   } catch (err) {
//     console.error('💥', err);
//     addRecipeView.renderError(err.message);
//   }
// };

const controlAddRecipe = async function(newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`);
    // window.history.back;

    // Close form window
    setTimeout(() => {
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC * 1000)

  } catch (err) {
    addRecipeView.renderError(err.message);
  }

}

const init = () => {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
}
init();


// const del = async () => {
//   try {
//     const re = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/646a85a13140160014b85043', {method: 'DELETE'})
//     console.log(re);
//     console.log('1');

//   } catch (err) {
//     console.log(err);
//   }
// }

// del();





