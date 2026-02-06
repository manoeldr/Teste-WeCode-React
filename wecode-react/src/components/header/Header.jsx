import { useState, useEffect } from 'react';
import LocationModal from '../LocationModal/LocationModal';
import './Header.scss';

export default function Header({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('user_location') || 'Uberlândia, MG';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('sapatos');
  const [activeNav, setActiveNav] = useState('');

  const products = [
    { id: 'sapatos', name: 'Sapatos', image: '/assets/menu-products/menu-products-1.svg' },
    { id: 'scarpins', name: 'Scarpins', image: '/assets/menu-products/menu-products-2.svg' },
    { id: 'sandalias', name: 'Sandálias', image: '/assets/menu-products/menu-products-3.svg' },
    { id: 'botas', name: 'Botas', image: '/assets/menu-products/menu-products-4.svg' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProductsOpen && !e.target.closest('.nav-item.dropdown') && !e.target.closest('.dropdown-menu')) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProductsOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('user_location', newLocation);
  };

  const handleProductsToggle = () => {
    setIsProductsOpen(!isProductsOpen);
    setActiveNav(isProductsOpen ? '' : 'produtos');
  };

  const handleProductHover = (productId) => {
    setSelectedProduct(productId);
  };

  const handleNavClick = (e, navId) => {
    e.preventDefault();
    setActiveNav(navId);
    if (navId !== 'produtos') {
      setIsProductsOpen(false);
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-container">
          <span className="location-text">
            Você está em: <strong>{location}</strong>
          </span>
          <button className="change-location-btn" onClick={handleOpenModal}>
            Alterar
          </button>
        </div>
      </div>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-logo">
            <img src="/assets/img/logo_white.svg" alt="Logo" className="logo-white" />
            <img src="/assets/img/logo_gray.svg" alt="Logo" className="logo-gray" />
          </div>

          <nav className="header-nav">
            <div className="nav-item dropdown">
              <button 
                className={`nav-link ${activeNav === 'produtos' ? 'active' : ''}`}
                onClick={handleProductsToggle}
              >
                Produtos
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="2 4 6 8 10 4"></polyline>
                </svg>
              </button>
              {activeNav === 'produtos' && (
                <img 
                  src="/assets/menu-products/menu-bar.svg" 
                  alt="Indicador" 
                  className="nav-indicator"
                />
              )}
            </div>

            <div className="nav-item">
              <a 
                href="#" 
                className={`nav-link ${activeNav === 'lancamentos' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'lancamentos')}
              >
                Lançamentos
              </a>
              {activeNav === 'lancamentos' && (
                <img 
                  src="/assets/menu-products/menu-bar.svg" 
                  alt="Indicador" 
                  className="nav-indicator"
                />
              )}
            </div>

            <div className="nav-item">
              <a 
                href="#" 
                className={`nav-link outlet ${activeNav === 'outlet' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'outlet')}
              >
                Outlet
              </a>
              {activeNav === 'outlet' && (
                <img 
                  src="/assets/menu-products/menu-bar.svg" 
                  alt="Indicador" 
                  className="nav-indicator"
                />
              )}
            </div>
          </nav>

          <div className="header-right">
            <button className="icon-button" aria-label="Buscar">
              <img src="/assets/icons/search.svg" alt="Buscar" />
            </button>
            <button className="icon-button" aria-label="Conta">
              <img src="/assets/icons/account.svg" alt="Conta" />
            </button>
            <button className="icon-button shop-button" aria-label="Carrinho">
              <img src="/assets/icons/shop.svg" alt="Carrinho" />
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>

        {isProductsOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-content">
              <ul className="dropdown-list">
                {products.map((product) => (
                  <li 
                    key={product.id}
                    onMouseEnter={() => handleProductHover(product.id)}
                  >
                    <a href="#" className={`dropdown-item ${selectedProduct === product.id ? 'active' : ''}`}>
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="dropdown-image">
                <img 
                  src={products.find(p => p.id === selectedProduct)?.image} 
                  alt={products.find(p => p.id === selectedProduct)?.name}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      <LocationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLocation}
      />
    </>
  );
}