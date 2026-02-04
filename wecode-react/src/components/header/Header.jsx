import { useState, useEffect } from 'react';
import LocationModal from '../locationModal/LocationModal';
import './Header.scss';

export default function Header({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('user_location') || 'Uberlândia, MG';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="header-left">
            <button className="icon-button menu-toggle" aria-label="Menu">
              <img src="/assets/icons/menu.svg" alt="Menu" />
            </button>
            <button className="icon-button" aria-label="Buscar">
              <img src="/assets/icons/search.svg" alt="Buscar" />
            </button>
          </div>

          <div className="header-logo">
            <img src="/assets/img/logo_white.svg" alt="Logo" className="logo-white" />
            <img src="/assets/img/logo_gray.svg" alt="Logo" className="logo-gray" />
          </div>

          <div className="header-right">
            <button className="icon-button" aria-label="Conta">
              <img src="/assets/icons/account.svg" alt="Conta" />
            </button>
            <button className="icon-button shop-button" aria-label="Carrinho">
              <img src="/assets/icons/shop.svg" alt="Carrinho" />
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <LocationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLocation}
      />
    </>
  );
}