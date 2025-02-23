import styled from "styled-components";
import CustomButton from "../custom-button/custom-button.component";

export const CollectionItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 380px;
  align-items: center;
  position: relative;
  margin: 1rem 0;
`;

export const AddButton = styled(CustomButton)`
  width: 80%;
  display: flex;
  max-width: 256px;
  padding: 0 10px;
  letter-spacing: normal;
  align-self: center;
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: contain;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
  background-repeat: no-repeat;
`;

export const CollectionFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameContainerAndPriceContainer = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 10fr 2fr;
  font-size: 18px;
  margin-bottom: 1rem;

  @media screen and (max-width: 550px) {
    grid-template-columns: 9fr 3fr;
    grid-template-rows: 1fr;
  }
`;

export const NameContainer = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const PriceContainer = styled.span`
  text-align: right;
`;
