import { render, screen } from "@testing-library/react";
import RecipePage from "../RecipePage";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    recipeId: "1",
  }),
  useHistory: () => ({ push: mockHistoryPush }),
}));

describe("Recipe page", () => {
  it("displays the recipe name", async () => {
    render(<RecipePage />);

    const recipeName = await screen.findByText("Chocolate Chip Cookies");
    expect(recipeName).toBeInTheDocument();
  });

  it("displays the recipe description", async () => {
    render(<RecipePage />);

    const recipeDescription = await screen.findByText(
      "The best chocolate chip cookies ever!"
    );
    expect(recipeDescription).toBeInTheDocument();
  });

  it("displays the recipe ingredients", async () => {
    render(<RecipePage />);

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
    render(<RecipePage />);

    const backButton = await screen.findByTestId("back-button");
    backButton.click();

    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });
});
