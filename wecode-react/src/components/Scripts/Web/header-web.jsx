import { useHeader } from '../../Main/useHeader';
import LocationModalWeb from './location-modal-web';
import '../../Styles/Web/header-web.scss';

export default function HeaderWeb({ cartCount = 0, onCartClick }) {
  const {
    scrolled,
    location,
    isModalOpen,
    isProductsOpen,
    selectedProduct,
    activeNav,
    products,
    handleOpenModal,
    handleCloseModal,
    handleSaveLocation,
    handleProductsToggle,
    handleProductHover,
    handleNavClick
  } = useHeader();

  return (
    <>
      <div className="top-bar top-bar-web">
        <div className="top-bar-container">
          <span className="location-text">
            Você está em: <strong>{location}</strong>
          </span>
          <button className="change-location-btn" onClick={handleOpenModal}>
            Alterar
          </button>
        </div>
      </div>

      <header className={`header header-web ${scrolled ? 'scrolled' : ''}`}>
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

            <div className="nav-item nav-item-outlet">
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
                  className="outlet-indicator"
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
            <button className="icon-button shop-button" aria-label="Carrinho" onClick={onCartClick}>
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

      <LocationModalWeb
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLocation}
      />
    </>
  );
}