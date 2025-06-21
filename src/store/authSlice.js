import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  role: null,
  username: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, role, username } = action.payload;
      state.token = token;
      state.role = role;
      state.username = username;
      state.isAuthChecked = true;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      state.token = null;
      state.role = null;
      state.isAuthChecked = true;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');
  if (token && role) {
    dispatch(setCredentials({ token, role, username }));
  } else {
    dispatch(logout());
  }
};