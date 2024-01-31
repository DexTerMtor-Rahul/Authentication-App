import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;

// userSlice is a reducer function that accepts initialState and an object full of reducer functions,
// each with a name prefixed by the slice name.
// It automatically generates action creators and action types that correspond to the reducers and state.
