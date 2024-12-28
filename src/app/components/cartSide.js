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

  const removeItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const total = cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);

  return (
    <div>
      <div className={`fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-lg transform ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}>
        <div className="p-4 text-foreground">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-start mb-4 border-b pb-4">
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
                    <p className="text-sm text-gray-500">{item.toppings.join(', ')}</p>
                    <p className="text-sm font-bold">${(item.totalPrice * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center mt-2">
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
                      <button
                        onClick={() => removeItem(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
                <Link href="/checkout">
                  <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

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

      {isCartOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
}
