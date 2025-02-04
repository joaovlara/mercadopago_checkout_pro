import React, { useState } from "react";
import { Container, ProductList, Cart, CartItem, Product, QuantitySelect, BuyButton } from "./assets/styles";
import products from "./data/items";

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
    alert("Compra realizada com sucesso!");
};

  return (
    <Container>
      <ProductList>
        <h2>Produtos</h2>
        {products.map((product) => (
          <Product key={product.id} onClick={() => addToCart(product)}>
            <span>{product.name}</span>
            <span>R$ {product.price}</span>
          </Product>
        ))}
      </ProductList>
      <Cart>
        <h2>Carrinho</h2>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <CartItem key={item.id}>
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
              </CartItem>
            ))}
            <BuyButton onClick={handlePurchase}>Comprar</BuyButton>
          </>
        ) : (
          <p>Itens adicionados aparecerão aqui.</p>
        )}
      </Cart>
    </Container>
  );
};

export default App;