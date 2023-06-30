import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import RecipePage from "../RecipePage";

const history = createMemoryHistory();
const wrapper = ({ children }) => {
  return (
    <Router history={history}>
      <Route path="/recipes/:recipeId">{children}</Route>
    </Router>
  );
};
const renderPage = () => render(<RecipePage />, { wrapper });

describe("Recipe page", () => {
  beforeEach(() => history.push("/recipes/1"));

  it("displays the recipe name", async () => {
    renderPage();

    const recipeName = await screen.findByText("Chocolate Chip Cookies");
    expect(recipeName).toBeInTheDocument();
  });

  it("displays the recipe description", async () => {
    renderPage();

    const recipeDescription = await screen.findByText(
      "The best chocolate chip cookies ever!"
    );
    expect(recipeDescription).toBeInTheDocument();
  });

  it("displays the recipe ingredients", async () => {
    renderPage();

    const recipeIngredients = await screen.findAllByRole("listitem");
    const recipeIngredientsText = recipeIngredients.map((i) => i.textContent);
    expect(recipeIngredientsText).toEqual([
      "flour",
      "sugar",
      "chocolate chips",
      "butter",
      "eggs",
      "vanilla extract",
      "baking soda",
      "salt",
    ]);
  });

  it("navigates to recipe list when back button is clicked", async () => {
    renderPage();

    const backButton = await screen.findByRole("button", { name: /back/i });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.click(backButton));

    expect(history.location.pathname).toEqual("/");
  });

  it("deletes recipe and navigates to recipe list when delete button is clicked", async () => {
    renderPage();

    const deleteButton = await screen.findByRole("button", { name: /delete/i });
    deleteButton.click();

    await waitFor(() => expect(history.location.pathname).toEqual("/"));
    await waitFor(() =>
      expect(history.location.search).toEqual("?deleted=true")
    );
  });

  it("shows a message when recipe was updated", async () => {
    history.push({ pathname: "/recipes/1", search: "?updated=true" });
    renderPage();

    await screen.findByText("Chocolate Chip Cookies");

    screen.getByText(/recipe updated/i);
  });
});
