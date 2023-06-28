import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  font-size: 1.05rem;
  background-color: white;
  border-radius: 0.5rem;
  font-weight: 700;
  color: #312e81;

  &:hover {
    background-color: #e0e7ff;
    color: #1e1b4b;
  }
`;

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Title>My recipes ({recipes.length})</Title>
      <div>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} data-testid="recipe-item">
            {recipe.name}
          </RecipeItem>
        ))}
      </div>
    </div>
  );
}
