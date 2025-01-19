import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  margin: auto;
  max-width: 950px;

  & div:first-child {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 950px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /* width: 380px; */

    & div {
      width: 380px;
      margin: auto;
    }
  }

  @media screen and (max-width: 450px) {
    & div {
      width: 280px;
      margin: 0px auto;
    }
  }
`;

