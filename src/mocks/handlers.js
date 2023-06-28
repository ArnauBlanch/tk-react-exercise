import { rest } from "msw";

export const handlers = [
  rest.get("/api/recipes", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: "Chocolate Chip Cookies" },
        { id: 2, name: "Spaghetti and Meatballs" },
        { id: 3, name: "Blueberry Muffins" },
      ])
    );
  }),
];
