import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useLancamentos } from '../../Main/useLancamentos';
import SizeModal from '../../size-modal/size-modal';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../Styles/Mobile/lancamentos-mobile.scss';

export default function LancamentosMobile({ onAddToCart }) {
  const {
    products,
    selectedProduct,
    handleAddClick,
    handleCloseModal,
    handleAddToCart,
    handleToggleFavorite,
    isFavorite,
    formatPrice,
    calculateDiscount
  } = useLancamentos(true, onAddToCart);

  return (
    <section className="lancamentos lancamentos-mobile">
      <h2 className="lancamentos-title">Lançamentos</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={8}
        slidesPerView={1.5}
        pagination={{
          clickable: true,
          el: '.lancamentos-pagination',
          bulletClass: 'lancamentos-bullet',
          bulletActiveClass: 'lancamentos-bullet-active',
        }}
        className="lancamentos-swiper"
      >
        {products.map((product) => {
          const discount = calculateDiscount(product.price, product.oldPrice);
          return (
            <SwiperSlide key={product.id}>
              <div className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {discount && (
                    <span className="discount-badge">{discount}% OFF</span>
                  )}
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
          );
        })}
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