import React from 'react';
import styles from "./StyleBuscar.module.scss";

const Buscar = ({ setBusqueda }) => {
  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className="d-flex justify-content-center gap-4 mb-5">
        <input
          placeholder="Ingrese el nombre del producto"
          type="text"
          className={styles.input}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default Buscar;
