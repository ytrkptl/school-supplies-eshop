import styled from "styled-components";
import CustomButton from "../custom-button/custom-button.component";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  right: 0px;
  z-index: 5;
  top: 58px;
  margin-right: 60px;
  margin-top: 4em;

  @media screen and (max-width: 600px) {
    margin-right: 10px;
    margin-top: 1em;
  }
`;

export const CartDropdownButton = styled(CustomButton)`
  margin-top: auto;
  padding: 0 1em;
`;

export const EmptyMessageContainer = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
