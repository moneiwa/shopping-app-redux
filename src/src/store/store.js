
import { configureStore } from '@reduxjs/toolkit';
import shoppingSlice from '../redux/shoppingListReducer';
import userReducer from '../redux/userReducer';
import authReducer from '../redux/authSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingSlice,
   user: userReducer,
    auth: authReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
