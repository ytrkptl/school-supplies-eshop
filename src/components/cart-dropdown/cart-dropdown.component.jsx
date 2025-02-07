import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { selectBagItems } from '../../redux/bag/bag.selectors';
import { toggleBagHidden } from '../../redux/bag/bag.reducer';

import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectBagItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate('/checkout');
    dispatch(toggleBagHidden());
  };

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )}
      </CartItemsContainer>
      <CartDropdownButton onClick={goToCheckout}>
        GO TO CHECKOUT
      </CartDropdownButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;