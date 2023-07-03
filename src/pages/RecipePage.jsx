import React, { useState, useEffect } from "react";
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
import useNavigation from "../hooks/useNavigation";

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
  const { navigateToRecipeListPage, navigateToRecipeEditionPage } =
    useNavigation();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeAPI(recipeId).then((response) => {
      setRecipe(response.data);
    });
  }, [recipeId]);

  const deleteRecipe = () =>
    deleteRecipeAPI(recipeId)
      .then((response) => {
        if (response.status === 204) navigateToRecipeListPage("deleted");
      })
      .catch((err) => console.error(err));

  return (
    <div>
      {recipe && (
        <>
          <ButtonsContainer>
            <Button onClick={() => navigateToRecipeListPage()}>⬅️ Back</Button>
            <Button onClick={() => navigateToRecipeEditionPage(recipeId)}>
              ✏️ Edit
            </Button>
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
