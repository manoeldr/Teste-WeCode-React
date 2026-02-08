import { useState } from 'react';
import Header from './components/Header/Header';
import BannerPrincipal from './components/banner-principal/banner-principal';
import Categories from './components/categories/categories';
import NavigationBanners from './components/navigation-banners/navigation-banners';
import Lancamentos from './components/lancamentos/lancamentos';
import Blog from './components/blog/blog';
import Newsletter from './components/newsletter/newsletter';
import Footer from './components/footer/footer';
import './App.scss';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  return (
    <div className="app">
      <Header cartCount={cartItems.length} />
      <main>
        <BannerPrincipal />
        <Categories />
        <NavigationBanners />
        <Lancamentos onAddToCart={handleAddToCart} />
        <Blog />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;