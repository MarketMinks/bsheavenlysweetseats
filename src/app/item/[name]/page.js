'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import menuItems from '@/app/menuitem';

export default function ItemPage({ params }) {
  const router = useRouter();
  const { name } = params;
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState([]); // State to hold selected toppings

  const item = Object.values(menuItems)
    .flat()
    .find((item) => item.id === decodeURIComponent(name));

  if (!item) return <div>Loading...</div>;

  const handleToppingChange = (topping) => {
    setToppings((prevToppings) =>
      prevToppings.includes(topping)
        ? prevToppings.filter((t) => t !== topping) // Remove if already selected
        : [...prevToppings, topping] // Add if not selected
    );
  };

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.toppings = toppings; // Update toppings for the existing item
    } else {
      cartItems.push({ ...item, quantity, toppings }); // Include selected toppings
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(`Added ${quantity} ${item.name}(s) with toppings: ${toppings.join(', ')} to cart`);
    router.push('/cart');
  };

  return (
    <div className="bg-background h-screen w-screen mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <Image
          src={item.image || '/placeholder.jpg'}
          alt={item.name}
          width={200}
          height={200}
          className="w-[600px] rounded-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0 text-blue-400">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p className="text-xl mt-2">{item.price}</p>
          <p className="mt-4">{item.desc}</p>
          <div className="mt-6 flex items-center text-black">
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
          <div className="mt-6">

            <label className="flex text-lg font-medium text-black flex-row"> 
              Choose Toppings: 2$ each
            </label>
            <div className="mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="Strawberries"
                  checked={toppings.includes('Strawberries')}
                  onChange={() => handleToppingChange('Srtrawberries')}
                  className="w-4 h-4"
                />
                <span>Strawberries</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="Blueberries"
                  checked={toppings.includes('Blueberries')}
                  onChange={() => handleToppingChange('Blueberries')}
                  className="w-4 h-4"
                />
                <span>Blueberries</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="Turtle"
                  checked={toppings.includes('Turtle')}
                  onChange={() => handleToppingChange('Turtle')}
                  className="w-4 h-4"
                />
                <span>Turtle</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="Lemon"
                  checked={toppings.includes('Lemon')}
                  onChange={() => handleToppingChange('Lemon')}
                  className="w-4 h-4"
                />
                <span>Lemon</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="Raspberry"
                  checked={toppings.includes('Raspberry')}
                  onChange={() => handleToppingChange('Raspberry')}
                  className="w-4 h-4"
                />
                <span>Raspberry</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="Coconut"
                  checked={toppings.includes('Coconut')}
                  onChange={() => handleToppingChange('Coconut')}
                  className="w-4 h-4"
                />
                <span>Coconut</span>
              </label>
            </div>

            <label className="flex text-lg font-medium text-black flex-row"> 
              ???: 3$ each
            </label>
            <div className="mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="Strawberries"
                  checked={toppings.includes('Cheese')}
                  onChange={() => handleToppingChange('Cheese')}
                  className="w-4 h-4"
                />
                <span>Icing</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="Icing"
                  checked={toppings.includes('Icing')}
                  onChange={() => handleToppingChange('Icing')}
                  className="w-4 h-4"
                />
                <span>Whipped Cream</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="Whipped Cream"
                  checked={toppings.includes('Whipped Cream')}
                  onChange={() => handleToppingChange('Whipped Cream')}
                  className="w-4 h-4"
                />
                <span>???</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="???"
                  checked={toppings.includes('="???"')}
                  onChange={() => handleToppingChange('="???"')}
                  className="w-4 h-4"
                />
                <span>??</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="??"
                  checked={toppings.includes('??')}
                  onChange={() => handleToppingChange('??')}
                  className="w-4 h-4"
                />
                <span>?</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  value="?"
                  checked={toppings.includes('?')}
                  onChange={() => handleToppingChange('?')}
                  className="w-4 h-4"
                />
                <span>?</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
