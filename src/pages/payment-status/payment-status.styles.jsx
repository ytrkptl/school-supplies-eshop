import styled from 'styled-components';

export const PaymentStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 20px;
  text-align: center;
`;

export const StatusIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.children === '✓' ? '#4CAF50' : '#f44336'};
  color: white;
`;

export const StatusTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
`;

export const StatusMessage = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  max-width: 500px;
`;

export const BackButton = styled.button`
  background-color: #4285f4;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;
