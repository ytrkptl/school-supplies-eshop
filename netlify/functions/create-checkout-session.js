// This is your test secret API key.
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  if(!process.env.APP_DOMAIN) { 
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'APP_DOMAIN is not defined' })
    };
  }

  try {
    const { amount } = JSON.parse(event.body);
    
    if (!amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required amount parameter' })
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Shop Tunnel Purchase',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.APP_DOMAIN || 'http://localhost:8888'}/payment-success`,
      cancel_url: `${process.env.APP_DOMAIN || 'http://localhost:8888'}/payment-failure`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
