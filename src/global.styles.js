import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans Condensed', sans-serif;
    padding: 20px 60px;
    min-height: 100vh;
    background-color: white;

    @media screen and (max-width: 650px) {
      padding: 20px;
    }
    @media screen and (max-width: 600px) {
      padding: 4px 10px;
    }
  }

  a {
    text-decoration: none;
    color: black;
  }

  * {
    box-sizing: border-box;
    transition: all 0.4s ease;
  }
`;