import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditRecipePage from "../CreateEditRecipePage";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
const wrapper = ({ children }) => <Router history={history}>{children}</Router>;
const renderPage = () => render(<CreateEditRecipePage />, { wrapper });

describe("Create recipe", () => {
  it("contains a title about recipe creation", () => {
    renderPage();

    const title = screen.getByRole("heading", { name: /Create new recipe/i });
    expect(title).toBeInTheDocument();
  });

  it("creates recipe when form is submitted", async () => {
    renderPage();

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
    renderPage();

    const backButton = await screen.findByRole("button", { name: /back/i });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.click(backButton));

    expect(history.location.pathname).toEqual("/");
  });
});
