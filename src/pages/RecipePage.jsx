import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "../utils";
import Recipe from "../components/Recipe";
import Alert from "../components/Alert";
import Button from "../components/Button";
import {
  getRecipe as getRecipeAPI,
  deleteRecipe as deleteRecipeAPI,
} from "../data/api";

const DeleteButton = styled(Button)`
  background-color: #fda4af;
  color: #9f1239;

  &:hover {
    background-color: #fb7185;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 0.5rem;
`;

export default function RecipePage() {
  const { recipeId } = useParams();
  const { updated } = useQuery();
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeAPI(recipeId).then((response) => {
      setRecipe(response.data);
    });
  }, [recipeId]);

  const goToHome = () => history.push("/");
  const goToEditPage = () => history.push(`/recipes/${recipeId}/edit`);
  const deleteRecipe = () =>
    deleteRecipeAPI(recipeId)
      .then((response) => {
        if (response.status === 204) history.push("/?deleted=true");
      })
      .catch((err) => console.error(err));

  return (
    <div>
      {recipe && (
        <>
          <ButtonsContainer>
            <Button onClick={goToHome}>⬅️ Back</Button>
            <Button onClick={goToEditPage}>✏️ Edit</Button>
            <DeleteButton onClick={deleteRecipe} data-testid="delete">
              ❌ Delete
            </DeleteButton>
          </ButtonsContainer>
          {updated && <Alert>Recipe updated</Alert>}
          <Recipe recipe={recipe} />
        </>
      )}
    </div>
  );
}
