import { useState, useEffect } from "react";
import { getRecipe } from "../data/api";

export default function useRecipe(recipeId) {
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(recipeId);
        setRecipe(response.data);
      } catch (error) {
        console.error("Could not fetch recipe!", error);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  return recipe;
}
