import { rest } from "msw";

export const handlers = [
  rest.get("/api/recipes", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Chocolate Chip Cookies",
          ingredients: [
            { name: "flour" },
            { name: "sugar" },
            { name: "chocolate chips" },
            { name: "butter" },
            { name: "eggs" },
            { name: "vanilla extract" },
            { name: "baking soda" },
            { name: "salt" },
          ],
        },
        {
          id: 2,
          name: "Spaghetti and Meatballs",
          ingredients: [
            { name: "spaghetti" },
            { name: "tomato sauce" },
            { name: "meatballs" },
            { name: "parmesan cheese" },
            { name: "salt" },
            { name: "pepper" },
          ],
        },
        {
          id: 3,
          name: "Blueberry Muffins",
          ingredients: [
            { name: "flour" },
            { name: "sugar" },
            { name: "blueberries" },
            { name: "butter" },
            { name: "eggs" },
            { name: "vanilla extract" },
            { name: "baking powder" },
          ],
        },
      ])
    );
  }),
  rest.get("/api/recipes/1", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: "Chocolate Chip Cookies",
        ingredients: [
          { name: "flour" },
          { name: "sugar" },
          { name: "chocolate chips" },
          { name: "butter" },
          { name: "eggs" },
          { name: "vanilla extract" },
          { name: "baking soda" },
          { name: "salt" },
        ],
      })
    );
  }),
];
