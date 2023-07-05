/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditRecipePage from "../CreateEditRecipePage";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
const renderPage = (path) =>
  render(
    <Router history={history}>
      <Route path={path}>
        <CreateEditRecipePage />
      </Route>
    </Router>
  );

describe("Create recipe", () => {
  const renderCreatePage = () => {
    history.push("/recipes/new");
    renderPage("/recipes/new");
  };

  it("loads create recipe form", () => {
    renderCreatePage();

    screen.getByRole("heading", { name: /Create new recipe/i });

    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeEnabled();

    const descriptionInput = screen.getByLabelText(/description/i);
    expect(descriptionInput).toBeEnabled();

    const ingredientsInput = screen.getByLabelText(/ingredients/i);
    expect(ingredientsInput).toBeEnabled();
  });

  it("creates recipe when form is submitted", async () => {
    renderCreatePage();

    userEvent.type(screen.getByLabelText(/name/i), "Pizza");

    userEvent.type(
      screen.getByLabelText(/description/i),
      "Simple pizza recipe"
    );

    userEvent.type(
      screen.getByLabelText(/ingredient/i),
      "tomato, cheese, dough"
    );

    const submitButton = screen.getByRole("button", { name: /create/i });
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(history.location.pathname).toEqual("/recipes/4")
    );
  });

  it("navigates to recipe list when back button is clicked", async () => {
    renderCreatePage();

    const backButton = await screen.findByRole("button", { name: /back/i });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.click(backButton));

    expect(history.location.pathname).toEqual("/");
  });
});

describe("Edit recipe", () => {
  const renderEditPage = () => {
    history.push("/recipes/1/edit");
    renderPage("/recipes/:recipeId/edit");
  };

  it("loads edit form with recipe data", async () => {
    renderEditPage();

    screen.getByRole("heading", { name: /Edit recipe/i });

    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeDisabled();

    const descriptionInput = screen.getByLabelText(/description/i);
    expect(descriptionInput).toBeDisabled();

    const ingredientsInput = screen.getByLabelText(/ingredients/i);
    expect(ingredientsInput).toBeDisabled();

    await waitFor(async () => {
      expect(nameInput).toBeEnabled();
      expect(nameInput.value).toEqual("Chocolate Chip Cookies");

      expect(descriptionInput).toBeEnabled();
      expect(descriptionInput.value).toEqual(
        "The best chocolate chip cookies ever!"
      );

      expect(ingredientsInput).toBeEnabled();
      expect(ingredientsInput.value).toEqual(
        "flour, sugar, chocolate chips, butter, eggs, vanilla extract, baking soda, salt"
      );
    });
  });

  it("updates recipe when form is submitted", async () => {
    renderEditPage();

    const nameInput = screen.getByLabelText(/name/i);
    await waitFor(async () =>
      expect(nameInput.value).toEqual("Chocolate Chip Cookies")
    );

    userEvent.clear(nameInput);
    userEvent.type(screen.getByLabelText(/name/i), "Spaghetti");

    const descriptionInput = screen.getByLabelText(/description/i);
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, "Simple spaghetti recipe");

    const ingredientsInput = screen.getByLabelText(/ingredients/i);
    userEvent.clear(ingredientsInput);
    userEvent.type(ingredientsInput, "pasta, tomato sauce, cheese");

    const submitButton = screen.getByRole("button", { name: /edit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(history.location.pathname).toEqual("/recipes/1");
      expect(history.location.search).toEqual("?updated=true");
    });
  });

  it("navigates to recipe page when back button is clicked", async () => {
    renderEditPage();

    const backButton = await screen.findByRole("button", { name: /back/i });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.click(backButton));

    expect(history.location.pathname).toEqual("/recipes/1");
  });
});
