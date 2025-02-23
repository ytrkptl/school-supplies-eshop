import styled from "styled-components";

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  position: relative;
  padding: 0 40px;

  .slick-list {
    margin: 0 -10px;
  }

  .slick-slide > div {
    padding: 0 10px;
  }

  .slick-track {
    margin-left: 0;
  }
`;

export const TitleContainer = styled.h1`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  color: blue;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 550px) {
    font-size: 22px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8f8f8;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::before {
    content: "";
    width: 16px;
    height: 16px;
    border-style: solid;
    border-width: 3px 3px 0 0;
    display: inline-block;
    color: black;
  }

  @media screen and (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

export const NextArrow = styled(ArrowButton)`
  right: 0;
  top: 40%;

  &::before {
    transform: rotate(45deg);
    margin-left: -3px;
  }
`;

export const PrevArrow = styled(ArrowButton)`
  left: 0;
  top: 40%;

  &::before {
    transform: rotate(-135deg);
    margin-right: -3px;
  }
`;
