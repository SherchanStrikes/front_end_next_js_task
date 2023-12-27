import React from "react";
import { useCart } from "../../components/context/CartContext";
import { Row } from "react-bootstrap";

const Cart = () => {
  const { cart } = useCart();

  return (
    <Row>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.title} - ${item.price}
          </li>
        ))}
      </ul>
    </Row>
  );
};

export default Cart;
