import { useState, useEffect } from "react";
import { getRecipes } from "../data/api";

export default function useRecipeList() {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    fetchRecipeList();
  }, []);

  const fetchRecipeList = async () => {
    try {
      const response = await getRecipes();
      setRecipeList(response.data);
    } catch (error) {
      console.error("Could not fetch recipe list!", error);
    }
  };

  return recipeList;
}
