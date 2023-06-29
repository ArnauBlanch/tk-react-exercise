import { render, screen } from "@testing-library/react";
import Recipe from "./Recipe";
import { MemoryRouter as Router, Route } from "react-router-dom";

const RouterWrapper = ({ children }) => (
  <Router initialEntries={["/recipes/1"]}>
    <Route path="/recipes/:id">{children}</Route>
  </Router>
);

describe("Recipe", () => {
  it("displays the recipe name", async () => {
    render(<Recipe />, { wrapper: RouterWrapper });

    const recipeName = await screen.findByText("Chocolate Chip Cookies");
    expect(recipeName).toBeInTheDocument();
  });

  it("displays the recipe ingredients", async () => {
    render(<Recipe />, { wrapper: RouterWrapper });

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
});
