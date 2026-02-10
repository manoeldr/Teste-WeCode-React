import { useState, useEffect } from 'react';
import './size-modal-web.scss';
import './size-modal-mobile.scss';

export default function SizeModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sizes = [33, 34, 35, 36, 37, 38, 39, 40];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart({
        ...product,
        selectedSize
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={isMobile ? "modal-content-mobile" : "modal-content"}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {!isMobile && (
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>
        )}
        
        <div className={isMobile ? "modal-info-mobile" : "modal-info"}>
          <h3 className="modal-product-name">{product.name}</h3>
          
          <div className="modal-sizes">
            <p className="modal-sizes-title">
              {selectedSize ? `Tamanho: ${selectedSize}` : 'Selecione o tamanho:'}
            </p>
            <div className={isMobile ? "sizes-grid-mobile" : "sizes-grid"}>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="add-to-cart-button" 
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}