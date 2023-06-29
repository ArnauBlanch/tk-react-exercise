import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const BackButton = styled.button`
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

export default function RecipePage() {
  const { recipeId } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/api/recipes/${recipeId}`).then((response) => {
      setRecipe(response.data);
    });
  }, [recipeId]);

  const goToHome = () => history.push("/");

  return (
    <div>
      {recipe && (
        <>
          <BackButton onClick={goToHome} data-testid="back-button">
            ⬅️ Back
          </BackButton>
          <Title>{recipe.name}</Title>
          <Description>{recipe.description}</Description>
          <IngredientsHeading>Ingredients:</IngredientsHeading>
          <IngredientsList>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.name}>{ingredient.name}</li>
            ))}
          </IngredientsList>
        </>
      )}
    </div>
  );
}
