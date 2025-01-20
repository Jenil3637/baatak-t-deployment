// import React from "react";
// import fruitdish from "../assets/fruitdish.jpg";
// import noodles from "../assets/noodles.jpg";
// import hotdog from "../assets/hotdog.jpg";
// import pancake from "../assets/pancake.jpg";

// const Dashboard = () => {
//     return (
//         <div className="min-h-screen bg-gray-50 p-6 lg:ml-64 ml-16">
//             {/* Header */}
//             <header className="mb-6">
//                 <h1 className="text-2xl font-bold text-gray-800">MENU</h1>
//             </header>

//             {/* Search Section */}
//             <section className="mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search for products..."
//                     className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//             </section>

//             {/* Divider */}
//             <hr className="my-4 border-gray-300" />

//             {/* Product Cards Section */}
//             <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {/* Card 1 */}
//                 <div className="relative w-full h-80 shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center bg-white hover:scale-105 active:scale-95 group rounded-lg">
//                     <div className="w-full h-full relative">
//                         <img
//                             src={fruitdish}
//                             alt="Fruitdish"
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                     </div>
//                     <div className="absolute flex items-center left-2 top-2 bg-opacity-90 bg-black py-1 px-3 rounded-lg">
//                         <span className="text-lg font-normal text-white mr-2">
//                             Fruitdish
//                         </span>
//                         <span className="text-xl font-semibold text-white">
//                             ₹165
//                         </span>
//                     </div>
//                     <div className="absolute left-0 bottom-0 w-full h-12 bg-green-600 text-white font-semibold uppercase opacity-0 transition-all duration-150 text-center flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 active:h-14 rounded-b-lg">
//                         Add to Cart
//                     </div>
//                 </div>

//                 {/* Card 2 */}
//                 <div className="relative w-full h-80 shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center bg-white hover:scale-105 active:scale-95 group rounded-lg">
//                     <div className="w-full h-full relative">
//                         <img
//                             src={noodles}
//                             alt="Noodles"
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                     </div>
//                     <div className="absolute flex items-center left-2 top-2 bg-opacity-90 bg-black py-1 px-3 rounded-lg">
//                         <span className="text-lg font-normal text-white mr-2">
//                             Noodles
//                         </span>
//                         <span className="text-xl font-semibold text-white">
//                             ₹200
//                         </span>
//                     </div>
//                     <div className="absolute left-0 bottom-0 w-full h-12 bg-green-600 text-white font-semibold uppercase opacity-0 transition-all duration-150 text-center flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 active:h-14 rounded-b-lg">
//                         Add to Cart
//                     </div>
//                 </div>

//                 {/* Card 3 */}
//                 <div className="relative w-full h-80 shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center bg-white hover:scale-105 active:scale-95 group rounded-lg">
//                     <div className="w-full h-full relative">
//                         <img
//                             src={hotdog}
//                             alt="Hotdog"
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                     </div>
//                     <div className="absolute flex items-center left-2 top-2 bg-opacity-90 bg-black py-1 px-3 rounded-lg">
//                         <span className="text-lg font-normal text-white mr-2">
//                             Hotdog
//                         </span>
//                         <span className="text-xl font-semibold text-white">
//                             ₹150
//                         </span>
//                     </div>
//                     <div className="absolute left-0 bottom-0 w-full h-12 bg-green-600 text-white font-semibold uppercase opacity-0 transition-all duration-150 text-center flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 active:h-14 rounded-b-lg">
//                         Add to Cart
//                     </div>
//                 </div>

//                 {/* Card 4 */}
//                 <div className="relative w-full h-80 shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center bg-white hover:scale-105 active:scale-95 group rounded-lg">
//                     <div className="w-full h-full relative">
//                         <img
//                             src={pancake}
//                             alt="Pancake"
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                     </div>
//                     <div className="absolute flex items-center left-2 top-2 bg-opacity-90 bg-black py-1 px-3 rounded-lg">
//                         <span className="text-lg font-normal text-white mr-2">
//                             Pancake
//                         </span>
//                         <span className="text-xl font-semibold text-white">
//                             ₹120
//                         </span>
//                     </div>
//                     <div className="absolute left-0 bottom-0 w-full h-12 bg-green-600 text-white font-semibold uppercase opacity-0 transition-all duration-150 text-center flex items-center justify-center group-hover:opacity-100 group-hover:translate-y-0 active:h-14 rounded-b-lg">
//                         Add to Cart
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Dashboard;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useState } from "react";
// import fruitdish from "../assets/fruitdish.jpg";
// import noodles from "../assets/noodles.jpg";
// import hotdog from "../assets/hotdog.jpg";
// import pancake from "../assets/pancake.jpg";
// import { useCart } from "./CartContext";

// const Dashboard = () => { 
//     const { addToCart } = useCart();
//     const [searchTerm, setSearchTerm] = useState("");

//     const products = [
//         { id: 1, name: "Fruitdish", price: 165, image: fruitdish },
//         { id: 2, name: "Noodles", price: 200, image: noodles },
//         { id: 3, name: "Hotdog", price: 150, image: hotdog },
//         { id: 4, name: "Pancake", price: 120, image: pancake },
//     ];

//     // Filter products based on search term
//     const filteredProducts = products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <header className="mb-6">
//                 <h1 className="text-2xl font-bold text-gray-800">MENU</h1>

