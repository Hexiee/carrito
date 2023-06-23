import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Cards from "./components/Cards/Cards";
import Buscar from "./components/Buscar/Buscar";
import Carrito from "./components/Carrito/Carrito";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [fetchedData, updateFetchedData] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

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
  }, []);

  /* Se va iniciar en cartItems en localStorage utilizando stringify  */
  /* Se llaman en cartItems que fue definida en carrito para que cuando se reinicie la pagina los elementos del carrito no desaparescan*/
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      const existingProductIndex = updatedCartItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, incrementa la cantidad
        updatedCartItems[existingProductIndex].quantity += 1;
      } else {
        // Si el producto no existe en el carrito, agrega uno nuevo con cantidad 1
        updatedCartItems.push({ ...product, quantity: 1 });
      }

      return updatedCartItems;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item.id !== productId
      );
      return updatedCartItems;
    });
  };

  const filteredData = fetchedData.filter((product) =>
    product.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className="text-center ubuntu my-4">
        Productos <span className="text-danger">CT</span>
      </h1>

      <Buscar setBusqueda={setBusqueda} />

      <div className="container">
        <div className="row">
          <div className="col-3">
            <Carrito
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
            />
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
