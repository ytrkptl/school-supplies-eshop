import { createSelector } from '@reduxjs/toolkit';

const selectOnlineCart = (state) => state.onlineCart;

export const selectOnlineCartItems = createSelector(
  [selectOnlineCart],
  (onlineCart) => onlineCart.items
);

export const selectOnlineCartIsLoading = createSelector(
  [selectOnlineCart],
  (onlineCart) => onlineCart.isLoading
);

export const selectOnlineCartError = createSelector(
  [selectOnlineCart],
  (onlineCart) => onlineCart.error
);

export const selectOnlineCartLastSynced = createSelector(
  [selectOnlineCart],
  (onlineCart) => onlineCart.lastSynced
);