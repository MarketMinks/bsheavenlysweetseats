import { NextResponse } from 'next/server';
import Stripe from 'stripe';


export async function POST(request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    
    const { email, cartItems } = await request.json();

    const line_items = cartItems.map((item) => {
      let description = '';
      if (item.toppings && item.toppings.length > 0) {
        description += `Toppings: ${item.toppings.join(', ')}`;
      }
      if (item.customDescription) {
        description += description ? '\n' : '';
        description += `Custom Description: ${item.customDescription}`;
      }

      const productData = {
        name: item.name,
        description: description.trim() || undefined,
      };
      
      if (item.image && isValidUrl(item.image)) {
        productData.images = [item.image];
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: Math.round(item.totalPrice * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
      customer_email: email,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: { message: err.message } }, { status: 500 });
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
