import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import RecipeListPage from "../RecipeListPage";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: mockHistoryPush }),
}));

describe("RecipeList", () => {
  it("has a title with the number of recipes", async () => {
    render(<RecipeListPage />);
    const title = screen.getByRole("heading", { name: /recipes/i });
    await waitFor(() => expect(title).toHaveTextContent(/recipes \(3\)/i));
  });

  it("displays the name of each recipe", async () => {
    render(<RecipeListPage />);

    const recipes = await screen.findAllByTestId("recipe-item");
    const recipesNames = recipes.map(
      (r) => within(r).getByTestId("recipe-name").textContent
    );
    expect(recipesNames).toEqual([
      "Chocolate Chip Cookies",
      "Spaghetti and Meatballs",
      "Blueberry Muffins",
    ]);
  });

  it("displays the number of ingredients for each recipe", async () => {
    render(<RecipeListPage />);

    const recipes = await screen.findAllByTestId("recipe-item");
    const recipesIngredients = recipes.map(
      (r) => within(r).getByTestId("recipe-ingredients").textContent
    );
    expect(recipesIngredients).toEqual([
      "8 ingredients",
      "6 ingredients",
      "7 ingredients",
    ]);
  });

  it("navigates to recipe page when clicking on a recipe", async () => {
    render(
      <Router>
        <RecipeListPage />
      </Router>
    );

    const recipe = await screen.findByText(/blueberry muffins/i);
    userEvent.click(recipe);
    expect(mockHistoryPush).toHaveBeenCalledWith("/recipes/3");
  });
});
