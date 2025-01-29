import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import LogoSmall from '../../assets/Shop13.png';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_xWIiykzW4vcgunyimjiei3gC00q2T1Vlwj';

	const onToken = token => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token
			}
		}).then(response => {
			alert('Payment successful')
		}).catch(error => {
			console.log('Payment error: ', JSON.parse(error));
			alert(
				'There was an issue with your payment. Please make sure you use the provided credit card.'
			)
		})
	};
	
	return (
		<StripeCheckout
			label='Pay Now'
			name='Shop Tunnel Inc.'
			billingAddress
			ShippingAddress
			image={LogoSmall}
			description={`Your total is $${price}`}
			amount = {priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;