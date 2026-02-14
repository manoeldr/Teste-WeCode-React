import { useHeader } from '../../Main/useHeader';
import LocationModalMobile from './location-modal-mobile';
import MobileMenu from '../../mobile-menu/mobile-menu';
import '../../Styles/Mobile/header-mobile.scss';

export default function HeaderMobile({ cartCount = 0, onCartClick }) {
  const {
    scrolled,
    location,
    isModalOpen,
    isMobileMenuOpen,
    handleOpenModal,
    handleCloseModal,
    handleSaveLocation,
    handleOpenMobileMenu,
    handleCloseMobileMenu
  } = useHeader();

  return (
    <>
      <div className="top-bar top-bar-mobile">
        <div className="top-bar-container">
          <span className="location-text">
            Você está em: <strong>{location}</strong>
          </span>
          <button className="change-location-btn" onClick={handleOpenModal}>
            Alterar
          </button>
        </div>
      </div>

      <header className={`header header-mobile ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-mobile-content">
            <button className="icon-button" onClick={handleOpenMobileMenu}>
              <img src="/assets/icons/menu.svg" alt="Menu" />
            </button>
            
            <button className="icon-button">
              <img src="/assets/icons/search.svg" alt="Buscar" />
            </button>

            <div className="header-logo-mobile">
              <img src="/assets/img/logo_white.svg" alt="Logo" className="logo-white" />
              <img src="/assets/img/logo_gray.svg" alt="Logo" className="logo-gray" />
            </div>

            <button className="icon-button">
              <img src="/assets/icons/account.svg" alt="Conta" />
            </button>

            <button className="icon-button shop-button" onClick={onCartClick}>
              <img src="/assets/icons/shop.svg" alt="Carrinho" />
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <LocationModalMobile
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLocation}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
      />
    </>
  );
}