import { useState } from 'react';
import './mobile-menu.scss';

export default function MobileMenu({ isOpen, onClose }) {
  const [isSapatosOpen, setIsSapatosOpen] = useState(false);

  const menuItems = [
    { name: 'Liquidação', link: '#' },
    { 
      name: 'Sapatos', 
      submenu: ['Scarpins', 'Mocassim', 'Sapatilhas', 'Mules', 'Peep Toe', 'Oxford']
    },
    { name: 'Sandálias', link: '#' },
    { name: 'Botas', link: '#' },
    { name: 'Tênis', link: '#' },
    { name: 'Outlet', link: '#', isOutlet: true }
  ];

  const handleSapatosClick = (e) => {
    e.preventDefault();
    setIsSapatosOpen(!isSapatosOpen);
  };

  return (
    <>
      {isOpen && <div className="mobile-menu-overlay" onClick={onClose} />}
      
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <img src="/assets/img/logo_gray.svg" alt="Logo Bebecê" className="mobile-menu-logo" />
          <button className="mobile-menu-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="mobile-menu-banner">
          <img src="/assets/banners/banner-principal/banner-principal-3.svg" alt="Banner" />
          <div className="banner-overlay">
            <span className="banner-title">Celebration - 20 anos</span>
            <a href="#" className="banner-link">Conheça</a>
          </div>
        </div>

        <nav className="mobile-menu-list">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <a 
                    href="#" 
                    className="mobile-menu-item"
                    onClick={handleSapatosClick}
                  >
                    {item.name}
                    <span className={`menu-arrow ${isSapatosOpen ? 'open' : ''}`}>›</span>
                  </a>
                  {isSapatosOpen && (
                    <div className="mobile-submenu">
                      {item.submenu.map((subitem, subindex) => (
                        <a 
                          key={subindex} 
                          href="#" 
                          className="mobile-submenu-item"
                          onClick={onClose}
                        >
                          {subitem}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a 
                  href={item.link} 
                  className={`mobile-menu-item ${item.isOutlet ? 'outlet' : ''}`}
                  onClick={onClose}
                >
                  {item.name}
                  <span className="menu-arrow">›</span>
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}