import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import '../styles/Carrito.css';

const Carrito = ({ isOpen, setIsOpen }) => {
  const { cart, eliminarProducto, incrementarCantidad, decrementarCantidad, vaciarCarrito, total, totalItems, showToast } = useCart();
  const [confirmAction, setConfirmAction] = useState(null);

  const handleEliminar = (id, nombre) => {
    setConfirmAction({
      type: 'eliminar',
      message: `¿Eliminar ${nombre} del carrito?`,
      action: () => {
        eliminarProducto(id, nombre);
        setConfirmAction(null);
      }
    });
  };

  const handleVaciar = () => {
    setConfirmAction({
      type: 'vaciar',
      message: '¿Vaciar todo el carrito?',
      action: () => {
        vaciarCarrito();
        setIsOpen(false);
        setConfirmAction(null);
      }
    });
  };

  const handleDecrementar = (id, nombre, quantity) => {
    if (quantity === 1) {
      setConfirmAction({
        type: 'eliminar',
        message: `¿Eliminar ${nombre} del carrito?`,
        action: () => {
          eliminarProducto(id, nombre);
          setConfirmAction(null);
        }
      });
    } else {
      decrementarCantidad(id, nombre);
    }
  };

  const handleProcederPago = () => {
    setConfirmAction({
      type: 'info',
      message: 'Esta función se implementará a futuro',
      action: () => {
        setConfirmAction(null);
      },
      isInfo: true
    });
  };

  return (
    <>
      {/* Modal del carrito */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="carrito-overlay"
            />
            
            {/* Panel del carrito */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="carrito-panel"
            >
              {/* Header */}
              <div className="carrito-header">
                <div className="carrito-header-content">
                  <h2 className="carrito-title">Mi Carrito</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="carrito-close-button"
                  >
                    <svg className="carrito-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                <p className="carrito-subtitle">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                </p>
              </div>

              {/* Contenido del carrito */}
              <div className="carrito-content">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="carrito-empty"
                  >
                    <svg className="carrito-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
                    </svg>
                    <p className="carrito-empty-title">Tu carrito está vacío</p>
                    <p className="carrito-empty-description">Agrega algunos productos para comenzar</p>
                  </motion.div>
                ) : (
                  <div className="carrito-items">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="carrito-item"
                        >
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="carrito-item-image"
                          />
                          
                          <div className="carrito-item-info">
                            <h3 className="carrito-item-name">{item.nombre}</h3>
                            <div className="carrito-item-controls-container">
                              <div className="carrito-quantity-controls">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDecrementar(item.id, item.nombre, item.quantity)}
                                  className="carrito-control-button carrito-decrement"
                                >
                                  <svg className="carrito-control-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </motion.button>
                                <span className="carrito-item-quantity">{item.quantity}</span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => incrementarCantidad(item.id, item.nombre)}
                                  className="carrito-control-button carrito-increment"
                                >
                                  <svg className="carrito-control-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                </motion.button>
                              </div>
                            </div>
                            <p className="carrito-item-price">
                              ${(item.precio * item.quantity).toLocaleString('es-CO')}
                            </p>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEliminar(item.id, item.nombre)}
                            className="carrito-control-button carrito-remove"
                          >
                            <svg className="carrito-remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer con total y acciones */}
              {cart.length > 0 && (
                <div className="carrito-footer">
                  <div className="carrito-total">
                    <span className="carrito-total-label">Total:</span>
                    <span className="carrito-total-amount">
                      ${total.toLocaleString('es-CO')}
                    </span>
                  </div>
                  
                  <div className="carrito-actions">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleProcederPago}
                      className="carrito-pay-button"
                    >
                      Proceder al Pago
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleVaciar}
                      className="carrito-clear-button"
                    >
                      Vaciar Carrito
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de confirmación personalizado */}
      <AnimatePresence>
        {confirmAction && (
          <>
            {/* Overlay de confirmación */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-overlay"
            />
            
            {/* Modal de confirmación */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="modal-container"
            >
              <div className="modal-content">
                {/* Icono */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  className="modal-icon"
                >
                  {confirmAction.isInfo ? (
                    <svg className="modal-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="modal-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                </motion.div>
                
                {/* Mensaje */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="modal-title"
                >
                  {confirmAction.isInfo ? 'Información' : 'Confirmar acción'}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="modal-description"
                >
                  {confirmAction.message}
                </motion.p>
                
                {/* Botones */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="modal-actions"
                >
                  {confirmAction.isInfo ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={confirmAction.action}
                      className="modal-confirm-button"
                    >
                      Aceptar
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConfirmAction(null)}
                        className="modal-cancel-button"
                      >
                        Cancelar
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={confirmAction.action}
                        className="modal-confirm-button"
                      >
                        Confirmar
                      </motion.button>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Carrito;