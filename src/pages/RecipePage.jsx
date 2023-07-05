import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "../utils";
import Recipe from "../components/Recipe";
import Alert from "../components/Alert";
import Button from "../components/Button";
import { deleteRecipe as deleteRecipeAPI } from "../data/api";
import useNavigation from "../hooks/useNavigation";
import useRecipe from "../hooks/useRecipe";

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
  const recipe = useRecipe(recipeId);

  const deleteRecipe = async () => {
    try {
      await deleteRecipeAPI(recipeId);
      navigateToRecipeListPage("deleted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {recipe && (
        <>
          <ButtonsContainer>
            <Button onClick={() => navigateToRecipeListPage()}>⬅️ Back</Button>
            <Button onClick={() => navigateToRecipeEditionPage(recipeId)}>
              ✏️ Edit
            </Button>
            <DeleteButton onClick={deleteRecipe}>❌ Delete</DeleteButton>
          </ButtonsContainer>
          {updated && <Alert>Recipe updated</Alert>}
          <Recipe recipe={recipe} />
        </>
      )}
    </div>
  );
}
