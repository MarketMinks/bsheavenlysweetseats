'use client'
import { useState } from "react";
import Image from "next/image";

export default function Menu() {
  const menuCategories = ["Cake", "Cupcake", "Cookies", "Pastries"];
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]);
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = {
    Cake: [
      { name: "Chocolate Cake", price: "$20" },
      { name: "Vanilla Cake", price: "$18" },
      { name: "Red Velvet Cake", price: "$22" },
    ],
    Cupcake: [
      { name: "Strawberry Cupcake", price: "$3" },
      { name: "Lemon Cupcake", price: "$3" },
      { name: "Blueberry Cupcake", price: "$3.5" },
    ],
    Cookies: [
      { name: "Chocolate Chip Cookie", price: "$1.5" },
      { name: "Oatmeal Raisin Cookie", price: "$1.5" },
      { name: "Peanut Butter Cookie", price: "$2" },
    ],
    Pastries: [
      { name: "Croissant", price: "$2.5" },
      { name: "Danish", price: "$3" },
      { name: "Eclair", price: "$3.5" },
    ],
  };

  const backgroundImages = {
    Cake: "/cake-background.bmp",
    Cupcake: "/cupcake-background.jpg",
    Cookies: "/cookies-background.jpg",
    Pastries: "/pastries-background.jpg",
  };

  const openPopup = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className="w-screen min-h-screen max-w-[100%] overflow-hidden">
      {/* Hero Section */}
      <div className="bg-background w-full h-[60vh] border-b-[1px] border-foreground flex justify-center items-center">
        <div 
          className="relative justify-center items-center flex-col w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages[selectedCategory]})` }}
        >
          <div className="absolute inset-0 bg-background opacity-80"></div>
          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-foreground text-6xl font-bold">{selectedCategory}</h1>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-background py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-4 mb-8">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category
                    ? "bg-foreground text-background"
                    : "bg-gray-200 text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuItems[selectedCategory].map((item, index) => (
              <button key={index} className="bg-white p-6 rounded-lg shadow-md" onClick={() => openPopup(item)}>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedItem && <Popup item={selectedItem} onClose={closePopup} />}
    </div>
  );
}



function Popup({ item, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
        <p className="mb-4">Price: {item.price}</p>
        <p className="mb-4">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button 
          onClick={onClose}
          className="bg-foreground text-background px-4 py-2 rounded-md hover:bg-opacity-80"
        >
          Close
        </button>
      </div>
    </div>
  );
}
