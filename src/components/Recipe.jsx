import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: #4f46e5;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.05rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

const IngredientsHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
`;

const IngredientsList = styled.ul`
  line-height: 1.5rem;
`;

export default function Recipe({ recipe }) {
  return (
    <>
      <Title>{recipe.name}</Title>
      <Description>{recipe.description}</Description>
      <IngredientsHeading>Ingredients:</IngredientsHeading>
      <IngredientsList>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.name}>{ingredient.name}</li>
        ))}
      </IngredientsList>
    </>
  );
}
