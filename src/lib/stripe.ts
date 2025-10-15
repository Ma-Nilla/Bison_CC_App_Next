import Stripe from 'stripe';

// Initialize Stripe using the secret key from environment variables
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16',
});