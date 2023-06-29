import { rest } from "msw";

export const handlers = [
  rest.get("/api/recipes", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Chocolate Chip Cookies",
          description: "The best chocolate chip cookies ever!",
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
          description: "A classic Italian dish",
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
          description: "A delicious breakfast treat",
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
        description: "The best chocolate chip cookies ever!",
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
  rest.post("/api/recipes", async (req, res, ctx) => {
    const expectedRecipe = {
      name: "Pizza",
      description: "Simple pizza recipe",
      ingredients: [{ name: "tomato" }, { name: "cheese" }, { name: "dough" }],
    };

    const requestBody = await req.text();
    if (requestBody !== JSON.stringify(expectedRecipe)) {
      return res(ctx.status(400));
    }

    return res(
      ctx.json({
        ...expectedRecipe,
        id: 4,
      })
    );
  }),
];
