import styled from "styled-components";
import { Link } from "react-router-dom";

export const PaymentMessageContainer = styled.div`
  font-size: 18px;
  margin: 20px 0;
  text-align: center;
  color: #333;
`;

export const SignInLink = styled(Link)`
  display: inline-block;
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  margin: 1rem auto;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

export const PayButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;
