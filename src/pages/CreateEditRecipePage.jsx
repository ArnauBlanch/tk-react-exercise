import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Title = styled.h1`
  color: #4f46e5;
  text-align: center;
  margin-bottom: 1rem;
`;

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

const SubmitButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #4f46e5;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;

export default function CreateEditRecipePage() {
  const history = useHistory();

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

  const createRecipe = (data) => {
    axios
      .post("/api/recipes/", data)
      .then((response) => history.push(`/recipes/${response.data.id}`))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Title>Create new recipe</Title>
      <Form onSubmit={onFormSubmit(createRecipe)}>
        <InputFieldLabel htmlFor="name">Name</InputFieldLabel>
        <InputField type="text" id="name" name="name" />

        <InputFieldLabel htmlFor="description">Description</InputFieldLabel>
        <InputField type="text" id="description" name="description" />

        <InputFieldLabel htmlFor="ingredients">Ingredients</InputFieldLabel>
        <InputField type="text" id="ingredients" name="ingredients" />

        <SubmitButton type="submit">Create</SubmitButton>
      </Form>
    </div>
  );
}
