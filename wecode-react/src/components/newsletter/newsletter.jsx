import { useState } from 'react';
import './newsletter.scss';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('BEMVINDA');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-container">
        {!isSubmitted ? (
          <>
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
          </>
        ) : (
          <>
            <p className="newsletter-success-text">
              Utilize o cupom abaixo e garanta seu desconto!
            </p>
            <div className="coupon-container">
              <div className="coupon-code">BEMVINDA</div>
              <button 
                className={`coupon-button ${isCopied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {isCopied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}