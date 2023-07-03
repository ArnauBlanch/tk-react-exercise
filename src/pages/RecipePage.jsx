import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "../utils";
import Recipe from "../components/Recipe";
import Alert from "../components/Alert";

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

const EditButton = styled.button`
  background-color: #a5b4fc;
  margin-left: 0.5rem;
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

const DeleteButton = styled.button`
  background-color: #fda4af;
  margin-left: 0.5rem;
  padding: 0.6rem;
  color: #9f1239;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #fb7185;
  }
`;

export default function RecipePage() {
  const { recipeId } = useParams();
  const { updated } = useQuery();
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/api/recipes/${recipeId}/`).then((response) => {
      setRecipe(response.data);
    });
  }, [recipeId]);

  const goToHome = () => history.push("/");
  const goToEditPage = () => history.push(`/recipes/${recipeId}/edit`);
  const deleteRecipe = () =>
    axios
      .delete(`/api/recipes/${recipeId}/`)
      .then((response) => {
        if (response.status === 204) history.push("/?deleted=true");
      })
      .catch((err) => console.error(err));

  return (
    <div>
      {recipe && (
        <>
          <BackButton onClick={goToHome}>⬅️ Back</BackButton>
          <EditButton onClick={goToEditPage}>✏️ Edit</EditButton>
          <DeleteButton onClick={deleteRecipe} data-testid="delete">
            ❌ Delete
          </DeleteButton>
          {updated && <Alert>Recipe updated</Alert>}
          <Recipe recipe={recipe} />
        </>
      )}
    </div>
  );
}