//                 {/* Search Bar */}
//                 <input
//                     type="text"
//                     placeholder="Search for a dish..."
//                     className="w-full p-3 mt-4 border border-gray-300 rounded-md"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </header>

//             {/* Product Cards Section */}
//             <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product) => (
//                         <div
//                             key={product.id}
//                             className="relative w-full h-80 shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center bg-white hover:scale-105 active:scale-95 group rounded-lg"
//                         >
//                             <div className="w-full h-full relative">
//                                 <img
//                                     src={product.image}
//                                     alt={product.name}
//                                     className="w-full h-full object-cover rounded-lg"
//                                 />
//                             </div>
//                             <div className="absolute flex items-center left-2 top-2 bg-opacity-90 bg-black py-1 px-3 rounded-lg">
//                                 <span className="text-lg font-normal text-white mr-2">
//                                     {product.name}
//                                 </span>
//                                 <span className="text-xl font-semibold text-white">
//                                     ₹{product.price}
//                                 </span>
//                             </div>
//                             <div
//                                 onClick={() => addToCart(product)}
//                                 className="absolute left-0 bottom-0 w-full h-12 bg-green-600 text-white font-semibold uppercase opacity-0 transition-all duration-150 text-center flex items-center justify-center group-hover:opacity-100 active:h-14 rounded-b-lg"
//                             >
//                                 Add to Cart
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center text-xl text-gray-600">No results found</p>
//                 )}
//             </section>
//         </div>
//     );
// };

// export default Dashboard;



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from "react";
// import fruitdish from "../assets/fruitdish.jpg";
// import noodles from "../assets/noodles.jpg";
// import hotdog from "../assets/hotdog.jpg";
// import pancake from "../assets/pancake.jpg";
// import { useCart } from "./CartContext";

// const Dashboard = () => { 
//     const { addToCart } = useCart();
//     const [searchTerm, setSearchTerm] = useState("");

//     const products = [
//         { id: 1, name: "Fruitdish", price: 165, image: fruitdish },
//         { id: 2, name: "Noodles", price: 200, image: noodles },
//         { id: 3, name: "Hotdog", price: 150, image: hotdog },
//         { id: 4, name: "Pancake", price: 120, image: pancake },
//     ];

//     // Filter products based on search term
//     const filteredProducts = products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <header className="mb-6">
//                 <h1 className="text-2xl font-bold text-gray-800">MENU</h1>

//                 {/* Search Bar */}
//                 <input
//                     type="text"
//                     placeholder="Search for a dish..."
//                     className="w-full p-3 mt-4 border border-gray-300 rounded-md"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </header>

//             {/* Product Cards Section */}
//             <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product) => (
//                         <div
//                             key={product.id}
//                             className="relative w-full h-80 shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center bg-white hover:scale-105 active:scale-95 group rounded-lg"
//                         >
//                             <div className="w-full h-full relative">
//                                 <img
//                                     src={product.image}
//                                     alt={product.name}
//                                     className="w-full h-full object-cover rounded-lg"
//                                 />
//                             </div>
//                             <div className="absolute flex items-center left-2 top-2 bg-opacity-90 bg-black py-1 px-3 rounded-lg">
//                                 <span className="text-lg font-normal text-white mr-2">
//                                     {product.name}
//                                 </span>
//                                 <span className="text-xl font-semibold text-white">
//                                     ₹{product.price}
//                                 </span>
//                             </div>
//                             <div
//                                 onClick={() => addToCart(product)}
//                                 className="absolute left-0 bottom-0 w-full h-12 bg-green-600 text-white font-semibold uppercase opacity-0 transition-all duration-150 text-center flex items-center justify-center group-hover:opacity-100 active:h-14 rounded-b-lg"
//                             >
//                                 Add to Cart
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center text-xl text-gray-600">No results found</p>
//                 )}
//             </section>
//         </div>
//     );
// };

// export default Dashboard;



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState } from "react";
import fruitdish from "../assets/fruitdish.jpg";
import noodles from "../assets/noodles.jpg";
import hotdog from "../assets/hotdog.jpg";
import pancake from "../assets/pancake.jpg";
import { useCart } from "./CartContext";
import Sidebar from "./Navbar";

const Dashboard = () => {
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState("");

    const products = [
        { id: 1, name: "Fruitdish", price: 165, image: fruitdish },
        { id: 2, name: "Noodles", price: 200, image: noodles },
        { id: 3, name: "Hotdog", price: 150, image: hotdog },
        { id: 4, name: "Pancake", price: 120, image: pancake },
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex">
            <div className="flex-grow min-h-screen bg-gray-100 p-4 transition-all duration-300">
                <header className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800 text-center">Our Menu</h1>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search for a dish..."
                        className="w-full p-3 mt-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </header>

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

                {/* New Content Section */}
                <section className="mt-8">
                    <div className="bg-white rounded-md p-4 shadow-md">
                        <h3 className="text-lg font-bold text-gray-800">Special Offers</h3>
                        <p className="text-gray-700 mt-2">Enjoy exclusive discounts on your favorite dishes. Check back often for new deals!</p>
                    </div>

                    <div className="bg-white rounded-md p-4 shadow-md mt-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
                        <h3 className="text-md font-bold text-gray-700">Why Choose Us?</h3>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li>Fresh and high-quality ingredients</li>
                            <li>Quick and reliable service</li>
                            <li>Delicious recipes crafted with care</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
