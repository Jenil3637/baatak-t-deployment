


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   // Get initial cart from localStorage, if available
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Save the cart to localStorage whenever it changes
//   useEffect(() => {
//     if (cart.length > 0) {
//       localStorage.setItem('cart', JSON.stringify(cart));
//     } else {
//       localStorage.removeItem('cart'); // Clear cart in localStorage when empty
//     }
//   }, [cart]);

//   // Add item to cart (or update quantity if it already exists)
//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
//       if (existingItem) {
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prevCart, { ...item, quantity: 1 }];
//     });
//   };

//   // Increase the quantity of a specific item in the cart
//   const increaseQuantity = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((cartItem) =>
//         cartItem.id === id
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       )
//     );
//   };

//   // Decrease the quantity of a specific item in the cart, or remove it if quantity reaches 0
//   const decreaseQuantity = (id) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((cartItem) =>
//           cartItem.id === id
//             ? { ...cartItem, quantity: cartItem.quantity - 1 }
//             : cartItem
//         )
//         .filter((cartItem) => cartItem.quantity > 0) // Remove item if quantity is 0 or less
//     );
//   };

//   // Remove item from cart
//   const removeFromCart = (id) => {
//     setCart((prevCart) =>
//       prevCart.filter((cartItem) => cartItem.id !== id)
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         decreaseQuantity,
//         increaseQuantity
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

///////////////////////////////////////////////////////////////////////////////////

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Get initial cart from localStorage, if available
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  });

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); // Clear cart in localStorage when empty
    }
  }, [cart]);

  // Add item to cart (or update quantity if it already exists)
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Increase the quantity of a specific item in the cart
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  // Decrease the quantity of a specific item in the cart, or remove it if quantity reaches 0
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0) // Remove item if quantity is 0 or less
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
