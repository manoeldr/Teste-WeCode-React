import { useState } from 'react';
import './size-modal.scss';

export default function SizeModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = [34, 35, 36, 37, 38, 39, 40, 41, 42];

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart({ ...product, size: selectedSize });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="size-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-info">
            <h3 className="modal-product-name">{product.name}</h3>
            
            <div className="modal-size-section">
              <p className="modal-size-label">
                Tamanho:{selectedSize && <span className="selected-size">{selectedSize}</span>}
              </p>
              
              <div className="size-buttons">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="modal-add-button"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Adicionar ao carrinho
              <img src="/assets/icons/shop/add-cart.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}