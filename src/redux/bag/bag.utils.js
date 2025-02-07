export const addItemToBag = (bagItems, bagItemToAdd) => {
  const existingBagItem = bagItems.find(
    bagItem => bagItem.id === bagItemToAdd.id
  );

  if (existingBagItem) {
    return bagItems.map(bagItem =>
      bagItem.id === bagItemToAdd.id
        ? { ...bagItem, quantity: bagItem.quantity + 1 }
        : bagItem
    );
  }

  return [...bagItems, { ...bagItemToAdd, quantity: 1 }];
};

export const removeItemFromBag = (bagItems, bagItemToRemove) => {
  const existingBagItem = bagItems.find(
    bagItem => bagItem.id === bagItemToRemove.id
  );

  if (existingBagItem.quantity === 1) {
    return bagItems.filter(bagItem => bagItem.id !== bagItemToRemove.id);
  }

  return bagItems.map(bagItem =>
    bagItem.id === bagItemToRemove.id
      ? { ...bagItem, quantity: bagItem.quantity - 1 }
      : bagItem
  );
};

export const getBagTotal = bagItems =>
  bagItems.reduce(
    (total, bagItem) => total + bagItem.quantity * bagItem.price,
    0
  );
