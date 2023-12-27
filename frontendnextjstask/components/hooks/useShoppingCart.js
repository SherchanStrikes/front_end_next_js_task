import { useState } from 'react';

const useShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return {
    cart,
    addToCart,
  };
};

export default useShoppingCart;
