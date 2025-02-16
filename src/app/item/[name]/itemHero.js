'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import menuItems from '@/app/menuitem';

const TOPPINGS = {
  '$2 Toppings': ['Cherry', 'Strawberry', 'Blueberry', 'Pineapple', 'Raspberry'],
  '$3 Cheesecake Toppings': ['Cherry', 'Strawberry', 'Blueberry', 'Pineapple', 'Raspberry'],
  '$3 Specialty Cheesecake Toppings': ['Carmel', 'Turtle', 'Banana Pudding', 'Oreo', 'Lemon','Other Toppings'],
  '$3 Toppings': ['Icing', 'Whipped Cream', 'Chocolate Sauce', 'Caramel Sauce', 'Nuts', 'Sprinkles'],
  '$5 Fillings': ['Custard', 'Fruit', 'Cream', 'Mousse', 'Ganache', 'Curd']
};

export default function ItemPage({ params }) {
  const router = useRouter();
  const { name } = params;
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [otherTopping, setOtherTopping] = useState(''); // state for "Other Topping"
  const [showOtherToppingInput, setShowOtherToppingInput] = useState(false); // state for showing input for custom topping

  const item = Object.values(menuItems)
    .flat()
    .find((item) => item.id === decodeURIComponent(name));

  const isCustomItem = item && (item.price === '0' || item.name.toLowerCase().includes('number'));

  useEffect(() => {
    if (item) {
      const basePrice = parseFloat(item.price);
      const toppingPrice = toppings.reduce((acc, topping) => {
        if (TOPPINGS['$2 Toppings'].includes(topping)) return acc + 2;
        if (TOPPINGS['$3 Toppings'].includes(topping)) return acc + 3;
        if (TOPPINGS['$3 Specialty Cheesecake Toppings'].includes(topping)) return acc + 3;
        if (TOPPINGS['$5 Fillings'].includes(topping)) return acc + 5;
        return acc;
      }, 0);
      setTotalPrice((basePrice + toppingPrice) * quantity);
    }
  }, [item, toppings, quantity]);

  useEffect(() => {
    if (item) {
      const allItems = Object.values(menuItems).flat();
      const filtered = allItems.filter((i) => i.id !== item.id).sort(() => 0.5 - Math.random());
      setRecommendedItems(filtered.slice(0, 4));
    }
  }, [item]);

  if (!item) return <div>Loading...</div>;

  const handleToppingChange = (topping) => {
    if (topping === 'Other Toppings') {
      setShowOtherToppingInput(true); // show input for other toppings when "Other Toppings" is selected
    } else {
      setShowOtherToppingInput(false); // hide input when other toppings are deselected
    }

    setToppings((prevToppings) =>
      prevToppings.includes(topping)
        ? prevToppings.filter((t) => t !== topping)
        : [...prevToppings, topping]
    );
  };

  const handleOtherToppingChange = (e) => {
    setOtherTopping(e.target.value);
  };

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newItem = {
      ...item,
      quantity,
      toppings,
      totalPrice,
      uniqueId: `${item.id}-${toppings.sort().join('-')}-${isCustomItem ? customDescription : ''}`,
      customDescription: isCustomItem ? customDescription : undefined
    };

    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.uniqueId === newItem.uniqueId
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
      cartItems[existingItemIndex].totalPrice += totalPrice;
    } else {
      cartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setConfirmationMessage(`Added ${quantity} ${item.name}(s) with toppings: ${toppings.join(', ')} to cart`);

    setTimeout(() => setConfirmationMessage(''), 3000);
  };

  return (
    <div className="bg-background min-h-screen w-full mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start max-w-6xl mx-auto">
        <Image
          src={item.image || '/placeholder.jpg'}
          alt={item.name}
          width={600}
          height={600}
          className="w-full md:w-[500px] h-[500px] rounded-lg object-cover"
        />
        <div className="md:w-1/2 text-blue-400">
          <h1 className="text-4xl font-bold">{item.name}</h1>
          <p className="text-2xl mt-2 font-semibold">${totalPrice.toFixed(2)}</p>
          <p className="mt-4 text-lg">{item.desc}</p>
          {isCustomItem && (
            <div className="mt-4">
              <label htmlFor="customDescription" className="block text-sm font-medium text-gray-700">
                Add your custom description
              </label>
              <textarea
                id="customDescription"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter any additional details for your custom item here..."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
              />
            </div>
          )}
          <div className="mt-6 flex items-center">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 p-2 border rounded text-black"
            />
            <button
              onClick={addToCart}
              className="ml-4 bg-foreground text-background px-6 py-2 rounded hover:bg-opacity-80 transition-colors"
            >
              Add to Cart
            </button>
          </div>
          {confirmationMessage && (
            <div className="mt-2 text-green-500">{confirmationMessage}</div>
          )}
          {confirmationMessage && (
            <button
              onClick={() => router.push('/cart')}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              View Cart
            </button>
          )}
          {!isCustomItem && (
            <div className="mt-8">
              {Object.entries(TOPPINGS).map(([category, toppingList]) => {
                const filteredToppings =
                  item.name.toLowerCase().includes('specialty cheesecake') && category === '$3 Specialty Cheesecake Toppings'
                    ? toppingList
                    : item.name.toLowerCase().includes('original cheesecake') && category === '$3 Cheesecake Toppings'
                    ? toppingList
                    : item.name.toLowerCase().includes('cupcake') && category === '$5 Fillings'
                    ? toppingList
                    : [];

                return filteredToppings.length > 0 ? (
                  <div key={category} className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-black">{category}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredToppings.map((topping) => (
                        <label key={topping} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={topping}
                            checked={toppings.includes(topping)}
                            onChange={() => handleToppingChange(topping)}
                            className="w-4 h-4"
                          />
                          <span className="text-black">{topping}</span>
                        </label>
                      ))}
                    </div>
                    {showOtherToppingInput && toppings.includes('Other Toppings') && (
                      <div className="mt-4">
                        <label htmlFor="otherTopping" className="block text-sm font-medium text-gray-700">
                          Enter your custom topping
                        </label>
                        <input
                          id="otherTopping"
                          type="text"
                          value={otherTopping}
                          onChange={handleOtherToppingChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter custom topping"
                        />
                      </div>
                    )}
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
      {!isCustomItem && (
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Recommended Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedItems.map((item) => (
              <Link href={`/item/${encodeURIComponent(item.id)}`} key={item.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={item.image || '/placeholder.jpg'}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-400">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
