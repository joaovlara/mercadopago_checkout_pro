import React from 'react';

export const Product = ({ product, addToCart }) => {
  return (
    <div onClick={() => addToCart(product)}>
      <span>{product.name}</span>
      <span>R$ {product.price}</span>
    </div>
  );
};
