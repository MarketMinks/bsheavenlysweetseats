'use client'
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const [email, setEmail] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }

      const { sessionId } = await response.json();
      if (!sessionId) throw new Error('Session ID is missing from the API response');

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) throw result.error;

    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.message);
    }
  };

  const calculateItemTotal = (item) => {
    return item.totalPrice * item.quantity;
  };

  const total = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  return (
    <div className='bg-background min-h-screen w-full'> 
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-black">Checkout</h1>
        <div className="mb-6 bg-background">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="mb-4 font-bold text-red-700">
              <div className="flex justify-between items-center">
                <span>{item.name} x {item.quantity}</span>
                <span>${calculateItemTotal(item).toFixed(2)}</span>
              </div>
              {item.toppings && item.toppings.length > 0 && (
                <div className="text-sm text-gray-600 ml-4">
                  Toppings: {item.toppings.join(', ')}
                </div>
              )}
              {item.customDescription && (
                <div className="text-sm text-gray-600 ml-4">
                  Custom Description: {item.customDescription}
                </div>
              )}
            </div>
          ))}
          <div className="font-bold mt-2">
            <div className='text-green-400'> 
              Total: ${total.toFixed(2)}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-foreground text-background px-6 py-3 rounded hover:bg-opacity-80"
          >
            Pay with Stripe
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
        <div className='text-black mt-8'>
          Thank you for shopping with B, Please double check all items! If you orderd a custom cake theres a reason it cost 0$! I will get back to you via email with a price and a time to expect it!
        </div>
      </div>
    </div>
  );
}
