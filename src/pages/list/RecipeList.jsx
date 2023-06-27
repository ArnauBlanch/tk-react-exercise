import axios from "axios";
import React, { useEffect, useState } from "react";
import { RECIPE_API_URL } from "../../constants";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(RECIPE_API_URL + "/recipes")
      .then((response) => setRecipes(response.data));
  });

  return (
    <div>
      <h1>My recipes ({recipes.length})</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}
