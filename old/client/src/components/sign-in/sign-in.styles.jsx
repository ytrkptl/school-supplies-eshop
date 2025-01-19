import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

export const SignInTitle = styled.h2`
  margin: 10px 0;
`;

export const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;

    button: {
      width: 800px;
    }

    button:first-child {
      margin: auto;
      margin-bottom: 20px;
      width: 165px;
    }

    button:nth-child(2) {
      margin: auto;
      width: 165px;
      padding: 0;
    }
  }
`;