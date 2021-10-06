import ingredientModalReducer, {
  handleCurrentIngredient,
  handleIngredientModal,
} from "./ingredientModal";

describe("ingredientModal reducers", () => {
  const initialState = {
    currentIngredient: {},
    isIngredientsModalOpen: false,
  };

  describe("handleCurrentIngredient reducer", () => {
    it("sets current ingredient", () => {
      const action = {
        type: handleCurrentIngredient.type,
        payload: {
          ingredient: {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0,
          },
        },
      };
      const state = ingredientModalReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        currentIngredient: action.payload.ingredient,
      });
    });
  });

  describe("handleIngredientModal reducer", () => {
    it("sets ingredient modal", () => {
      const action = {
        type: handleIngredientModal.type,
        payload: { isOpen: true },
      };
      const state = ingredientModalReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isIngredientsModalOpen: action.payload.isOpen,
      });
    });
  });
});
