import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SizeModal from '../size-modal/size-modal';
import './lancamentos-web.scss';
import './lancamentos-mobile.scss';

export default function Lancamentos({ onAddToCart }) {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopProducts = [
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

  const mobileProducts = [
    {
      id: 1,
      name: 'Scarpin Sligback Bebecê Salto Médio Taça Detalhe Metalizado',
      price: 179.90,
      image: '/assets/card-products/web/card-product-web-1.svg'
    },
    {
      id: 3,
      name: 'Coturno Feminino Bebecê Tratorado Detalhe Tachas',
      price: 315.00,
      oldPrice: 349.90,
      image: '/assets/card-products/web/card-product-web-2.svg'
    },
    {
      id: 4,
      name: 'Scarpin Bebecê Salto Alto Taça Com Fivela',
      price: 159.90,
      image: '/assets/card-products/web/card-product-web-3.svg'
    }
  ];

  const products = isMobile ? mobileProducts : desktopProducts;

  const handleAddClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (productWithSize) => {
    onAddToCart(productWithSize);
    setSelectedProduct(null);
  };

  const handleToggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (isMobile) {
    return (
      <section className="lancamentos">
        <h2 className="lancamentos-title">Lançamentos</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={12}
          slidesPerView={1.5}
          pagination={{
            clickable: true,
            el: '.lancamentos-pagination',
            bulletClass: 'lancamentos-bullet',
            bulletActiveClass: 'lancamentos-bullet-active',
          }}
          className="lancamentos-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button className="favorite-button" onClick={() => handleToggleFavorite(product.id)}>
                    <img 
                      src={isFavorite(product.id) ? "/assets/icons/shop/heart-b.svg" : "/assets/icons/shop/heart-w.svg"} 
                      alt="Favoritar" 
                    />
                  </button>
                  <button className="add-button" onClick={() => handleAddClick(product)}>
                    <img src="/assets/icons/shop/add-cart.svg" alt="Adicionar" />
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    {product.oldPrice && (
                      <span className="old-price">{formatPrice(product.oldPrice)}</span>
                    )}
                    <span className="current-price">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="lancamentos-pagination"></div>

        {selectedProduct && (
          <SizeModal
            product={selectedProduct}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        )}
      </section>
    );
  }

  return (
    <section className="lancamentos">
      <h2 className="lancamentos-title">Lançamentos</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <button className="favorite-button" onClick={() => handleToggleFavorite(product.id)}>
                <img 
                  src={isFavorite(product.id) ? "/assets/icons/shop/heart-b.svg" : "/assets/icons/shop/heart-w.svg"} 
                  alt="Favoritar" 
                />
              </button>
              <button className="add-button" onClick={() => handleAddClick(product)}>
                <img src="/assets/icons/shop/add-cart.svg" alt="Adicionar" />
              </button>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                {product.oldPrice && (
                  <span className="old-price">{formatPrice(product.oldPrice)}</span>
                )}
                <span className="current-price">{formatPrice(product.price)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <SizeModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
}