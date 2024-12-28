'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-lg transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4 text-foreground">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-start mb-4">
                  <div className="w-16 h-16 relative mr-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold">{item.name}</h3>
                    {/* Display description if available */}
                    {item.description && (
                      <p className="text-sm italic text-gray-600">
                        {item.description}
                      </p>
                    )}
                                  <p className="text-sm text-gray-500">{item.toppings+""}</p>

                    <p>Quantity: {item.quantity}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
                <Link href="/checkout">
                  <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Arrow Button */}
      <button
        onClick={toggleCart}
        className={`fixed top-1/2 -translate-y-1/2 bg-foreground text-white p-3 rounded-l-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isCartOpen ? 'right-80' : 'right-0'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-6 h-6 transition-transform duration-300 ${
            isCartOpen ? '' : 'rotate-180'
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L19.5 12m0 0l-6 7.5M19.5 12H4.5"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isCartOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
}
