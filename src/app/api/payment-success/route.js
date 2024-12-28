import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'floatsinkfc@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function POST(request) {
  try {
    const { session_id } = await request.json();
    console.log('Received session_id:', session_id);

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items.data.price.product']
    });
    console.log('Stripe session:', session);

    if (session.payment_status === 'paid') {
      // Prepare order details
      const orderDetails = session.line_items.data.map(item => {
        const product = item.price.product;
        let details = product.name;
        
        try {
          if (product.description) {
            const descriptionObj = JSON.parse(product.description);
            if (descriptionObj.isCustom) {
              details += `<br>Custom Description: ${descriptionObj.customDescription}`;
            } else if (descriptionObj.toppings && descriptionObj.toppings.length > 0) {
              details += `<br>Toppings: ${descriptionObj.toppings.join(', ')}`;
            }
          } else if (product.metadata && product.metadata.customDescription) {
            // Fallback for custom cakes if description parsing fails
            details += `<br>Custom Description: ${product.metadata.customDescription}`;
          }
        } catch (error) {
          console.error('Error parsing product description:', error);
          // Fallback to raw description if parsing fails
          if (product.description) {
            details += `<br>${product.description}`;
          }
        }

        return `
          <tr>
            <td>${details}</td>
            <td>${item.quantity}</td>
            <td>$${(item.amount_total / 100).toFixed(2)}</td>
          </tr>
        `;
      }).join('');

      const orderTable = `
        <table style="width:100%; border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid black; padding: 5px;">Item</th>
            <th style="border: 1px solid black; padding: 5px;">Quantity</th>
            <th style="border: 1px solid black; padding: 5px;">Price</th>
          </tr>
          ${orderDetails}
        </table>
      `;

      // Send emails
      await Promise.all([
        transporter.sendMail({
          from: 'floatsinkfc@gmail.com',
          to: session.customer_email,
          subject: 'Order Confirmation',
          html: `
            <h1>Thank you for your order!</h1>
            <p>Your order details:</p>
            ${orderTable}
            <p>Total: $${(session.amount_total / 100).toFixed(2)}</p>
          `
        }),
        transporter.sendMail({
          from: 'marketminks@gmail.com',
          to: 'marketminks@gmail.com',
          subject: 'New Order Received',
          html: `
            <h1>New Order Received</h1>
            <p>A new order has been placed by ${session.customer_email}.</p>
            <p>Order details:</p>
            ${orderTable}
            <p>Total: $${(session.amount_total / 100).toFixed(2)}</p>
          `
        })
      ]);

      return NextResponse.json({ success: true });
    } else {
      console.log('Payment not successful:', session.payment_status);
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }
  } catch (err) {
    console.error('Error in payment-success API:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
