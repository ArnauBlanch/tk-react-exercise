import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
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

export default function RecipeItem({ recipe, onClick }) {
  return (
    <ItemContainer data-testid="recipe-item" onClick={onClick}>
      <RecipeName data-testid="recipe-name">{recipe.name}</RecipeName>
      <RecipeIngredients data-testid="recipe-ingredients">
        {recipe.ingredients.length} ingredients
      </RecipeIngredients>
    </ItemContainer>
  );
}
