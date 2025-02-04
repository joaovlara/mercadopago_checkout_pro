import React from 'react';
import { Cart as CartStyle, BuyButton } from '../assets/styles';
import CartItem from './CartItem';

const Cart = ({ cart, updateQuantity, handlePurchase }) => {
  return (
    <CartStyle>
      <h2>Carrinho</h2>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />
          ))}
          <BuyButton onClick={handlePurchase}>Comprar</BuyButton>
        </>
      ) : (
        <p>Itens adicionados aparecerão aqui.</p>
      )}
    </CartStyle>
  );
};

export default Cart;
