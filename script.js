function searchResult() {
    const search = document.getElementById("search-item").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res => res.json())
    .then(data => displayResult(data.meals));
}

function displayResult(searchItem) {
    let displayData = "";
    if(searchItem === null) {
        displayData = `<div><h3>Sorry, This Item is not available right now</h3></div>`;
        document.getElementById("food-result").innerHTML = "";
        document.getElementById("display-result").innerHTML = displayData;
        displayData = "";
    }
    else {
        searchItem.forEach(meal => {
            displayData += `<div class="col foods-item">
                    <div class="card h-100" style="width: 14rem;" onClick="mealDetails(${meal.idMeal})">
                        <img src="${meal.strMealThumb}">
                        <div class="selected-food">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>`
        })
        
        document.getElementById("food-result").innerHTML = "";
        document.getElementById("display-result").innerHTML = displayData;
        displayData = "";
    }
}

function mealDetails(names) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${names}`)
    .then(res => res.json())
    .then(data => showMealDetails(data.meals[0]));
}

function showMealDetails(meal) {
    
    let mealDetails = "";
    let foodIngredient = "";
    const ingredients = [];

    for(var i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        
        if(ingredient) {
            ingredients.push(ingredient);
        }
    }

    for(var i = 0; i < ingredients.length; i++) {
        foodIngredient += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault" checked>
                <label class="form-check-label" for="flexCheckDefault">${ingredients[i]}</label>
            </div>
        `
    }

    mealDetails = `
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <img src="${meal.strMealThumb}"alt="...">
                    <div>
                        <h2>${meal.strMeal}</h2>
                        <h4>Ingredients</h4>
                        ` + foodIngredient + `
                    </div>
                </div>
            </div>
        </div>
    `

    document.getElementById("food-result").innerHTML = mealDetails;
    mealDetails = "";
    foodIngredient = "";
}