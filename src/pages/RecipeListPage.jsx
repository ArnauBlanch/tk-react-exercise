import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "../utils";
import RecipeItem from "../components/RecipeItem";
import Alert from "../components/Alert";

const Title = styled.h1`
  font-size: 2em;
  color: #4f46e5;
  text-align: center;
  margin-bottom: 3rem;
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
  const { deleted } = useQuery();

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
      {deleted && <Alert>Recipe deleted</Alert>}
      <CreateRecipeButton onClick={() => history.push("/recipes/new")}>
        🪄 Create recipe
      </CreateRecipeButton>
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
