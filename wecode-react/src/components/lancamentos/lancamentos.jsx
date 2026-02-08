import { useState } from 'react';
import './lancamentos.scss';

export default function Lancamentos() {
  const [favorites, setFavorites] = useState({});

  const products = [
    {
      id: 1,
      name: 'Scarpin Sligback Bebecê Salto Médio Taça Detalhe Metalizado',
      price: 179.90,
      image: '/assets/card-products/card-product-1.svg'
    },
    {
      id: 2,
      name: 'Sandália Braco Blanc Tratorada...',
      price: 319.89,
      oldPrice: 459.90,
      image: '/assets/card-products/card-product-2.svg'
    },
    {
      id: 3,
      name: 'Coturno Feminino Bebecê Tratorado Detalhe Tachas',
      price: 315.00,
      oldPrice: 349.90,
      image: '/assets/card-products/card-product-3.svg'
    },
    {
      id: 4,
      name: 'Scarpin Bebecê Salto Alto Taça Com Fivela',
      price: 159.90,
      image: '/assets/card-products/card-product-4.svg'
    },
    {
      id: 5,
      name: 'Slingback Branco Tiras Bico Fino Couro',
      price: 379.90,
      image: '/assets/card-products/card-product-5.svg'
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const calculateDiscount = (oldPrice, newPrice) => {
    const discount = ((oldPrice - newPrice) / oldPrice) * 100;
    return Math.round(discount);
  };

  return (
    <section className="lancamentos">
      <div className="lancamentos-container">
        <h2 className="lancamentos-title">Lançamentos</h2>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <button 
                className="favorite-btn"
                onClick={() => toggleFavorite(product.id)}
              >
                <img 
                  src={favorites[product.id] 
                    ? '/assets/icons/shop/heart-b.svg' 
                    : '/assets/icons/shop/heart-w.svg'
                  }
                  alt="Favoritar"
                />
              </button>

              <div className="product-image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
                
                {product.oldPrice && (
                  <span className="discount-badge">
                    {calculateDiscount(product.oldPrice, product.price)}% OFF
                  </span>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                
                <div className="product-pricing">
                  {product.oldPrice && (
                    <span className="price-old">{formatPrice(product.oldPrice)}</span>
                  )}
                  <span className="price-current">{formatPrice(product.price)}</span>
                </div>
              </div>

              <button className="add-cart-btn">
                <img 
                  src="/assets/icons/shop/add-cart.svg" 
                  alt="Adicionar ao carrinho"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}