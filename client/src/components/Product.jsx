import React from 'react';

export const Product = ({ product, addToCart }) => {
  return (
    <div onClick={() => addToCart(product)}>
      {/* <img src={product.imagem_do_produto} alt="" style={{ maxWidth: '100px' }} /> */}
      <span>{product.name}</span>
      <br />
      <span>R$ {product.price}</span>
    </div>
  );
};
