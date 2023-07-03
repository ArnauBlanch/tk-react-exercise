import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "../utils";
import RecipeItem from "../components/RecipeItem";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Title from "../components/Title";
import useRecipeList from "../hooks/useRecipeList";

export default function RecipeListPage() {
  const recipes = useRecipeList();
  const history = useHistory();
  const { deleted } = useQuery();

  const goToRecipePage = (id) => () => history.push(`/recipes/${id}`);
  const goToCreateRecipePage = () => history.push("/recipes/new");

  return (
    <div>
      <Title>My recipes ({recipes.length})</Title>
      {deleted && <Alert>Recipe deleted</Alert>}
      <Button onClick={goToCreateRecipePage}>🪄 Create recipe</Button>
      <div>
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            onClick={goToRecipePage(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
}
