import { useState } from 'react';
import Header from './components/header/Header';
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
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.size === product.size
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
    }
    setIsMinicartOpen(true);
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, change) => {
    setCartItems(prev => prev.map((item, i) => {
      if (i === index) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    }));
  };

  return (
    <div className="app">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsMinicartOpen(true)}
      />
      <main>
        <BannerPrincipal />
        <Categories />
        <NavigationBanners />
        <Lancamentos onAddToCart={handleAddToCart} />
        <Blog />
        <Newsletter />
      </main>
      <Footer />
      <Minicart 
        isOpen={isMinicartOpen}
        onClose={() => setIsMinicartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}

export default App;