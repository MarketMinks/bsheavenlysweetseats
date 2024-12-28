'use client'
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const [email, setEmail] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from localStorage
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with email:', email);
    console.log('Cart items:', cartItems);
  
    try {
      const stripe = await stripePromise;
      console.log('Stripe loaded:', !!stripe);
  
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, email }),
      });
  
      console.log('API response status:', response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }
  
      const data = await response.json();
      console.log('API response data:', data);
  
      if (!data.sessionId) {
        throw new Error('Session ID is missing from the API response');
      }
  
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Here you could set an error state and display it to the user
    }
  };
  

  return (
    <div className='bg-background h-screen w-screen'> 
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Checkout</h1>
      <div className="mb-6 bg-background ">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Order Summary</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2 font-bold  text-red-700">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="font-bold mt-2">
          <div className=' text-green-400 '> 
          Total: $
           {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
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
        <div className='text-black absolute bottom-40 left-60'>
        Thank you for shopping with B,Please double check all items!           </div>
      </form>
    </div>
    </div>
  );
}
