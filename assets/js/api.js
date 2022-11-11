// Global constants
const appId = "e5fa2517";
const appKey = "cc079f4692e1f13d511364889c6b37d3";
const apiKey = "002ea223eb0e46a88b081ddda039cf0e";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const baseUrl2 = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;
const recipeContainer = document.querySelector(".recipe-list");
const categoryContainer = document.querySelector(".recipe-list-title");
// const randomContainer = document.querySelector(".random-recipe-container");

// Sidebar Toggle constants
const dark = document.querySelector(".dark");
const night = document.querySelector(".night");
const light = document.querySelector(".light");
const sidebar = document.querySelector(".sidebar");
const activeListItem = document.querySelector(".list-item");

// Sidebar Toggle functions
dark.addEventListener("click", () => {
  sidebar.className = "sidebar";
  activeListItem.className = "list-item";
});

night.addEventListener("click", () => {
  sidebar.className = "sidebar night";
  activeListItem.className = "list-item night";
});

light.addEventListener("click", () => {
  sidebar.className = "sidebar light";
  activeListItem.className = "list-item light";
});

// Event Listener Constants
const lowCarb = document.querySelector("#low-carb");
const keto = document.querySelector("#keto");
const glutenFree = document.querySelector("#gluten-free");
const vegetarian = document.querySelector("#vegetarian");
const italian = document.querySelector("#italian");
const american = document.querySelector("#american");
const filipino = document.querySelector("#filipino");
const asian = document.querySelector("#asian");
const mexican = document.querySelector("#mexican");
const lowCarbIcon = document.querySelector(".low-carb");
const ketoIcon = document.querySelector(".keto");
const glutenFreeIcon = document.querySelector(".gluten-free");
const vegetarianIcon = document.querySelector(".vegetarian");
const italianIcon = document.querySelector(".italian");
const americanIcon = document.querySelector(".american");
const filipinoIcon = document.querySelector(".filipino");
const asianIcon = document.querySelector(".asian");
const mexicanIcon = document.querySelector(".mexican");

//Event Listener Functions
const setSearchData = () => {
  lowCarb.addEventListener("click", () => {
    loadRecipes("low-carb");
  });

  lowCarbIcon.addEventListener("click", () => {
    loadRecipes("low-carb");
  });

  keto.addEventListener("click", () => {
    loadRecipes("keto-friendly");
  });

  ketoIcon.addEventListener("click", () => {
    loadRecipes("keto-friendly");
  });

  glutenFree.addEventListener("click", () => {
    loadRecipes("gluten-free");
  });

  glutenFreeIcon.addEventListener("click", () => {
    loadRecipes("gluten-free");
  });

  vegetarian.addEventListener("click", () => {
    loadRecipes("vegetarian");
  });

  vegetarianIcon.addEventListener("click", () => {
    loadRecipes("vegetarian");
  });

  italian.addEventListener("click", () => {
    loadRecipes("italian");
  });

  italianIcon.addEventListener("click", () => {
    loadRecipes("italian");
  });

  american.addEventListener("click", () => {
    loadRecipes("american");
  });

  americanIcon.addEventListener("click", () => {
    loadRecipes("american");
  });

  filipino.addEventListener("click", () => {
    loadRecipes("filipino");
  });

  filipinoIcon.addEventListener("click", () => {
    loadRecipes("filipino");
  });

  asian.addEventListener("click", () => {
    loadRecipes("asian");
  });

  asianIcon.addEventListener("click", () => {
    loadRecipes("asian");
  });

  mexican.addEventListener("click", () => {
    loadRecipes("french");
  });

  mexicanIcon.addEventListener("click", () => {
    loadRecipes("french");
  });
};
setSearchData();

// Render Content Element function
const renderRecipes = (recipeList = []) => {
  recipeContainer.innerHTML = "";
  recipeList.forEach((recipeObject) => {
    const {
      label: recipeTitle,
      image: recipeImage,
      url: recipeUrl,
    } = recipeObject.recipe;
    const htmlElement = `
        <div class="recipe-list-item">
            <img class="recipe-list-item-img" src="${recipeImage}" alt="" />
            <span class="recipe-list-item-title">${recipeTitle}</span>
            <button class="recipe-list-item-button"><a  href=${recipeUrl} target="_blank">CHECK THIS RECIPE</a></button>
        </div>`;
    recipeContainer.insertAdjacentHTML("beforeend", htmlElement);
    recipeContainer.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// Fetching data through API call
loadRecipes = async (type) => {
  type = type || "greek";
  // console.log(type);
  // Dynamic Content Title Generator
  categoryContainer.innerHTML = `our top ${type} picks`.toUpperCase();

  // function for saving data to local storage
  const checkStorage = localStorage.getItem(`${type}`);
  if (checkStorage) {
    renderRecipes(JSON.parse(checkStorage));
  } else {
    const url = baseUrl + `&q=${type}`;
    const api = await fetch(url);
    const data = await api.json();
    renderRecipes(data.hits);
    localStorage.setItem(`${type}`, JSON.stringify(data.hits));
    console.log(data.hits);
  }
};

loadRecipes();

// Single Recipe Change Tab Functions
const tablinks = document.getElementsByClassName("tabLinks");
const tabcontents = document.getElementsByClassName("tabContents");

const openTab = (tabname) => {
  for (tablink of tablinks) {
    tablink.classList.remove("activeLink");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("activeTab");
  }
  event.currentTarget.classList.add("activeLink");
  document.getElementById(tabname).classList.add("activeTab");
};

// Fetch API for Random Recipe Banner Section
// const loadRandomRecipe = async () => {
//   const randomRecipeUrl = baseUrl2;
//   const randomRecipeApi = await fetch(randomRecipeUrl);
//   const randomRecipeData = await randomRecipeApi.json();
//   renderRandomRecipe(randomRecipeData.recipes);
//   console.log(randomRecipeData);
// };

// loadRandomRecipe();

// const renderRandomRecipe = (randomRecipe) => {
//   randomRecipe.forEach((recipe) => {
//   const randomRecipeBanner = `
//   <div class="featured-content">
//     <img src="${recipe.image}"/>
//     <p class="featured-desc">
//       ${recipe.instructions}
//     </p>
//     <button class="featured-button">CHECK THIS RECIPE</button>
//   </div>
// `;
//   randomContainer.insertAdjacentHTML("beforeend", randomRecipeBanner);
//   });
// };
