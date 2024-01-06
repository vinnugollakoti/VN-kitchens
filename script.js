// ------------------------------------------------------------------
// js for meal of the day
// for meal of the day
function fetchData0() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => displayrandom(data.meals[0])) // Access the first meal in the array
    .catch((error) => console.error(error));
}

function displayrandom(meal) {
  const randomimage = document.querySelector(".mealofthedayimage");
  const randomname = document.querySelector(".mealofthedayname");
  randomimage.src = meal.strMealThumb;
  randomname.textContent = meal.strMeal;
  let mealId = meal.idMeal;
  console.log(mealId);
  randomimage.addEventListener("click", () => {
    openModal(mealId);
    console.log(mealId);
  });
}
fetchData0();
// ---------------------------------------------------------------------------
// random dishes code
document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the API
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
    .then((response) => response.json())
    .then((data) => displayRandomImages(data.meals))
    .catch((error) => console.error("Error fetching meals:", error));
});
// Function to display random images
function displayRandomImages(meals) {
  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
    const randomImage = document.querySelector(`.randomimage${i + 1}`);
    const randomName = document.querySelector(`.randomname${i + 1}`);

    if (randomImage) {
      randomImage.src = meal.strMealThumb;
      randomName.textContent = `⦿ ${meal.strMeal}`;
    }
  }
}

// taking inputs from the user
const searchbtn = document.querySelector(".openmodalbtn");
const input = document.querySelector(".maininput");

function showData(dish) {
  fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${dish}`)
    .then((response) => response.json())
    .then((data) => displayDish(data.meals))
    .catch((error) => {
      var imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = `Sorry! ${dish} Category not found`;
      imageContainer.style.fontSize = "20px";
    });
}
function displayDish(meals) {
  var imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";
  meals.forEach((meal) => {
    var mealContainer = document.createElement("div");
    mealContainer.className = "meal-container";
    var img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    var nameParagraph = document.createElement("p");
    nameParagraph.textContent = `⦿ ${meal.strMeal}`;
    mealContainer.appendChild(img);
    mealContainer.appendChild(nameParagraph);
    imageContainer.appendChild(mealContainer);
  });
}
// acessing button
searchbtn.addEventListener("click", myfunction());
function myfunction() {
  document.querySelector(".body2_heading").style.display = "none";
  input.addEventListener("change", function () {
    const dishname = this.value;
    document.querySelector(".body2_heading").style.display = "block";
    showData(dishname);
  });
}

// displaying modal
let modalOpen = document.getElementById("Modal-open");
let modalIngredients = document.getElementById("modalIngredients");

//This is for closing modal
let modalClose = document.getElementById("closeBtn");
modalClose.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});
//Function for opening Modal
function openModal(mealId) {
  console.log(mealId);

  //Fetching ingredients of clicked dish
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((result) => {
      return result.json();
    })

    .then((response) => {
      let dishes = response.meals[0];

      modalIngredients.innerHTML = "";

      //Looping through all ingredients
      for (let i = 1; i < 21; i++) {
        let ingredient = dishes[`strIngredient${i}`];

        //Displaying ingredients until all ingredients print in HTML
        if (ingredient !== "") {
          console.log(`${ingredient}`);

          modalIngredients.innerHTML += `
                <li>${ingredient}</li>`;
        }
      }

      //Displaying modal after everything gets ready
      document.getElementById("modal").style.display = "block";
    });
}
