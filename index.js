const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');


// search meal and fetch API
function searchMeal(e){
    e.preventDefault();

    // clear single meal
    single_mealEl.innerHTML = '';

    // Get the search term
    const term = search.value;

    // check for empty
    if(term.trim()){
        fetch(`https://themealdb-service.herokuapp.com/menu?meal=${term}`)
        .then(res => res.json())
        .then(data => {
            let meals = data;
            resultHeading.innerHTML = `<h2> Resultados da pesquisa para '${term}':</h2>`;

            if(meals === null){
                resultHeading.innerHTML = `<p>Não há resultados de pesquisa. Tente novamente</p>`;
            }else{
                mealsEl.innerHTML = meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.mealThumb}" alt="${meal.meal}"/>
                        <div class="meal-info" data-mealID="${meal.id}">
                            <h3>${meal.meal}</h3>
                        </div>
                    </div>
                `)
                .join('');
            }
        });
        // clear search text
        search.value = '';
    }else{
        alert('Please enter a search term');
    }
}

    // Fetch meal by ID
    function getMealById(mealID){
        
        fetch(`https://themealdb-service.herokuapp.com/menu/meal/${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
    }

    // Fetch random meal from api
    function getRandomMeal(){
        // clear meals and heading
        mealsEl.innerHTML = '';
        resultHeading.innerHTML = '';

        fetch(`https://themealdb-service.herokuapp.com/menu/meal/random`)
        .then(res => res.json())
        .then(data =>{
            const meal = data.meals[0];

            addMealToDOM(meal);
        })
    }

    // Add meal to DOM
    function addMealToDOM(meal){
        const ingredients = [];
        console.log(meal)
        for(let i = 0; i <= meal.ingredients.lenght; i++){
            ingredients.push(`${meal.ingredients[i]} - ${meal.measures[i]}`);
        }

        single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.meal}</h1>
            <img src="${meal.mealThumb}" alt="${meal.meal}"/>
            <div class="single-meal-info">
                ${meal.category ? `<p>${meal.category}</p>` : ''}
                ${meal.area ? `<p>${meal.area}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.instructions}</p>
                <h2>Ingredientes</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
        `;
    }


    // Event listeners
    submit.addEventListener('submit', searchMeal);
    random.addEventListener('click', getRandomMeal);

    meals.addEventListener('click', e => {
        const mealInfo = e.path.find(item =>{
            if(item.classList){
                return item.classList.contains('meal-info');
            }else{
                return false;
            }
        });

        if(mealInfo){
            const mealID = mealInfo.getAttribute('data-mealid');
            getMealById(mealID);
        }
    });