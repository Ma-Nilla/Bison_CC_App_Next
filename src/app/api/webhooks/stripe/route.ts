import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

// Stripe webhook endpoint to record invoice events
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const rawBody = await req.text();
  if (!sig) {
    return new Response('Missing signature', { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    );
  } catch (err) {
    console.error('Webhook verification failed', err);
    return new Response('Webhook verification failed', { status: 400 });
  }
  // Handle the event types we care about
  switch (event.type) {
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      // Record payment in database
      try {
        const amountPaid = invoice.amount_paid;
        const currency = invoice.currency;
        const customerId = invoice.customer as string;
        // TODO: look up user by customerId mapping (not included here)
        await prisma.payment.create({
          data: {
            amount: amountPaid,
            currency: currency.toUpperCase(),
            status: 'PAID',
            user: {
              // Without a customer mapping this will fail if the relation does not exist.
              // A real implementation should link stripe customer ID to user record.
              connect: { id: customerId },
            },
          },
        });
      } catch (err) {
        console.error('Failed to record payment', err);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response('OK');
}