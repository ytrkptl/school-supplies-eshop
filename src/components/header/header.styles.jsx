import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 74px;
  width: 100%;
  display: inline-grid;
  grid-template-columns: 5fr 7fr;
  grid-gap: 1em;
  justify-items: center;
  align-items: center;
  margin-bottom: 34px;
  border-bottom: 1px solid black;

  @media screen and (max-width: 1200px) {
    height: 100px;
  }

  @media screen and (max-width: 950px) {
    height: 150px;
  }
  @media screen and (max-width: 600px) {
    height: 70px;
    grid-template-columns: 44px 4fr;
  }
`;
export const LogoImage = styled.img.attrs({
  src: `https://res.cloudinary.com/dun1b4fpw/image/upload/v1737505464/school-supplies-store/logos/tinified/logo-128.png`,
  alt: "",
})`
  height: 70px;
  width: auto;
  margin-right: 1em;
`;

export const SchoolShopTitle = styled.div`
  height: 100%;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: "Playwrite US Modern", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;

  @media screen and (max-width: 1200px) {
    font-size: 25px;
  }
  @media screen and (max-width: 950px) {
    font-size: 20x;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 100%;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;

  @media screen and (max-width: 600px) {
    img${LogoImage} {
      height: 50px;
    }
  }
  @media screen and (max-width: 400px) {
    height: 100%;
    padding: 0px;

    img${LogoImage} {
      height: 40px;
    }
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > a:nth-child(3), & > div:nth-child(3) {
    text-wrap: nowrap;
  }

  @media screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: flex-end;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  white-space: none;
  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid black;
  }

  @media screen and (max-width: 410px) {
    font-size: 14px;
    padding: 0px 4px;
  }
  @media screen and (max-width: 310px) {
    font-size: 12px;
  }
`;
