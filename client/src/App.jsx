import React, { useState } from 'react';
import { Container } from './assets/styles';
import products from './data/items';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const handlePurchase = () => {
    alert('Compra realizada com sucesso!');
  };

  return (
    <Container>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} updateQuantity={updateQuantity} handlePurchase={handlePurchase} />
    </Container>
  );
};

export default App;
