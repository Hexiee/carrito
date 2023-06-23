import React from "react";
import "./Carrito.css";

//Se agrega a el carrito los productos
const Carrito = ({ cartItems, onRemoveFromCart }) => {
  const totalProducts = Object.values(cartItems).reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>
        <i className="bi bi-cart-fill cart-icon"></i> Carrito
      </h2>
      {Object.values(cartItems).length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <>
          <div className="cart-items">
            {Object.values(cartItems).map((product) => (
              <div key={product.id} className="cart-item-container">
                <div className="cart-item">
                  <p>Nombre : {product.title}</p>
                  <p>${product.price}</p>
                  <p>Cantidad: {product.quantity}</p>
                  <button onClick={() => onRemoveFromCart(product.id)}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="total-products">
            Total de productos: {totalProducts}
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;

