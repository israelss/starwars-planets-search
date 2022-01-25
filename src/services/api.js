export const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const fetchPlanetsData = () => fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const { results } = data;
    results.forEach((planet) => delete planet.residents);
    return results;
  });
