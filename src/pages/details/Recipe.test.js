import { render, screen } from "@testing-library/react";
import Recipe from "./Recipe";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    recipeId: "1",
  }),
  useHistory: () => ({ push: mockHistoryPush }),
}));

describe("Recipe", () => {
  it("displays the recipe name", async () => {
    render(<Recipe />);

    const recipeName = await screen.findByText("Chocolate Chip Cookies");
    expect(recipeName).toBeInTheDocument();
  });

  it("displays the recipe ingredients", async () => {
    render(<Recipe />);

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
    render(<Recipe />);

    const backButton = await screen.findByTestId("back-button");
    backButton.click();

    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });
});
