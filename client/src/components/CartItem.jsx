import React from 'react';
import { CartItem as CartItemStyle, QuantitySelect } from '../assets/styles';

const CartItemComponent = ({ item, updateQuantity }) => {
  return (
    <CartItemStyle>
      <span>{item.name}</span>
      <QuantitySelect
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, e.target.value)}
      >
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </QuantitySelect>
      <span>R$ {item.price * item.quantity}</span>
    </CartItemStyle>
  );
};

export default CartItemComponent;
