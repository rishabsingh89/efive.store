import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('efive_cart');
      const storedWishlist = localStorage.getItem('efive_wishlist');
      if (storedCart) setCartItems(JSON.parse(storedCart));
      if (storedWishlist) setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('efive_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('efive_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === productId);
      if (item && item.quantity > 1) {
        return prev.map(i => i.id === productId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== productId);
    });
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const deleteItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInCart = (productId) => cartItems.some(item => item.id === productId);
  const isInWishlist = (productId) => wishlistItems.some(item => item.id === productId);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    deleteItem,
    toggleWishlist,
    isInCart,
    isInWishlist,
    cartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
