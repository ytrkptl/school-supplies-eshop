import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cart/cart.reducer";
import { PaymentStatusContainer, StatusIcon, StatusTitle, StatusMessage, BackButton } from "./payment-status.styles";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart after successful payment
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <PaymentStatusContainer>
      <StatusIcon>✓</StatusIcon>
      <StatusTitle>Payment Successful!</StatusTitle>
      <StatusMessage>Thank you for your purchase. Your order has been processed successfully.</StatusMessage>
      <BackButton onClick={() => navigate("/shop")}>Continue Shopping</BackButton>
    </PaymentStatusContainer>
  );
};

export default PaymentSuccess;
