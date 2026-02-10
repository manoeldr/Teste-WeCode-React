import { useState, useEffect } from 'react';
import './minicart-web.scss';
import './minicart-mobile.scss';

export default function Minicart({ isOpen, onClose, cartItems = [], onRemoveItem, onUpdateQuantity }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = item.oldPrice || item.price;
      return sum + (itemPrice * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((sum, item) => {
      if (item.oldPrice) {
        return sum + ((item.oldPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = subtotal - discount;

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <>
      <div className="minicart-overlay" onClick={onClose} />
      <div className={`minicart ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className="minicart-header">
          <h2 className="minicart-title">Carrinho</h2>
          <button className="minicart-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="minicart-content">
          {cartItems.length === 0 ? (
            <p className="empty-message">Seu carrinho está vazio</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-size">Tamanho: <span>{item.selectedSize}</span></p>
                      <p className="cart-item-price">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => onUpdateQuantity(index, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(index, 1)}>+</button>
                    </div>
                    <button className="remove-button" onClick={() => onRemoveItem(index)}>
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="minicart-footer">
            <div className="totals">
              <div className="total-row">
                <span className="total-label">Subtotal</span>
                <span className="total-value">{formatPrice(subtotal)}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Descontos</span>
                <span className="total-value discount">-{formatPrice(discount)}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Total</span>
                <span className="total-value">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="footer-actions">
              <button className="checkout-button">Finalizar pedido</button>
              <button className="continue-shopping" onClick={onClose}>
                Continuar comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}