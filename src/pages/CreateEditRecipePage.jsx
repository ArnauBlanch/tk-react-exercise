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

const formatIngredientsForForm = (ingredients) =>
  ingredients?.map((ingredient) => ingredient.name).join(", ");

const formatIngredientsForApi = (ingredients) =>
  ingredients?.split(",").map((ingredient) => ({ name: ingredient.trim() }));

export default function CreateEditRecipePage() {
  const { navigateToRecipePage, navigateToRecipeListPage } = useNavigation();
  const { recipeId } = useParams();
  const recipe = useRecipe(recipeId);
  const isEditing = Boolean(recipeId);
  const formFieldsDisabled = isEditing && !recipe;

  const createRecipe = async (data) => {
    try {
      const response = await createRecipeAPI(data);
      navigateToRecipePage(response.data.id, "created");
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecipe = async (data) => {
    try {
      await updateRecipeAPI(recipeId, data);
      navigateToRecipePage(recipeId, "updated");
    } catch (error) {
      console.error(error);
    }
  };

  const onFormSubmit = async (event, handler) => {
    event.preventDefault();
    const formElements = event.target.elements;
    await handler({
      name: formElements.name.value,
      description: formElements.description.value,
      ingredients: formatIngredientsForApi(formElements.ingredients.value),
    });
  };

  const goBack = () =>
    isEditing ? navigateToRecipePage(recipeId) : navigateToRecipeListPage();

  return (
    <div>
      <Button onClick={goBack}>⬅️ Back</Button>
      <Title>{isEditing ? "Edit recipe" : "Create new recipe"}</Title>

      <Form
        onSubmit={(event) =>
          onFormSubmit(event, isEditing ? updateRecipe : createRecipe)
        }
      >
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
          defaultValue={formatIngredientsForForm(recipe?.ingredients)}
          disabled={formFieldsDisabled}
        />

        <SubmitButton type="submit">
          {isEditing ? "Edit" : "Create"}
        </SubmitButton>
      </Form>
    </div>
  );
}
