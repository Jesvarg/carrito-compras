import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartButton = ({ onClick }) => {
  const { totalItems } = useCart();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cart-navbar-button"
    >
      <div className="relative">
        <svg className="cart-navbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
        </svg>
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="cart-navbar-badge"
          >
            {totalItems}
          </motion.span>
        )}
      </div>
      <span className="cart-navbar-text">Carrito</span>
    </motion.button>
  );
};

export default CartButton;