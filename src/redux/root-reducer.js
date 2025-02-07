import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user.reducer";
import bagReducer from './bag/bag.reducer';
// import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import contactFormReducer from './contact/contact.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bag']
}

const rootReducer = combineReducers({
  bag: bagReducer,
  user: userReducer,
  // cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  contactForm: contactFormReducer
});

export default persistReducer(persistConfig, rootReducer);