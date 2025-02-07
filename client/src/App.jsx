import React, { useState } from 'react';
import { Container } from './assets/styles';
import products from './data/items';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

import { handleIntegrationMP, checkPaymentStatus, getPaymentIdByPreference } from './services/apiMercadoPago';

import { initMercadoPago } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-579c8a18-d8e2-479e-9c5b-2b688155e5c3');

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
  
    if (existingItem) {
      alert("Produto já adicionado ao carrinho!");
      return;
    }
  
    setCart([...cart, { ...product, quantity: 1 }]);
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
      <Cart cart={cart} handlePurchase={handlePurchase} />
    </Container>
  );
};

export default App;
