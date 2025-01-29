import styled from 'styled-components';

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CollectionTitle = styled.h2`
  margin: -20px auto 30px;
  font-size: 38px;
  cursor: pointer;
  &:hover {
    color: grey;
  }

  @media screen and (max-width: 550px) {
    margin-bottom: 20px;
  }
`;

export const CollectionItemsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 3fr 3fr 3fr 3fr;
  grid-gap: 10px;

  @media screen and (max-width: 550px) {
    grid-template-columns: 6fr 6fr;
    grid-template-rows: 6fr 6fr;
  }
`;