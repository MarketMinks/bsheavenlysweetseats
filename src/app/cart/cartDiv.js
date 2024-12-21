'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const updateQuantity = (index, change) => {
    const updatedItems = cartItems.map((item, i) => {
      if (i === index) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="px-4 py-8 w-screen max-w-[100%] min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="flex items-center border-b py-4">
            <div className="w-24 h-24 mr-4 relative">
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl">{item.name}</h2>
            </div>
            <div className="text-right">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <p className="text-sm text-gray-500">${item.price} each</p>
              <div className="flex items-center justify-end mt-2">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="mt-8">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        {cartItems.length > 0 && (
          <Link href="/checkout">
            <button className="mt-4 bg-foreground text-background px-6 py-3 rounded hover:bg-opacity-80">
              Proceed to Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
