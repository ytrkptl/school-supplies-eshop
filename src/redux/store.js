import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';
import rootReducer from "@/redux/root-reducer";

// Custom middleware to sanitize or filter actions
const actionSanitizerMiddleware = (storeAPI) => (next) => (action) => {
  // Ignore Firebase-related actions or any other unwanted actions
  if (action.type.startsWith("@auth")) {
    console.debug("Filtered out Firebase action:", action);
    return;
  }

  // Otherwise, pass the action along
  return next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false // Disable for redux-persist
    }).concat([actionSanitizerMiddleware]),
  devTools: import.meta.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export default { store, persistor };