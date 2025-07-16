import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import '../styles/Producto.css';

const Producto = ({ id, nombre, precio, imagen, descripcion }) => {
  const { agregarProducto } = useCart();

  const handleAgregar = () => {
    agregarProducto({ id, nombre, precio, imagen, descripcion });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="producto-card"
    >
      <div className="producto-image-container">
        <img
          src={imagen}
          alt={nombre}
          className="producto-image"
        />
        <div className="producto-image-overlay"></div>
      </div>
      
      <div className="producto-content">
        <h3 className="producto-title">
          {nombre}
        </h3>
        
        <p className="producto-description">
          {descripcion}
        </p>
        
        <div className="producto-footer">
          <span className="producto-price">
            ${precio.toLocaleString('es-CO')}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAgregar}
            className="producto-button"
          >
            <svg className="producto-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
            </svg>
            <span className="producto-button-text">Agregar</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Producto;