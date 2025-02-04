import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  height: 100vh;
  padding: 20px;
`;

export const ProductList = styled.span`
  flex: 1;
  border-right: 2px solid #ddd;
  padding: 20px;
`;

export const Cart = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const QuantitySelect = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

export const BuyButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #218838;
  }
`;