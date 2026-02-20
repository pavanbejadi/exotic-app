import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const addCartItem = (product) => {
    setCartList((prevList) => {
      // Check if item already exists to increment quantity instead of duplicating
      const isItemInCart = prevList.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevList.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }
      return [...prevList, { ...product, quantity: 1 }];
    });
  };

  const removeCartItem = (id) => {
    setCartList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartList, addCartItem, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access
export const useCart = () => useContext(CartContext);
