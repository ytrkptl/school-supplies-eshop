import styled from 'styled-components';

export const CheckoutPageContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
  
  button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    margin: 20px auto;
  }
`;

export const CheckoutTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;

  @media screen and (max-width: 600px) {
    display: block;
    
    thead {
      display: none;
    }

    tbody {
      display: block;
      width: 100%;
    }

    tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid darkgrey;
      padding: 10px;
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      &:before {
        content: attr(data-label);
        font-weight: bold;
        margin-right: 1rem;
      }

      &.image-cell {
        justify-content: center;
        
        &:before {
          display: none;
        }
      }

      &.quantity-cell {
        justify-content: space-between;
      }

      &.remove-cell {
        justify-content: flex-end;
        
        &:before {
          display: none;
        }
      }
    }
  }
`;

export const CheckoutHeader = styled.thead`
  border-bottom: 1px solid darkgrey;
`;

export const HeaderRow = styled.tr`
  text-transform: capitalize;
`;

export const HeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: normal;

  &:last-child {
    text-align: center;
  }
`;

export const CheckoutBody = styled.tbody`
  tr {
    border-bottom: 1px solid darkgrey;
  }
`;

export const TotalContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;

  @media screen and (max-width: 600px) {
    width: 100%;
    text-align: right;
    font-size: 28px;
    padding: 0 10px;
  }
`;

export const WarningContainer = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  color: red;

  @media screen and (max-width: 600px) {
    font-size: 18px;
    margin: 20px 10px;
  }
`;