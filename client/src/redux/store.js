import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combining all reducers into a single root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Configuration for redux-persist, which allows the Redux state to be stored in local storage
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Creating a persisted reducer using the root reducer and the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the Redux store
export const store = configureStore({
  reducer: persistedReducer,

  //wehen we use middleware we need to disable serializableCheck to avoid error in console.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Creating a persistor, which is used to persist and rehydrate the Redux store
export const persistor = persistStore(store);

// store.js is the place where we create our Redux store.
// We use configureStore() to create the store.
// We pass it an object that contains our reducers.
// We also pass it an object that contains our middleware.
// We need to disable serializableCheck to avoid error in console.
// We export the store so we can use it in our app.
// We import the store in index.js and pass it to the Provider component.
// We import the store in App.js and use it to dispatch actions.
