'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import menuItems from '@/app/menuitem';


export default function ItemPage({ params }) {
  const router = useRouter();
  const { name } = params;
  const [quantity, setQuantity] = useState(1);

  const item = Object.values(menuItems)
    .flat()
    .find((item) => item.id === decodeURIComponent(name));

  if (!item) return <div>Loading...</div>;

  const addToCart = () => {
    // Implement add to cart functionality (e.g., using Context API or localStorage)
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ ...item, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(`Added ${quantity} ${item.name}(s) to cart`);
    // Redirect to cart page
    router.push('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col md:flex-row">
        <Image src={item.image || "/placeholder.jpg"} alt={item.name} width={500} height={500} className="w-full md:w-1/2 rounded-lg" />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p className="text-xl mt-2">{item.price}</p>
          <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="mt-6 flex items-center">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 p-2 border rounded"
            />
            <button
              onClick={addToCart}
              className="ml-4 bg-foreground text-background px-4 py-2 rounded hover:bg-opacity-80"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
