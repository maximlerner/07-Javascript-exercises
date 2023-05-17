import { async } from 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async () => {
  try {
    // Here we remove the hash symbol attached to the id
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

  } catch(err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async () => {
  try {
    await model.loadSearchResults('pizza');
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}
controlSearchResults();

// showRecipe();

const init = () => {
  recipeView.addHandlerRender(controlRecipes)
}
init();



