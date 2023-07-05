import { render, screen, waitFor, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecipeListPage from "../RecipeListPage";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
const wrapper = ({ children }) => <Router history={history}>{children}</Router>;
const renderPage = () => render(<RecipeListPage />, { wrapper });

describe("RecipeList", () => {
  beforeEach(() => history.push("/"));

  it("has a title with the number of recipes", async () => {
    renderPage();
    const title = screen.getByRole("heading", { name: /recipes/i });
    await waitFor(() => expect(title).toHaveTextContent(/recipes \(3\)/i));
  });

  it("displays the name of each recipe", async () => {
    renderPage();

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
    renderPage();

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
    renderPage();

    const recipe = await screen.findByText(/blueberry muffins/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => userEvent.click(recipe));

    await waitFor(() =>
      expect(history.location.pathname).toEqual("/recipes/3")
    );
  });

  it("navigates to recipe creation page when clicking on the create button", async () => {
    renderPage();

    await screen.findAllByTestId("recipe-item");

    const createButton = await screen.findByRole("button", {
      name: /create recipe/i,
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => userEvent.click(createButton));

    await waitFor(async () => {
      expect(history.location.pathname).toEqual("/recipes/new");
    });
  });

  it("shows a message when a recipe was deleted", async () => {
    history.push({ pathname: "/", search: "?deleted=true" });
    renderPage();

    await screen.findAllByTestId("recipe-item");

    await screen.findByText(/recipe deleted/i);
  });
});
