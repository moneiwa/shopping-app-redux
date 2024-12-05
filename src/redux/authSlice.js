import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    users: [],
  },
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        user => user.name === username && user.password === password
      );
      if (user) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
