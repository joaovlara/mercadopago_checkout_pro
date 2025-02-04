import React from 'react';
import { Product } from './Product';
import { ProductList as ProductListStyle } from '../assets/styles';

const ProductList = ({ products, addToCart }) => {
  return (
    <ProductListStyle>
      <h2>Produtos</h2>
      {products.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </ProductListStyle>
  );
};

export default ProductList;
