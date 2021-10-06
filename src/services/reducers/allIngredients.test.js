import allIngredientsReducer, { getItems } from "./allIngredients";

describe("allIngredientsSlice", () => {
  describe("reducers", () => {
    const initialState = {
      allIngredients: [],
      allIngredientsRequest: false,
      allIngredientsFailed: false,
    };

    it("sets allIngredientsRequest true when getItems is pending", () => {
      const action = { type: getItems.pending.type };
      const state = allIngredientsReducer(initialState, action);
      expect(state).toEqual({
        allIngredients: [],
        allIngredientsRequest: true,
        allIngredientsFailed: false,
      });
    });

    it("sets allIngredients when getItems is fulfilled", () => {
      const action = {
        type: getItems.fulfilled.type,
        payload: {
          success: true,
          data: [
            {
              _id: "60d3b41abdacab0026a733c6",
              name: "Краторная булка N-200i",
              type: "bun",
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: "https://code.s3.yandex.net/react/code/bun-02.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/bun-02-large.png",
              __v: 0,
            },
          ],
        },
      };
      const state = allIngredientsReducer(initialState, action);
      expect(state).toEqual({
        allIngredients: action.payload.data,
        allIngredientsRequest: false,
        allIngredientsFailed: false,
      });
    });

    it("sets allIngredientsRequest false when getItems is rejected", () => {
      const action = {
        type: getItems.rejected.type,
        payload: "Error",
      };
      const state = allIngredientsReducer(initialState, action);
      expect(state).toEqual({
        allIngredients: [],
        allIngredientsRequest: false,
        allIngredientsFailed: true,
      });
    });
  });
});
