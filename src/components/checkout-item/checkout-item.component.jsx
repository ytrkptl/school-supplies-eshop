
import { useDispatch } from 'react-redux';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.reducer';
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

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;
  const { width } = useWindowSize();
  const isMobile = width <= 600;

  const handleClearItem = () => dispatch(clearItemFromCart(cartItem));
  const handleAddItem = () => dispatch(addItem(cartItem));
  const handleRemoveItem = () => dispatch(removeItem(cartItem));

  const QuantityControls = () => (
    <QuantityContainer>
      <div onClick={handleRemoveItem}>&#10094;</div>
      <span>{quantity}</span>
      <div onClick={handleAddItem}>&#10095;</div>
    </QuantityContainer>
  );

  const RemoveButton = ({ className }) => (
    <RemoveButtonContainer onClick={handleClearItem} className={className}>
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
      <RemoveButtonContainer onClick={handleClearItem} className="desktop-only">
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;