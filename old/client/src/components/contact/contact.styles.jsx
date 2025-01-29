import styled from 'styled-components';

export const ContactContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

export const ContactTitle = styled.h2`
  margin: 10px 0;
`;

export const ContactButtonsContainer = styled.div`
  display: flex;
  justify-content: center;

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

export const StyledSuccessOrErrorMessage = styled.p`
  color: ${props => props.hasErrored ? "red" : "lightskyblue"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color:  ${props => props.hasErrored ? "white" : "rgba(0, 0, 0, 0.8)"}
`