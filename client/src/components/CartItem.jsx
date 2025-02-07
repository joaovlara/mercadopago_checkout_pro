import React from 'react';
import { CartItem as CartItemStyle, QuantitySelect } from '../assets/styles';

const CartItemComponent = ({ item }) => {
  return (
    <CartItemStyle>
      <span>{item.name}</span>
      <span>R$ {item.price * item.quantity}</span>
    </CartItemStyle>
  );
};

export default CartItemComponent;
