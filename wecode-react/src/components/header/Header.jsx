import { useState, useEffect } from 'react';
import './Header.scss';

export default function Header({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState('');
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      setLocation('Uberlândia, MG');
    }
  }, []);

  const fetchLocation = async (cepValue) => {
    setLoading(true);
    try {
      const cleanCep = cepValue.replace(/\D/g, '');
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      const newLocation = `${data.localidade}, ${data.uf}`;
      setLocation(newLocation);
      localStorage.setItem('user_location', newLocation);
      setIsChangingLocation(false);
      setCep('');
    } catch {
      alert('Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeLocation = () => {
    setIsChangingLocation(true);
  };

  const handleCepSubmit = (e) => {
    e.preventDefault();
    if (cep.length >= 8) {
      fetchLocation(cep);
    }
  };

  const handleCancelChange = () => {
    setIsChangingLocation(false);
    setCep('');
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-container">
          {!isChangingLocation ? (
            <>
              <span className="location-text">
                Você está em: <strong>{location}</strong>
              </span>
              <button className="change-location-btn" onClick={handleChangeLocation}>
                Alterar
              </button>
            </>
          ) : (
            <form className="location-form" onSubmit={handleCepSubmit}>
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                maxLength="9"
                className="cep-input"
                autoFocus
              />
              <button type="submit" className="confirm-btn" disabled={loading}>
                {loading ? 'Buscando...' : 'Confirmar'}
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancelChange}>
                Cancelar
              </button>
            </form>
          )}
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
    </>
  );
}