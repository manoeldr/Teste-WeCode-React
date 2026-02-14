import { useState, useEffect } from 'react';
import HeaderWeb from './components/Scripts/Web/header-web';
import HeaderMobile from './components/Scripts/Mobile/header-mobile';
import BannerPrincipalWeb from './components/Scripts/Web/banner-principal-web';
import BannerPrincipalMobile from './components/Scripts/Mobile/banner-principal-mobile';
import CategoriesWeb from './components/Scripts/Web/categories-web';
import CategoriesMobile from './components/Scripts/Mobile/categories-mobile';
import NavigationBannersWeb from './components/Scripts/Web/navigation-banners-web';
import NavigationBannersMobile from './components/Scripts/Mobile/navigation-banners-mobile';
import LancamentosWeb from './components/Scripts/Web/lancamentos-web';
import LancamentosMobile from './components/Scripts/Mobile/lancamentos-mobile';
import Blog from './components/blog/blog';
import Newsletter from './components/newsletter/newsletter';
import Footer from './components/footer/footer';
import MinicartWeb from './components/Scripts/Web/minicart-web';
import MinicartMobile from './components/Scripts/Mobile/minicart-mobile';
import './App.scss';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isMinicartOpen, setIsMinicartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 393);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 393;
      if (mobile !== isMobile) {
        setIsMinicartOpen(false);
        setIsMobile(mobile);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    setIsMinicartOpen(true);
  };

  const handleRemoveItem = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, change) => {
    setCartItems(prevItems =>
      prevItems.map((item, i) => {
        if (i === index) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const handleOpenMinicart = () => {
    setIsMinicartOpen(true);
  };

  const handleCloseMinicart = () => {
    setIsMinicartOpen(false);
  };

  return (
    <div className="app">
      {isMobile ? (
        <HeaderMobile 
          key="header-mobile"
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={handleOpenMinicart}
        />
      ) : (
        <HeaderWeb 
          key="header-web"
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={handleOpenMinicart}
        />
      )}
      
      <main>
        {isMobile ? (
          <BannerPrincipalMobile key="banner-mobile" />
        ) : (
          <BannerPrincipalWeb key="banner-web" />
        )}
        
        {isMobile ? (
          <CategoriesMobile key="categories-mobile" />
        ) : (
          <CategoriesWeb key="categories-web" />
        )}
        
        {isMobile ? (
          <NavigationBannersMobile key="navigation-banners-mobile" />
        ) : (
          <NavigationBannersWeb key="navigation-banners-web" />
        )}
        
        {isMobile ? (
          <LancamentosMobile key="lancamentos-mobile" onAddToCart={handleAddToCart} />
        ) : (
          <LancamentosWeb key="lancamentos-web" onAddToCart={handleAddToCart} />
        )}
        
        <Blog />
      </main>
      <Newsletter />
      <Footer />
      
      {isMobile ? (
        <MinicartMobile
          key="mobile-minicart"
          isOpen={isMinicartOpen}
          onClose={handleCloseMinicart}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
      ) : (
        <MinicartWeb
          key="web-minicart"
          isOpen={isMinicartOpen}
          onClose={handleCloseMinicart}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </div>
  );
}

export default App;