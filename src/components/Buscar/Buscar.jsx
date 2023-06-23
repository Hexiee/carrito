import React, { useState } from 'react';
import styles from './StyleBuscar.module.scss';

const Buscar = ({ setBusqueda }) => {
  const [busquedaInput, setBusquedaInput] = useState('');
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [estadoFormulario, setEstadoFormulario] = useState(null);

  const handleInputChange = (e) => {
    setBusquedaInput(e.target.value);
  };

  const handleBuscarClick = (e) => {
    e.preventDefault();
    
    if (busquedaInput.trim() === '') {
      setEstadoFormulario('error');
    } else {
      setEstadoFormulario('exito');
      setBusqueda(busquedaInput);
    }

    setFormularioEnviado(true);
  };

  //Cuando se de click al boton enviar 
  // Si no hay nada escrito en la barra de busqueda, Se iniciara la alerta (mensajeError)
  // Si hay un mensaje escrito en la barra , se iniciara la alerta (mensajeExito)
  // Sin embargo si no encuentra producto con el nombre señalado. 
  // por ejemplo (ashjdhajsdad) saltara un mensaje de producto no encontrado
  return (
    <div className={styles.container}>
      <form className="d-flex justify-content-center gap-4 mb-5">
        <input
          placeholder="Buscar por nombre de producto"
          type="text"
          className={styles.input}
          value={busquedaInput}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary fs-5" onClick={handleBuscarClick}>
          Buscar
        </button>
      </form>
      {formularioEnviado && estadoFormulario === 'exito' && (
        <p className={`${styles.mensaje} ${styles.mensajeExito}`}>
          ¡Búsqueda enviada con éxito!
        </p>
      )}
      {formularioEnviado && estadoFormulario === 'error' && (
        <p className={`${styles.mensaje} ${styles.mensajeError}`}>
          Por favor, ingresa un valor válido.
        </p>
      )}
    </div>
  );
};

export default Buscar;
