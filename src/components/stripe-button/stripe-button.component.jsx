import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectCurrentUser } from '@/redux/user/user.selectors';
import {
	PaymentMessageContainer,
	SignInLink,
	PayButton
} from './stripe-button.styles';

const StripeCheckoutButton = ({ price }) => {
	const [message, setMessage] = useState('');
	const currentUser = useSelector(selectCurrentUser);
	const priceForStripe = price * 100;

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if (query.get("success")) {
			setMessage("Order placed! You will receive an email confirmation.");
		}

		if (query.get("canceled")) {
			setMessage(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		axios({
			url: '.netlify/functions/create-checkout-session',
			method: 'POST',
			data: {
				amount: priceForStripe,
			}
		}).then(response => {
			if (response.data.url) {
				window.location.href = response.data.url;
			}
		}).catch(error => {
			console.error('Payment Error:', error);
			// alert('There was an issue with your payment. Please make sure you use the provided credit card.');
		})
	};
	
	return (
		<div>
			{message ? (
				<PaymentMessageContainer>{message}</PaymentMessageContainer>
			) : (
				<>
					{currentUser && price > 0 ? (
						<PayButton onClick={handleSubmit}>Pay Now</PayButton>
					) : (
						<PaymentMessageContainer>
							{!currentUser ? (
								<>
									Ready to complete your purchase? 
									<br />
									<SignInLink to="/signin">
										Sign in to checkout
									</SignInLink>
								</>
							) : (
								'Your cart is empty'
							)}
						</PaymentMessageContainer>
					)}
				</>
			)}
		</div>
	);
};

export default StripeCheckoutButton;
