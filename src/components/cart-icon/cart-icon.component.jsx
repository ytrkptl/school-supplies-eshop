import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleBagHidden } from '../../redux/bag/bag.reducer';
// import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer
} from './cart-icon.styles';
import { selectBagItemsCount } from '../../redux/bag/bag.selectors';

const CartIcon = () => {
  const itemCount = useSelector(selectBagItemsCount);
  const dispatch = useDispatch();

  const handleToggleCart = () => dispatch(toggleBagHidden());

  return (
    <CartContainer onClick={handleToggleCart}>
      <ShoppingIcon />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartContainer>
  );
};

export default CartIcon;