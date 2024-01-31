import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },

  //wehen we use middleware we need to disable serializableCheck to avoid error in console.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// store.js is the place where we create our Redux store.
// We use configureStore() to create the store.
// We pass it an object that contains our reducers.
// We also pass it an object that contains our middleware.
// We need to disable serializableCheck to avoid error in console.
// We export the store so we can use it in our app.
// We import the store in index.js and pass it to the Provider component.
// We import the store in App.js and use it to dispatch actions.
