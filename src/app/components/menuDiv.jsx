'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import menuItems from "../menuitem";

export default function Menu() {
  const menuCategories = ["Cake", "Cupcake", "Cookies", "Pastries"];
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]);


  const backgroundImages = {
    Cake: "/cake-background.bmp",
    Cupcake: "/cupcake-background.jpg",
    Cookies: "/cookies-background.jpg",
    Pastries: "/pastries-background.jpg",
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
          <div className="flex flex-row flex-wrap gap-8 justify-center">
            {menuItems[selectedCategory].map((item, index) => (
              <Link href={`/item/${encodeURIComponent(item.id)}`} key={index}>
                <div className="bg-white p-6 w-[250px] rounded-lg shadow-md flex justify-start items-center flex-col cursor-pointer">
                  <Image src={item.image || "/placeholder.jpg"} alt="" className="w-full" width={1000} height={1000} />
                  <h3 className="text-xl font-semibold mb-2 text-black">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



