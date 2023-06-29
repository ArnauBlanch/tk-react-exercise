import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Title = styled.h1`
  font-size: 2em;
  color: #4f46e5;
  text-align: center;
  margin-bottom: 3rem;
`;

const RecipeItem = styled.div`
  width: 400px;
  padding: 1rem;
  margin: 0.8rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 0.5rem;

  &:hover {
    background-color: #e0e7ff;
  }
`;

const RecipeName = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: #312e81;
`;

const RecipeIngredients = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: #1e1b4b;
`;

const CreateRecipeButton = styled.button`
  background-color: #a5b4fc;
  padding: 0.6rem;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #818cf8;
  }
`;

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const goToRecipePage = (id) => () => history.push(`/recipes/${id}`);

  return (
    <div>
      <Title>My recipes ({recipes.length})</Title>
      <CreateRecipeButton onClick={() => history.push("/recipes/new")}>
        🪄 Create recipe
      </CreateRecipeButton>
      <div>
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            data-testid="recipe-item"
            onClick={goToRecipePage(recipe.id)}
          >
            <RecipeName data-testid="recipe-name">{recipe.name}</RecipeName>
            <RecipeIngredients data-testid="recipe-ingredients">
              {recipe.ingredients.length} ingredients
            </RecipeIngredients>
          </RecipeItem>
        ))}
      </div>
    </div>
  );
}
