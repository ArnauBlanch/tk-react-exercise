import { rest } from "msw";

export const handlers = [
  rest.get("/api/recipes", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Chocolate Chip Cookies",
          ingredients: [
            "flour",
            "sugar",
            "chocolate chips",
            "butter",
            "eggs",
            "vanilla extract",
            "baking soda",
            "salt",
          ],
        },
        {
          id: 2,
          name: "Spaghetti and Meatballs",
          ingredients: [
            "spaghetti",
            "tomato sauce",
            "meatballs",
            "parmesan cheese",
            "salt",
            "pepper",
          ],
        },
        {
          id: 3,
          name: "Blueberry Muffins",
          ingredients: [
            "flour",
            "sugar",
            "blueberries",
            "butter",
            "eggs",
            "vanilla extract",
            "baking powder",
          ],
        },
      ])
    );
  }),
];
