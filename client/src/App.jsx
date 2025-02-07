import React, { useState } from 'react';
import { Container } from './assets/styles';
import products from './data/items';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

import { handleIntegrationMP, checkPaymentStatus, getPaymentIdByPreference } from './services/apiMercadoPago';

import { initMercadoPago } from '@mercadopago/sdk-react'
initMercadoPago('PUBLIC_KEY');

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

  const handlePurchase = async () => {
    try {
      const response = await handleIntegrationMP();
      const { init_point, preference_id } = response;

      window.open(init_point, "_blank");

      const interval = setInterval(async () => {
        const payment_id = await getPaymentIdByPreference(preference_id);
        if (payment_id) {
          const status = await checkPaymentStatus(payment_id);
          setPaymentStatus(status);
          clearInterval(interval);
        }
      }, 3000);
    } catch (error) {
      console.error("Erro ao iniciar pagamento", error);
    }
  };

  return (
    <Container>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} updateQuantity={updateQuantity} handlePurchase={handlePurchase} />
    </Container>
  );
};

export default App;
