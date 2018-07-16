const baseURL = require('./qsAPI').baseURL();

const recipesAPIFetch = (id, method, body) => {
  let url = `${baseURL}/api/v1/foods/${id}/recipes`;
  console.log(url);
  return fetch(url, {
    method: `${method}`,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
};

const getRecipes = () => {
  recipesAPIFetch(window.food_id, 'GET')
    .then(response => handleResponse(response))
    .then(recipes => printRecipes(recipes))
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
    })
};

const printRecipes = (recipes) => {
  console.log(recipes);
};

module.exports = {
  getRecipes
};
