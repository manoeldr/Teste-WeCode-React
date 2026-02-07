import { useState } from 'react';
import Header from './components/Header/Header';
import BannerPrincipal from './components/banner-principal/banner-principal';
import './App.scss';

function App() {
  const [cartCount] = useState(0);

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main>
        <BannerPrincipal />
      </main>
    </div>
  );
}

export default App;