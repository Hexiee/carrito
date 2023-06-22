import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Cards from "./components/Cards/Cards";
import Buscar from "./components/Buscar/Buscar";
import Carrito from "./components/Carrito/Carrito";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [fetchedData, updateFetchedData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  

  let api = "https://fakestoreapi.com/products";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(api);
        const data = await response.json();
        updateFetchedData(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }

    fetchData();
  }, [api]);

  const filteredData = fetchedData.filter((product) =>
    product.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleAddToCart = (product) => {
    // Validar el precio 
    if (isNaN(product.price) || parseFloat(product.price) <= 0) {
      alert("Ingrese un precio válido para el producto.");
      return;
    }
  
    // Validar nombre del producto 
    if (product.title.trim() === "") {
      alert("Ingrese un nombre válido para el producto.");
      return;
    }
  
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
  
      if (updatedCartItems.hasOwnProperty(product.id)) {
        updatedCartItems[product.id].quantity += 1;
      } else {
        updatedCartItems[product.id] = { ...product, quantity: 1 };
      }
  
      return updatedCartItems;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      delete updatedCartItems[productId];
      return { ...updatedCartItems };
    });
  };

  

  return (
    <div className="App">
      <h1 className="text-center ubuntu my-4">
        Productos <span className="text-danger">CT</span>
      </h1>

      <Buscar setBusqueda={setBusqueda} />

      <div className="container">
        <div className="row">
          <div className="col-3">
            <Carrito cartItems={Object.values(cartItems)} onRemoveFromCart={handleRemoveFromCart} />
          </div>
          <div className="col-8">
            <div className="row">
              {filteredData.length > 0 ? (
                filteredData.map((product) => (
                  <Cards
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <p>No se encontraron productos</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
