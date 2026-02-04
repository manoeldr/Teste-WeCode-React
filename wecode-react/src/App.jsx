import { useState } from 'react';
import Header from './components/header/Header';
import './App.scss';

function App() {
  const [cartCount] = useState(0);

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main>
        <h1 style={{ marginTop: '100px', textAlign: 'center' }}>
          Wecode React - Header funcionando
        </h1>
      </main>
    </div>
  );
}

export default App;