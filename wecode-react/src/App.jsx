import { useState } from 'react';
import Header from './components/Header/Header';
import BannerPrincipal from './components/banner-principal/banner-principal';
import Categories from './components/categories/categories';
import NavigationBanners from './components/navigation-banners/navigation-banners';
import Lancamentos from './components/lancamentos/lancamentos';
import Blog from './components/blog/blog';
import Newsletter from './components/newsletter/newsletter';
import Footer from './components/footer/footer';
import Minicart from './components/minicart/minicart';
import './App.scss';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isMinicartOpen, setIsMinicartOpen] = useState(false);

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
    
    // Abre o minicart automaticamente
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
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={handleOpenMinicart}
      />
      <main>
        <BannerPrincipal />
        <Categories />
        <NavigationBanners />
        <Lancamentos onAddToCart={handleAddToCart} />
        <Blog />
      </main>
      <Newsletter />
      <Footer />
      <Minicart
        isOpen={isMinicartOpen}
        onClose={handleCloseMinicart}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}

export default App;