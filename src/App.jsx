import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Cards from "./components/Cards/Cards";
import Filters from "./components/FIlters/Filters";
import Buscar from "./components/Buscar/Buscar";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [fetchedData, updateFetchedData] = useState([]);

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

  return (
    <div className="App">
      <h1 className="text-center ubuntu my-4">
        Productos <span className="text-danger">CT</span>
      </h1>

      <Buscar setBusqueda={setBusqueda} />

      <div className="container">
        <div className="row">
          <div className="col-3">
            <Filters />
          </div>
          <div className="col-8">
            <div className="row">
              {filteredData.length > 0 ? (
                filteredData.map((product) => (
                  <Cards key={product.id} product={product} />
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
