import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "@/components/stripe-button/stripe-button.component";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";

import {
  CheckoutPageContainer,
  CheckoutTable,
  CheckoutHeader,
  HeaderRow,
  HeaderCell,
  CheckoutBody,
  TotalContainer,
  WarningContainer
} from "./checkout.styles";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <CheckoutPageContainer>
      <CheckoutTable>
        <CheckoutHeader>
          <HeaderRow>
            <HeaderCell>Product</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Quantity</HeaderCell>
            <HeaderCell>Price</HeaderCell>
            <HeaderCell>Remove</HeaderCell>
          </HeaderRow>
        </CheckoutHeader>
        <CheckoutBody>
          {cartItems.map((cartItem) => (
            <CheckoutItem
              key={cartItem.id}
              cartItem={cartItem}
            />
          ))}
        </CheckoutBody>
      </CheckoutTable>
      <TotalContainer>TOTAL: ${total.toFixed(2)}</TotalContainer>
      <WarningContainer>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/29 - CVV: 123
      </WarningContainer>
      <StripeCheckoutButton price={total} />
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
