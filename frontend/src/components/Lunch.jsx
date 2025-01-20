
import React from "react";
import { useCart } from "./CartContext";
import { FaHeart } from "react-icons/fa";
import fruitdish from "../assets/fruitdish.jpg";
import noodles from "../assets/noodles.jpg"; 
import hotdog from "../assets/hotdog.jpg";
import pancake from "../assets/pancake.jpg"; 

const Lunch = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Fruitdish", image: fruitdish, price: 165 },
    { id: 2, name: "Noodles", image: noodles, price: 200 },
    { id: 3, name: "Hotdog", image: hotdog, price: 150 },
    { id: 4, name: "Pancake", image: pancake, price: 120 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lunch</h1>
      </header>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Product Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative w-full h-80 shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center bg-white hover:scale-105 active:scale-95 group rounded-lg">
            <div className="w-full h-full relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute flex items-center left-2 top-2 bg-opacity-90 bg-black py-1 px-3 rounded-lg">
              <span className="text-lg font-normal text-white mr-2">{product.name}</span>
              <span className="text-xl font-semibold text-white">₹{product.price}</span>
            </div>
            <div className="absolute left-0 bottom-0 w-full h-12 bg-green-600 text-white font-semibold uppercase opacity-0 transition-all duration-150 text-center flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 active:h-14 rounded-b-lg">
              <button
                onClick={() => addToCart(product)}
                className="w-full h-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Lunch;
