import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import RecipePage from "../RecipePage";

const history = createMemoryHistory();
const wrapper = ({ children }) => (
  <Router history={history}>
    <Route path="/recipes/:recipeId">{children}</Route>
  </Router>
);
const renderPage = () => render(<RecipePage />, { wrapper });

describe("Recipe page", () => {
  beforeAll(() => history.push("/recipes/1"));
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
});
