import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PaymentStatusContainer,
  StatusIcon,
  StatusTitle,
  StatusMessage,
  BackButton
} from './payment-status.styles';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <PaymentStatusContainer>
      <StatusIcon>✕</StatusIcon>
      <StatusTitle>Payment Failed</StatusTitle>
      <StatusMessage>
        Your payment was not successful. Please try again or contact support if the problem persists.
      </StatusMessage>
      <BackButton onClick={() => navigate('/checkout')}>
        Return to Checkout
      </BackButton>
    </PaymentStatusContainer>
  );
};

export default PaymentFailure;
