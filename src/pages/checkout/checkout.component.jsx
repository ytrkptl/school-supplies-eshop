import React from 'react';
import { useSelector } from 'react-redux';
// import PaymentForm from '../../components/payment-form/payment-form.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '@/components/stripe-button/stripe-button.component';

import {
  selectBagItems,
  selectBagTotal
} from '../../redux/bag/bag.selectors';

import {
  CheckoutPageContainer,
  CheckoutTable,
  CheckoutHeader,
  HeaderRow,
  HeaderCell,
  CheckoutBody,
  TotalContainer,
  WarningContainer
} from './checkout.styles';

const CheckoutPage = () => {
  // const cartItems = useSelector(selectCartItems);
  const bagItems = useSelector(selectBagItems);
  const total = useSelector(selectBagTotal);

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
          {bagItems.map(bagItem => (
            <CheckoutItem key={bagItem.id} bagItem={bagItem} />
          ))}
        </CheckoutBody>
      </CheckoutTable>
      <TotalContainer>TOTAL: ${total.toFixed(2)}</TotalContainer>
      <WarningContainer>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
      </WarningContainer>
      {/* <PaymentForm price={total} /> */}
      <StripeCheckoutButton price={total} />
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;