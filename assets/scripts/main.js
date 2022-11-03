// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. DONE - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  if (localStorage.getItem("recipes") == null) {
    let emptyArray = [];
    return emptyArray;
  } else {
    return JSON.parse(localStorage.getItem("recipes"));
  }
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. DONE - Get a reference to the <main> element
  let mainElement = document.querySelector("main");
  // A11. DONE - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for (let currentRecipe = 0; currentRecipe < recipes.length; currentRecipe++) {
    const newRecipe = document.createElement("recipe-card");
    newRecipe.data = {
      "imgSrc": recipes[currentRecipe].imgSrc,
      "imgAlt": recipes[currentRecipe].imgAlt,
      "titleLnk": recipes[currentRecipe].titleLnk,
      "titleTxt": recipes[currentRecipe].titleTxt,
      "organization": recipes[currentRecipe].organization,
      "rating": recipes[currentRecipe].rating,
      "numRatings": recipes[currentRecipe].numRatings,
      "lengthTime": recipes[currentRecipe].lengthTime,
      "ingredients": recipes[currentRecipe].ingredients
    };
    mainElement.append(newRecipe);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. DONE - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  // B2. DONE - Get a reference to the <form> element
  let currentForm = document.getElementById("new-recipe");

  // B3. DONE - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  let submitButton = document.querySelector("[type='submit']");
  submitButton.addEventListener("click", submitNewRecipe);

  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. DONE - Create a new FormData object from the <form> element reference above
  // B5. DONE - Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
  // B6. DONE - Create a new <recipe-card> element
  // B7. DONE - Add the recipeObject data to <recipe-card> using element.data
  // B8. DONE - Append this new <recipe-card> to <main>
  // B9. DONE - Get the recipes array from localStorage, add this new recipe to it, and
  //            then save the recipes array back to localStorage
  function submitNewRecipe(event) {
    event.preventDefault();
    const formData = new FormData(currentForm);
    let recipeObject = {};
    for (const [key, value] of formData) {
      recipeObject[key] = value;
    }
    let newRecipe = document.createElement("recipe-card");
    let mainElement = document.querySelector("main");
    newRecipe.data = {
      "imgSrc": recipeObject.imgSrc,
      "imgAlt": recipeObject.imgAlt,
      "titleLnk": recipeObject.titleLnk,
      "titleTxt": recipeObject.titleTxt,
      "organization": recipeObject.organization,
      "rating": recipeObject.rating,
      "numRatings": recipeObject.numRatings,
      "lengthTime": recipeObject.lengthTime,
      "ingredients": recipeObject.ingredients
    };
    mainElement.append(newRecipe);
    let updatedRecipes = getRecipesFromStorage();
    updatedRecipes.push(recipeObject);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  }

  // B10. DONE - Get a reference to the "Clear Local Storage" button
  // B11. DONE - Add a click event listener to clear local storage button
  let clearStorageButton = document.querySelector("[type='button']");
  clearStorageButton.addEventListener("click", deleteLocalStorage);

  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. DONE - Clear the local storage
  // B13. DONE - Delete the contents of <main>
  function deleteLocalStorage() {
    localStorage.clear();
    let mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
  }
}
