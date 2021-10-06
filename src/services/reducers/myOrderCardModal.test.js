import myOrderCardModalReducer, {
  handleMyCurrentOrder,
  handleMyOrderCardModal,
} from "./myOrderCardModal";

describe("myOrderCardModal reducers", () => {
  const initialState = {
    myCurrentOrder: {},
    isMyOrderCardModalOpen: false,
  };

  describe("handleMyCurrentOrder reducer", () => {
    it("sets my current order", () => {
      const action = {
        type: handleMyCurrentOrder.type,
        payload: {
          order: {
            _id: "614c85aadab0f3001bb08a31",
            ingredients: [
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733c7",
            ],
            status: "done",
            name: "Флюоресцентный бургер",
            createdAt: "2021-09-23T13:48:26.377Z",
            updatedAt: "2021-09-23T13:48:26.499Z",
            number: 3823,
          },
        },
      };
      const state = myOrderCardModalReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        myCurrentOrder: action.payload.order,
      });
    });
  });

  describe("handleMyOrderCardModal reducer", () => {
    it("sets my current order modal", () => {
      const action = {
        type: handleMyOrderCardModal.type,
        payload: { isOpen: true },
      };
      const state = myOrderCardModalReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isMyOrderCardModalOpen: action.payload.isOpen,
      });
    });
  });
});
