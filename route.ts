import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export async function POST(req: Request) {
  try{
    const { plan } = await req.json();
    const price = plan === 'yearly' ? process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY : process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY;
    if (!price) return NextResponse.json({ url: '/support?status=success' });
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode:'subscription',
      line_items:[{ price, quantity:1 }],
      success_url: `${base}/support?status=success`,
      cancel_url: `${base}/support?status=cancel`,
    });
    return NextResponse.json({ url: session.url });
  }catch(e:any){
    return NextResponse.json({ error: e.message, url: '/support?status=success' });
  }
}
