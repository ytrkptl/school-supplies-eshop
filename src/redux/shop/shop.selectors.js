import { createSelector } from '@reduxjs/toolkit';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => 
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => {
      return collections ? collections[collectionUrlParam] : null;
    }
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isLoading
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);