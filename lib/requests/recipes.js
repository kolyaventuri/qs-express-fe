const baseURL = require('./qsAPI').baseURL();

const recipesAPIFetch = (id, method, body) => {
  let url = `${baseURL}/api/v1/foods/${id}/recipes`;
  return fetch(url, {
    method: `${method}`,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
};

const foodNameAPIFetch = (id, method, body) => {
  let url = `${baseURL}/api/v1/foods/${id}`;
  return fetch(url, {
    method: `${method}`,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
};

const getRecipes = () => {
  recipesAPIFetch(window.food_id, 'GET')
    .then(response => handleResponse(response))
    .then(recipes => printRecipes(recipes.recipes))
    .catch(error => console.error({ error }));
  
  foodNameAPIFetch(window.food_id, 'GET')
    .then(response => handleResponse(response))
    .then(food => printName(food))
    .catch(error => console.error({ error }));
};

const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if(!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          json
        };
        return Promise.reject(error);
      }

      return json;
    });
};

const printRecipes = (recipes) => {
  for(let recipe of recipes) {
    let item = $('<li></li>');

    let name = $('<a></a>');

    $(name).attr('href', recipe.url);
    $(name).attr('target', '_blank');
    $(name).append(`<h3>${recipe.name}</h3>`);
    $(item).append(name);

    $('.list').append(item);
  }
};

const printName = (food) => {
  $('.food-name').text(food.name);
};

module.exports = {
  getRecipes
};
