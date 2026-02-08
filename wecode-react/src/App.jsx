import { useState } from 'react';
import Header from './components/Header/Header';
import BannerPrincipal from './components/banner-principal/banner-principal';
import Categories from './components/categories/categories';
import NavigationBanners from './components/navigation-banners/navigation-banners';
import Lancamentos from './components/lancamentos/lancamentos';
import './App.scss';

function App() {
  const [cartCount] = useState(0);

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main>
        <BannerPrincipal />
        <Categories />
        <NavigationBanners />
        <Lancamentos />
      </main>
    </div>
  );
}

export default App;