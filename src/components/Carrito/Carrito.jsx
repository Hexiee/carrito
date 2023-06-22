import React from "react";
import "./Carrito.css";

const Carrito = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((product) => (
            <div key={product.id} className="cart-item">
              <p>{product.title}</p>
              <p>{product.price}</p>
              <button onClick={() => onRemoveFromCart(product.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carrito;
