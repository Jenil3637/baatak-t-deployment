import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";

const Lunch = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("https://baattak.onrender.com/api/v1/customer/menuItems");
        const data = await response.json();
        // Filter items with the "combo" category
        const lunchItems = data.filter((item) => item.category === "Lunch");
        setProducts(lunchItems);
      } catch (err) {
        setError("Failed to fetch menu items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="relative w-full h-80 shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center bg-white hover:scale-105 active:scale-95 group rounded-lg"
            >
              <div className="w-full h-full relative">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute flex items-center left-2 top-2 bg-opacity-90 bg-black py-1 px-3 rounded-lg">
                <span className="text-lg font-normal text-white mr-2">
                  {product.name}
                </span>
                <span className="text-xl font-semibold text-white">
                  ₹{product.price}
                </span>
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
          ))
        ) : (
          <p className="text-gray-600">No Lunch items available.</p>
        )}
      </section>
    </div>
  );
};

export default Lunch;
