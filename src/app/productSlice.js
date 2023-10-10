import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchProducts } from "services/products";
import { searchProducts } from "services/search";
import { removeError, addError } from "./errorSlice";

const initialState = {
  products: [],
  productFetchingStatus: "idle",
  status: "idle",
  productOrder: "Last added",
};

export const fetchProductsAction = createAsyncThunk(
  "products/fetchProducts",
  async (data, thunkAPI) => {
    try {
      const products = await fetchProducts(data);
      thunkAPI.dispatch(removeError);
      return products;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProductsAction = createAsyncThunk(
  "products/createProduct",
  async (data, thunkAPI) => {
    try {
      const product = await createProduct(data);
      thunkAPI.dispatch(removeError());
      return product;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchProductsAction = createAsyncThunk(
  "products/searchProducts",
  async (key, thunkAPI) => {
    try {
      if (key === "") {
        return await fetchProducts();
      }
      const products = await searchProducts(key);
      thunkAPI.dispatch(removeError());
      return products;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProductByDate: (state) => {
      state.products = state.products.sort((a, b) => {
        return new Date(a.createdDate) - new Date(b.createdDate);
      });
    },
    sortProductByPriceLowtoHigh: (state) => {
      state.products = state.products.sort((a, b) => {
        return a.price - b.price;
      });
    },
    sortProductByPriceHightoLow: (state) => {
      state.products = state.products.sort((a, b) => {
        return b.price - a.price;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProductsAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products.push(action.payload);
    });
    builder.addCase(createProductsAction.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(createProductsAction.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.productFetchingStatus = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.productFetchingStatus = "failed";
    });
    builder.addCase(fetchProductsAction.pending, (state, action) => {
      state.productFetchingStatus = "pending";
    });
    builder.addCase(searchProductsAction.fulfilled, (state, action) => {
      state.productFetchingStatus = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(searchProductsAction.rejected, (state, action) => {
      state.productFetchingStatus = "failed";
    });
    builder.addCase(searchProductsAction.pending, (state, action) => {
      state.productFetchingStatus = "pending";
    });
  },
});

export const {
  sortProductByDate,
  sortProductByPriceLowtoHigh,
  sortProductByPriceHightoLow,
} = productsSlice.actions;

export default productsSlice.reducer;
