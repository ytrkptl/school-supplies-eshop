import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
	const [message, setMessage] = useState('');
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
			console.log(response)
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
				<div className="payment-message">{message}</div>
			) : (
				<button onClick={handleSubmit}>Pay</button>
			)}
		</div>
	);
};

export default StripeCheckoutButton;
