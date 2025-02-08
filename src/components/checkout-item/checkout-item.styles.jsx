import styled from "styled-components";

export const CheckoutItemContainer = styled.tr`
  td {
    padding: 15px 10px;

    @media screen and (max-width: 600px) {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
    }
  }
`;

export const MobileRowContainer = styled.td`
  @media screen and (max-width: 600px) {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px !important;

    &:before {
      display: none;
    }
  }
`;

export const ImageContainer = styled.td`
  width: 23%;
  padding: 15px;

  img {
    width: 100%;
    max-width: 150px;
    height: auto;
    display: block;
  }

  @media screen and (max-width: 600px) {
    width: auto;
    padding: 0;

    img {
      max-width: 80px;
      margin: 0;
    }
  }
`;

export const TextContainer = styled.td`
  width: 23%;
`;

export const QuantityControlsContainer = styled.td`
  width: 23%;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2em;

    td {
      justify-content: center !important;
    }
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    cursor: pointer;
    user-select: none;
    padding: 0 10px;
  }

  span {
    margin: 0 10px;
  }

  @media screen and (max-width: 600px) {
    margin-left: 1em;

    div {
      padding: 5px 10px;
    }
  }
`;

export const RemoveButtonContainer = styled.td`
  padding-left: 12px;
  cursor: pointer;
  text-align: center;

  @media screen and (max-width: 600px) {
    padding: 5px 10px;
    font-size: 18px;
    left
  }
`;
