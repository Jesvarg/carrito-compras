import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// Crear el contexto
const CartContext = createContext();

// Acciones del reducer
const CART_ACTIONS = {
  AGREGAR_PRODUCTO: 'AGREGAR_PRODUCTO',
  ELIMINAR_PRODUCTO: 'ELIMINAR_PRODUCTO',
  INCREMENTAR_CANTIDAD: 'INCREMENTAR_CANTIDAD',
  DECREMENTAR_CANTIDAD: 'DECREMENTAR_CANTIDAD',
  VACIAR_CARRITO: 'VACIAR_CARRITO'
};

// Función para obtener el estado inicial desde localStorage
const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error al cargar el carrito desde localStorage:', error);
    return [];
  }
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.AGREGAR_PRODUCTO: {
      const { producto } = action.payload;
      const existingProduct = state.find(item => item.id === producto.id);
      
      if (existingProduct) {
        // Si el producto ya existe, incrementar la cantidad
        return state.map(item =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo con cantidad 1
        return [...state, { ...producto, quantity: 1 }];
      }
    }
    
    case CART_ACTIONS.ELIMINAR_PRODUCTO: {
      const { id } = action.payload;
      return state.filter(item => item.id !== id);
    }
    
    case CART_ACTIONS.INCREMENTAR_CANTIDAD: {
      const { id } = action.payload;
      return state.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    
    case CART_ACTIONS.DECREMENTAR_CANTIDAD: {
      const { id } = action.payload;
      return state.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0);
    }
    
    case CART_ACTIONS.VACIAR_CARRITO: {
      return [];
    }
    
    default:
      return state;
  }
};

// Provider del contexto
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialState);
  const [toasts, setToasts] = useState([]);

  // Guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }, [cart]);

  // Función para mostrar notificaciones
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  // Función para agregar producto
  const agregarProducto = (producto) => {
    dispatch({ type: CART_ACTIONS.AGREGAR_PRODUCTO, payload: { producto } });
    showToast(`${producto.nombre} agregado al carrito`, 'success');
  };

  // Función para eliminar producto
  const eliminarProducto = (id, nombre) => {
    dispatch({ type: CART_ACTIONS.ELIMINAR_PRODUCTO, payload: { id } });
    showToast(`${nombre} eliminado del carrito`, 'error');
  };

  // Función para incrementar cantidad
  const incrementarCantidad = (id, nombre) => {
    dispatch({ type: CART_ACTIONS.INCREMENTAR_CANTIDAD, payload: { id } });
    showToast(`${nombre} añadido`, 'success');
  };

  // Función para decrementar cantidad
  const decrementarCantidad = (id, nombre) => {
    dispatch({ type: CART_ACTIONS.DECREMENTAR_CANTIDAD, payload: { id } });
    showToast(`${nombre} eliminado` , 'info');
  };

  // Función para vaciar carrito
  const vaciarCarrito = () => {
    dispatch({ type: CART_ACTIONS.VACIAR_CARRITO });
    showToast('Carrito vaciado', 'info');
  };

  // Calcular total del carrito
  const total = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

  // Calcular cantidad total de items
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    cart,
    agregarProducto,
    eliminarProducto,
    incrementarCantidad,
    decrementarCantidad,
    vaciarCarrito,
    total,
    totalItems,
    toasts,
    showToast,
    removeToast
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export default CartContext;