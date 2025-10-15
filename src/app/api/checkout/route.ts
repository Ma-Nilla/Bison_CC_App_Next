import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

// Map plan slug to Stripe price ID from environment
const planToPrice: Record<string, string | undefined> = {
  basic: process.env.STRIPE_PRICE_BASIC,
  premium: process.env.STRIPE_PRICE_PREMIUM,
  executive: process.env.STRIPE_PRICE_EXECUTIVE,
};

export async function GET(req: NextRequest) {
  const plan = req.nextUrl.searchParams.get('plan');
  const userId = req.nextUrl.searchParams.get('user'); // optional client reference
  if (!plan || !planToPrice[plan]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }
  const priceId = planToPrice[plan]!;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: userId ?? undefined,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });
    return NextResponse.redirect(session.url ?? '/', { status: 302 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 });
  }
}