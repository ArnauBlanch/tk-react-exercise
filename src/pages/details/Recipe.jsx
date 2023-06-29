import React, { useState, useEffect } from "react";
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

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/api/recipes/${id}`).then((response) => {
      setRecipe(response.data);
    });
  }, [id]);

  return (
    <div>
      {recipe && (
        <>
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
