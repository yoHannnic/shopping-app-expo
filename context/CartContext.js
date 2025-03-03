import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cart]);

  const addToCart = (product) => {
    if (!product || !product.id || !product.name || product.price < 0) {
      console.error("Invalid product details");
      return;
    }
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return prevCart.some((item) => item.id === product.id)
        ? updatedCart
        : [...updatedCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    if (typeof id !== "number" || typeof change !== "number") {
      console.error("Invalid input for updating quantity");
      return;
    }
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 0) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    if (typeof id !== "number") {
      console.error("Invalid product ID for removal");
      return;
    }
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
