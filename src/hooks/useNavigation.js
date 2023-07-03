import { useHistory } from "react-router-dom";

export default function useNavigation() {
  const history = useHistory();

  const navigateToRecipeListPage = (action) =>
    history.push("/" + (action ? `?${action}=true` : ""));
  const navigateToRecipePage = (id, action) =>
    history.push(`/recipes/${id + (action ? `?${action}=true` : "")}`);
  const navigateToRecipeCreationPage = () => history.push("/recipes/new");
  const navigateToRecipeEditionPage = (id) =>
    history.push(`/recipes/${id}/edit`);

  return {
    navigateToRecipeListPage,
    navigateToRecipePage,
    navigateToRecipeCreationPage,
    navigateToRecipeEditionPage,
  };
}
