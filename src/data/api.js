import axios from "axios";

export function getRecipes() {
  return axios.get("/api/recipes/");
}

export function getRecipe(id) {
  return axios.get(`/api/recipes/${id}/`);
}

export function createRecipe(recipe) {
  return axios.post("/api/recipes/", recipe);
}

export function updateRecipe(id, recipe) {
  return axios.patch(`/api/recipes/${id}/`, recipe);
}

export function deleteRecipe(id) {
  return axios.delete(`/api/recipes/${id}/`);
}
