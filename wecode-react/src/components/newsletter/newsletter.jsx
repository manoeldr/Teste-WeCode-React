import { useState } from 'react';
import './newsletter.scss';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email enviado:', email);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <p className="newsletter-text">
          Cadastre-se e receba <strong>10% OFF</strong> na sua primeira compra!
        </p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email"
            className="newsletter-input"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-button">
            ENVIAR
          </button>
        </form>
      </div>
    </section>
  );
}