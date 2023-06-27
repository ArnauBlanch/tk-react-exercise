import { render, screen, waitFor } from "@testing-library/react";
import RecipeList from "../RecipeList";

describe("RecipeList", () => {
  it("has a title with the number of recipes", async () => {
    render(<RecipeList />);
    const title = screen.getByRole("heading", { name: /recipes/i });
    await waitFor(() => expect(title).toHaveTextContent(/recipes \(3\)/i));
  });

  it("displays the name of each recipe", async () => {
    render(<RecipeList />);

    const recipes = await screen.findAllByRole("listitem");
    const recipesNames = recipes.map((r) => r.textContent);
    expect(recipesNames).toEqual([
      "Chocolate Chip Cookies",
      "Spaghetti and Meatballs",
      "Blueberry Muffins",
    ]);
  });
});
