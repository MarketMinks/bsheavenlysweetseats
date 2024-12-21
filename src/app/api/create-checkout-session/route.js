import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'floatsinkfc@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function POST(request) {
  try {
    const { email, cartItems } = await request.json();
    console.log('Received request:', { email, cartItems });

    const line_items = cartItems.map((item) => {
      const productData = {
        name: item.name,
      };
      if (item.image) {
        productData.images = [item.image];
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: Math.round(item.price * 100),
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

    console.log('Created session:', session.id);

    // Send email to customer
    await transporter.sendMail({
      from: 'floatsinkfc@gmail.com',
      to: email,
      subject: 'Order Confirmation',
      text: `Thank you for your order! Your total is $${(session.amount_total / 100).toFixed(2)}.`,
      html: `<h1>Thank you for your order!</h1><p>Your total is $${(session.amount_total / 100).toFixed(2)}.</p>`
    });

    // Send email to seller
    await transporter.sendMail({
      from: 'marketminks@gmail.com',
      to: 'marketminks@gmail.com', // Change this if you want to send to a different seller email
      subject: 'New Order Received',
      text: `A new order has been placed by ${email}. Total: $${(session.amount_total / 100).toFixed(2)}.`,
      html: `<h1>New Order Received</h1><p>A new order has been placed by ${email}.</p><p>Total: $${(session.amount_total / 100).toFixed(2)}.</p>`
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session or sending email:', err);
    return NextResponse.json({ error: { message: err.message } }, { status: 500 });
  }
}
