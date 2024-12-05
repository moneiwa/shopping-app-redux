import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks
export const fetchShoppingItems = createAsyncThunk(
  "shoppingList/fetchShoppingItems",
  async () => {
    const response = await fetch("http://localhost:3000/todos");
    return response.json();
  }
);

export const addShoppingItemToServer = createAsyncThunk(
  "shoppingList/addShoppingItemToServer",
  async (item) => {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    return response.json();
  }
);

export const deleteShoppingItemFromServer = createAsyncThunk(
  "shoppingList/deleteShoppingItemFromServer",
  async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const editShoppingItemOnServer = createAsyncThunk(
  "shoppingList/editShoppingItemOnServer",
  async (item) => {
    const response = await fetch(`http://localhost:3000/todos/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    return response.json();
  }
);

const initialState = {
  items: [],
  cart: [],
};

const shoppingSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    logoutUser: (state) => {
      return initialState; 
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (!existingItem) {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload.id;
      state.cart = state.cart.filter(item => item.id !== itemId);
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addShoppingItemToServer.fulfilled, (state, action) => {
        state.items.push(action.payload); 
      })
      .addCase(deleteShoppingItemFromServer.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(editShoppingItemOnServer.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { logoutUser, addToCart, removeFromCart, clearCart } = shoppingSlice.actions;
export default shoppingSlice.reducer;
