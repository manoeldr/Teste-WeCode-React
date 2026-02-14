import { useState } from 'react';

export function useLancamentos(isMobile, onAddToCart) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

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

  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice) return null;
    const discount = ((oldPrice - price) / oldPrice) * 100;
    return Math.round(discount);
  };

  return {
    products,
    selectedProduct,
    favorites,
    handleAddClick,
    handleCloseModal,
    handleAddToCart,
    handleToggleFavorite,
    isFavorite,
    formatPrice,
    calculateDiscount
  };
}