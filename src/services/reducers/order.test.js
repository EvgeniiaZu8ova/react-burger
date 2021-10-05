import orderReducer, {
  addIngredient,
  removeIngredient,
  moveIngredients,
  handleOrderModal,
  sendOrder,
} from "./order";

describe("order reducers", () => {
  const initialState = {
    chosenBun: {},
    chosenOtherItems: [],
    orderObject: {},
    orderRequest: false,
    orderFailed: false,
    isOrderModalOpen: false,
  };

  describe("add ingredient", () => {
    it("sets ingredients after addition", () => {
      const action = {
        type: addIngredient.type,
        payload: {
          item: {
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
        },
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual(
        {
          ...initialState,
          chosenBun: action.payload.item,
        } || {
          ...initialState,
          chosenOtherItems: [...state.chosenOtherItems, action.payload.item],
        }
      );
    });
  });

  describe("remove ingredient", () => {
    it("sets ingredients after removing", () => {
      const action = {
        type: removeIngredient.type,
        payload: {
          item: {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
          },
        },
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });
  });

  describe("move ingredients", () => {
    it("sets ingredients after moving", () => {
      const action = {
        type: moveIngredients.type,
        payload: {
          dragIndex: 1,
          hoverIndex: 0,
        },
      };
      const state = orderReducer(
        {
          ...initialState,
          chosenOtherItems: [
            {
              _id: "60d3b41abdacab0026a733c8",
              name: "Филе Люминесцентного тетраодонтимформа",
              type: "main",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/meat-03.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/meat-03-large.png",
              __v: 0,
            },
            {
              _id: "60d3b41abdacab0026a733c9",
              name: "Мясо бессмертных моллюсков Protostomia",
              type: "main",
              proteins: 433,
              fat: 244,
              carbohydrates: 33,
              calories: 420,
              price: 1337,
              image: "https://code.s3.yandex.net/react/code/meat-02.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/meat-02-large.png",
              __v: 0,
            },
          ],
        },
        action
      );
      expect(state).toEqual({
        ...initialState,
        chosenOtherItems: [
          {
            _id: "60d3b41abdacab0026a733c9",
            name: "Мясо бессмертных моллюсков Protostomia",
            type: "main",
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-02-large.png",
            __v: 0,
          },
          {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
          },
        ],
      });
    });
  });

  describe("order modal behavior", () => {
    it("sets order modal status", () => {
      const action = {
        type: handleOrderModal.type,
        payload: true,
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isOrderModalOpen: action.payload,
      });
    });
  });

  describe("send order reducer", () => {
    it("sets orderRequest true when sendOrder is pending", () => {
      const action = { type: sendOrder.pending.type };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderRequest: true,
      });
    });

    it("sets order when sendOrder is fulfilled", () => {
      const action = {
        type: sendOrder.fulfilled.type,
        payload: {
          success: true,
          name: "Люминесцентный краторный бургер",
          order: {
            ingredients: [
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
            _id: "615c469f7deb54001ba5f539",
            owner: {
              name: "testuser",
              email: "testuser@yandex.ru",
              createdAt: "2021-09-20T07:48:43.677Z",
              updatedAt: "2021-10-05T08:18:57.492Z",
            },
            status: "done",
            name: "Люминесцентный краторный бургер",
            createdAt: "2021-10-05T12:35:43.998Z",
            updatedAt: "2021-10-05T12:35:44.173Z",
            number: 4240,
            price: 3498,
          },
        },
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        orderRequest: false,
        orderFailed: false,
        orderObject: action.payload.order,
        isOrderModalOpen: true,
        chosenBun: {},
        chosenOtherItems: [],
      });
    });

    it("sets orderRequest false when sendOrder is rejected", () => {
      const action = {
        type: sendOrder.rejected.type,
        payload: "Error",
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderFailed: true,
      });
    });
  });
});
