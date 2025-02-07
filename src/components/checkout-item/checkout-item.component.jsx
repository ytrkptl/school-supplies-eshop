import React from 'react';
import useBagOperations from '../bag-operations/bag-operations.component';
// import useCartOperations from '../cart-operations/cart-operations.component';
import useWindowSize from '../../hooks/useWindowSize';

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityControlsContainer,
  QuantityContainer,
  RemoveButtonContainer,
  MobileRowContainer
} from './checkout-item.styles';

const CheckoutItem = ({ bagItem }) => {
  const { clearItemFromBag, addItem, removeItem } = useBagOperations();
  const { name, imageUrl, price, quantity } = bagItem;
  const { width } = useWindowSize();
  const isMobile = width <= 600;

  const QuantityControls = () => (
    <QuantityContainer>
      <div onClick={() => removeItem(bagItem)}>&#10094;</div>
      <span>{quantity}</span>
      <div onClick={() => addItem(bagItem)}>&#10095;</div>
    </QuantityContainer>
  );

  const RemoveButton = ({ className }) => (
    <RemoveButtonContainer onClick={() => clearItemFromBag(bagItem)} className={className}>
      &#10005;
    </RemoveButtonContainer>
  );

  if (isMobile) {
    return (
      <CheckoutItemContainer>
        <MobileRowContainer>
          <ImageContainer>
            <img src={imageUrl} alt='item' />
          </ImageContainer>
          <QuantityControlsContainer>
            <QuantityControls />
            <RemoveButton />
          </QuantityControlsContainer>
        </MobileRowContainer>
        <TextContainer data-label="Description">
          {name}
        </TextContainer>
        <TextContainer data-label="Price">
          ${price}
        </TextContainer>
      </CheckoutItemContainer>
    );
  }

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt='item' />
      </ImageContainer>
      <TextContainer data-label="Description">
        {name}
      </TextContainer>
      <QuantityControlsContainer data-label="Quantity">
        <QuantityControls />
      </QuantityControlsContainer>
      <TextContainer data-label="Price">
        ${price}
      </TextContainer>
      <RemoveButtonContainer onClick={() => clearItemFromBag(bagItem)} className="desktop-only">
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;