import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditRecipePage from "../CreateEditRecipePage";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: mockHistoryPush }),
}));

describe("Create recipe", () => {
  it("contains a title about recipe creation", () => {
    render(<CreateEditRecipePage />);

    const title = screen.getByRole("heading", { name: /Create new recipe/i });
    expect(title).toBeInTheDocument();
  });

  it("creates recipe when form is submitted", async () => {
    render(<CreateEditRecipePage />);

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
      expect(mockHistoryPush).toHaveBeenCalledWith("/recipes/4")
    );
  });
});
