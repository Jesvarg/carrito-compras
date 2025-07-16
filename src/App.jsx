import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Producto from './components/Producto';
import Carrito from './components/Carrito';
import CartButton from './components/CartButton';
import Toast from './components/Toast';
import { productos } from './data/productos';
import './styles/App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nombre'); // 'nombre', 'precio-asc', 'precio-desc'

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'precio-asc':
        return filtered.sort((a, b) => a.precio - b.precio);
      case 'precio-desc':
        return filtered.sort((a, b) => b.precio - a.precio);
      case 'nombre':
      default:
        return filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  }, [searchTerm, sortBy]);

  return (
    <CartProvider>
      <div className="app-container">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="header"
        >
          <div className="header-content">
            <div className="header-flex">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="logo">
                  🛒 TechStore
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="header-features"
              >
                <div className="feature-item">
                  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="feature-text">Envío gratis</span>
                </div>
                <div className="feature-item">
                  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="feature-text">Garantía oficial</span>
                </div>
                <CartButton onClick={() => setIsCartOpen(true)} />
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="hero"
        >
          <div className="hero-content">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hero-title"
            >
              Descubre la mejor Tecnología
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="hero-description"
            >
              Explora nuestra colección de productos premium con la mejor calidad y precios competitivos
            </motion.p>
          </div>
        </motion.section>

        {/* Productos */}
        <main className="products-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="products-header"
          >
            <h2 className="products-title">Productos Destacados</h2>
            <p className="products-description">
              Selecciona los mejores productos tecnológicos y agrégalos a tu carrito con un solo clic
            </p>
            
            {/* Barra de búsqueda y filtros */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="search-filter-container"
            >
              {/* Barra de búsqueda */}
              <div className="search-container">
                <div className="search-input-wrapper">
                  <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="search-clear"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Filtro de ordenamiento */}
              <div className="sort-container">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="nombre">Ordenar por Nombre</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                </select>
              </div>
            </motion.div>
            
            {/* Contador de resultados */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="search-results-info"
              >
                <p className="results-text">
                  {filteredAndSortedProducts.length} resultado{filteredAndSortedProducts.length !== 1 ? 's' : ''} 
                  {searchTerm && ` para "${searchTerm}"`}
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="products-grid"
          >
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((producto, index) => (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <Producto
                    id={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                    descripcion={producto.descripcion}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="no-results"
              >
                <div className="no-results-content">
                  <svg className="no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.566M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3>No se encontraron productos</h3>
                  <p>Intenta con otros términos de búsqueda</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="clear-search-btn"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="footer"
        >
          <div className="footer-content">
            <div className="footer-grid">
              <div className="footer-brand">
                <h3 className="footer-brand-title">TechStore</h3>
                <p className="footer-brand-description">
                  Tu tienda de confianza para los mejores productos tecnológicos del mercado.
                </p>
              </div>
              <div>
                <h4 className="footer-section-title">Contacto</h4>
                <div className="footer-contact">
                  <p>📧 info@techstore.com</p>
                  <p>📱 +34 123 456 789</p>
                  <p>📍 Madrid, España</p>
                </div>
              </div>
              <div>
                <h4 className="footer-section-title">Síguenos</h4>
                <div className="footer-social">
                  <a href="#" className="footer-social-link">
                    <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116c.73 0 1.323-.594 1.323-1.326V1.326C24 .593 23.406 0 22.675 0z"/>
                    </svg>
                  </a>
                  <a href="#" className="footer-social-link">
                    <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.267 3H23L15.6 10.64 24 21h-7.148l-5.582-6.769L4.8 21H2l8.933-9.167L0 3h7.333l5.029 6.103L20.267 3zM18.686 19h2.145L7.346 5H5.07l13.616 14z"/>
                    </svg>
                  </a>
                  <a href="#" className="footer-social-link">
                    <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 TechStore. Todos los derechos reservados.</p>
            </div>
          </div>
        </motion.footer>

        {/* Componentes flotantes */}
        <Carrito isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        <Toast />
      </div>
    </CartProvider>
  );
}

export default App;
