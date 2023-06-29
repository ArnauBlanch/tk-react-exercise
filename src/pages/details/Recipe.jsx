import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const Title = styled.h1`
  color: #4f46e5;
  text-align: center;
  margin-bottom: 3rem;
`;

const IngredientsHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
`;

const IngredientsList = styled.ul`
  line-height: 1.5rem;
`;

const BackButton = styled.a`
  color: #312e81;
  font-weight: 700;
  font-size: 1rem;

  &:hover {
    color: #4f46e5;
  }
`;

export default function Recipe() {
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
