import orderCardModalReducer, {
  handleCurrentOrder,
  handleOrderCardModal,
} from "./orderCardModal";

describe("orderCardModal reducers", () => {
  const initialState = {
    currentOrder: {},
    isOrderCardModalOpen: false,
  };

  describe("handleCurrentOrder reducer", () => {
    it("sets current order", () => {
      const action = {
        type: handleCurrentOrder.type,
        payload: {
          order: {
            _id: "615c0a437deb54001ba5f43e",
            ingredients: [
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733c7",
            ],
            status: "done",
            name: "Флюоресцентный бургер",
            createdAt: "2021-10-05T08:18:11.474Z",
            updatedAt: "2021-10-05T08:18:11.561Z",
            number: 4239,
          },
        },
      };
      const state = orderCardModalReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        currentOrder: action.payload.order,
      });
    });
  });

  describe("handleOrderCardModal reducer", () => {
    it("sets current order modal", () => {
      const action = {
        type: handleOrderCardModal.type,
        payload: { isOpen: true },
      };
      const state = orderCardModalReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isOrderCardModalOpen: action.payload.isOpen,
      });
    });
  });
});
