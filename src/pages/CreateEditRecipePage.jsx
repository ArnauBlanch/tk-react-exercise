import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useNavigation from "../hooks/useNavigation";
import Button from "../components/Button";
import Title from "../components/Title";
import {
  createRecipe as createRecipeAPI,
  updateRecipe as updateRecipeAPI,
} from "../data/api";
import useRecipe from "../hooks/useRecipe";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 2rem;
  width: 20rem;
`;

const InputField = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const InputFieldLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const SubmitButton = styled(Button)`
  background-color: #4f46e5;

  &:hover {
    background-color: #3e38c4;
  }
`;

const formatIngredients = (ingredients) =>
  ingredients?.map((ingredient) => ingredient.name).join(", ");

export default function CreateEditRecipePage() {
  const { navigateToRecipePage, navigateToRecipeListPage } = useNavigation();
  const { recipeId } = useParams();
  const isEditing = Boolean(recipeId);
  const recipe = useRecipe(recipeId);

  const onFormSubmit = (handler) => (event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    handler({
      name: formElements.name.value,
      description: formElements.description.value,
      ingredients: formElements.ingredients.value
        .split(",")
        .map((ingredient) => ({ name: ingredient.trim() })),
    });
  };

  const goBack = () =>
    isEditing ? navigateToRecipePage(recipeId) : navigateToRecipeListPage();
  const createRecipe = (data) =>
    createRecipeAPI(data)
      .then((response) => navigateToRecipePage(response.data.id, "created"))
      .catch((error) => console.error(error));

  const updateRecipe = (data) =>
    updateRecipeAPI(recipeId, data)
      .then((response) => navigateToRecipePage(response.data.id, "updated"))
      .catch((error) => console.error(error));

  const formFieldsDisabled = isEditing && !recipe;

  return (
    <div>
      <Button onClick={goBack}>⬅️ Back</Button>
      <Title>{isEditing ? "Edit recipe" : "Create new recipe"}</Title>

      <Form onSubmit={onFormSubmit(isEditing ? updateRecipe : createRecipe)}>
        <InputFieldLabel htmlFor="name">Name</InputFieldLabel>
        <InputField
          type="text"
          id="name"
          name="name"
          defaultValue={recipe?.name}
          disabled={formFieldsDisabled}
        />

        <InputFieldLabel htmlFor="description">Description</InputFieldLabel>
        <InputField
          type="text"
          id="description"
          name="description"
          defaultValue={recipe?.description}
          disabled={formFieldsDisabled}
        />

        <InputFieldLabel htmlFor="ingredients">Ingredients</InputFieldLabel>
        <InputField
          type="text"
          id="ingredients"
          name="ingredients"
          defaultValue={formatIngredients(recipe?.ingredients)}
          disabled={formFieldsDisabled}
        />

        <SubmitButton type="submit">
          {isEditing ? "Edit" : "Create"}
        </SubmitButton>
      </Form>
    </div>
  );
}
