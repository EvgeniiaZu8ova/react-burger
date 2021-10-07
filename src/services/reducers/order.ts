import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";
import {
  TOrderSliceInitialState,
  TSendedOrderResponse,
  MyKnownError,
} from "../../utils/types";

interface SendOrderAttributes {
  accessToken: string;
  myOrder: (string | null)[];
}

export const sendOrder = createAsyncThunk<
  TSendedOrderResponse,
  SendOrderAttributes,
  {
    rejectValue: MyKnownError;
  }
>("order/sendOrder", async ({ accessToken, myOrder }, thunkApi) => {
  try {
    const response = await api.makeOrder(accessToken, myOrder);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState: TOrderSliceInitialState = {
  chosenBun: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
  chosenOtherItems: [],
  orderObject: {
    ingredients: [],
    _id: "",
    owner: {
      name: "",
      email: "",
      createdAt: "",
      updatedAt: "",
    },
    status: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    number: 0,
    price: 0,
  },
  orderRequest: false,
  orderFailed: false,
  isOrderModalOpen: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (action.payload.item.type === "bun") {
        state.chosenBun = action.payload.item;
      } else {
        state.chosenOtherItems.push(action.payload.item);
      }
    },
    removeIngredient(state, action) {
      if (action.payload.item.type !== "bun") {
        const deletedItem = state.chosenOtherItems.find(
          (el) => el.name === action.payload.item.name
        );
        state.chosenOtherItems = deletedItem
          ? state.chosenOtherItems.filter(
              (el, index, arr) => index !== arr.indexOf(deletedItem)
            )
          : state.chosenOtherItems;
      }
    },
    moveIngredients(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const dragItem = state.chosenOtherItems[dragIndex];
      const newItems = [...state.chosenOtherItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);

      state.chosenOtherItems = newItems;
    },
    handleOrderModal(state, action) {
      state.isOrderModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state, { payload }) => {
      state.orderRequest = true;
    });
    builder.addCase(sendOrder.fulfilled, (state, { payload }) => {
      state.orderRequest = false;
      state.orderFailed = false;
      state.orderObject = payload.order;
      state.isOrderModalOpen = true;
      state.chosenBun = {
        _id: "",
        name: "",
        type: "",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "",
        image_mobile: "",
        image_large: "",
        __v: 0,
      };
      state.chosenOtherItems = [];
    });
    builder.addCase(sendOrder.rejected, (state, action) => {
      state.orderRequest = false;
      state.orderFailed = true;
      console.log(action.payload);
      if (action.payload && action.payload.message === "Ошибка 403") {
        localStorage.setItem("isTokenExpired", "true");
      }
    });
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredients,
  handleOrderModal,
} = orderSlice.actions;

export default orderSlice.reducer;
