import { rest } from "msw";
import { RECIPE_API_URL } from "../constants";

export const handlers = [
  rest.get(RECIPE_API_URL + "/recipes", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: "Chocolate Chip Cookies" },
        { id: 2, name: "Spaghetti and Meatballs" },
        { id: 3, name: "Blueberry Muffins" },
      ])
    );
  }),
];
