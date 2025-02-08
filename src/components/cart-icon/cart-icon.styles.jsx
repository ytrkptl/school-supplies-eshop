import styled from 'styled-components';
import ShoppingIconSVG from '../../assets/shopping-bag.svg';

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid black;
  }  
`;

export const ShoppingIcon = styled.img.attrs({
  src: ShoppingIconSVG,
  alt: 'Shopping Cart'
})`
  width: 24px;
  height: 24px;
`;

export const ItemCountContainer = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;