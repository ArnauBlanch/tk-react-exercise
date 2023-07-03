import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";

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
  const history = useHistory();
  const { recipeId } = useParams();
  const isEditing = recipeId !== undefined;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`/api/recipes/${recipeId}`)
        .then((response) => setRecipe(response.data))
        .catch((error) => console.error(error));
    }
  }, [recipeId, isEditing]);

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
    isEditing ? history.push(`/recipes/${recipeId}`) : history.push("/");
  const createRecipe = (data) =>
    axios
      .post("/api/recipes/", data)
      .then((response) => history.push(`/recipes/${response.data.id}`))
      .catch((error) => console.error(error));

  const updateRecipe = (data) =>
    axios
      .patch(`/api/recipes/${recipeId}/`, data)
      .then((response) =>
        history.push(`/recipes/${response.data.id}?updated=true`)
      )
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
