import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProduct,
  removeProduct,
  updateQuantity,
  checkout,
  fetchCart,
} from "services/cart";
import { addError, removeError } from "./errorSlice";

export const initialState = {
  cartItems: [],
  loading: false,
  status: "idle",
};

export const fetchCartc = createAsyncThunk(
  "cart/fetchCartc",
  async (data, thunkAPI) => {
    try {
      console.log("cartFectched");
      const cartItems = await fetchCart(data);
      thunkAPI.dispatch(removeError());
      return cartItems;
    } catch (error) {
      const { message } = error;
      console.log(error);
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProductc = createAsyncThunk(
  "cart/addProductc",
  async (data, thunkAPI) => {
    try {
      await addProduct(data);
      thunkAPI.dispatch(removeError());
      return data;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeProductc = createAsyncThunk(
  "cart/removeProductc",
  async (data, thunkAPI) => {
    try {
      await removeProduct(data);
      thunkAPI.dispatch(removeError());
      return data;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateQuantityc = createAsyncThunk(
  "cart/updateQuantityc",
  async (data, thunkAPI) => {
    try {
      await updateQuantity(data);
      thunkAPI.dispatch(removeError());
      return data;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (data, thunkAPI) => {
    try {
      await checkout(data);
      thunkAPI.dispatch(removeError());
      return data;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const selectProductQuantityInCart = (state, productId) => {
  const item = state.cart.cartItems.find(
    (item) => item.product?._id === productId
  );
  return item ? item.quantity : 0;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    logOutCart: (state, action) => {
      state.cartItems= [];
      state.status = "idle";
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartc.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(fetchCartc.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.cartItems = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCartc.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      .addCase(addProductc.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addProductc.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(removeProductc.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.productId
        );
        state.status = "succeeded";
      })
      .addCase(removeProductc.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateQuantityc.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateQuantityc.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(checkoutCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logOutCart } = cartSlice.actions;
export default cartSlice.reducer;
