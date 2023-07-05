import React from "react";
import { useQuery } from "../utils";
import RecipeItem from "../components/RecipeItem";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Title from "../components/Title";
import useRecipeList from "../hooks/useRecipeList";
import useNavigation from "../hooks/useNavigation";

export default function RecipeListPage() {
  const recipes = useRecipeList();
  const { navigateToRecipePage, navigateToRecipeCreationPage } =
    useNavigation();

  const { deleted } = useQuery();

  return (
    <div>
      <Title>My recipes ({recipes.length})</Title>
      {deleted && <Alert>Recipe deleted</Alert>}
      <Button onClick={navigateToRecipeCreationPage}>🪄 Create recipe</Button>
      <div>
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            onClick={() => navigateToRecipePage(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
}
