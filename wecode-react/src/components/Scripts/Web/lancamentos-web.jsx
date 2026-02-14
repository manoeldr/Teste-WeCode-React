import { useLancamentos } from '../../Main/useLancamentos';
import SizeModal from '../../size-modal/size-modal';
import '../../Styles/Web/lancamentos-web.scss';

export default function LancamentosWeb({ onAddToCart }) {
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
  } = useLancamentos(false, onAddToCart);

  return (
    <section className="lancamentos lancamentos-web">
      <h2 className="lancamentos-title">Lançamentos</h2>
      <div className="products-grid">
        {products.map((product) => {
          const discount = calculateDiscount(product.price, product.oldPrice);
          return (
            <div key={product.id} className="product-card">
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
          );
        })}
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