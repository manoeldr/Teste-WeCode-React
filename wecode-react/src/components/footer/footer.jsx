import './footer.scss';

export default function Footer() {
  const socialMedia = [
    { name: 'Facebook', icon: '/assets/icons/social-media/facebook.svg', url: '#' },
    { name: 'Instagram', icon: '/assets/icons/social-media/instagram.svg', url: '#' },
    { name: 'Pinterest', icon: '/assets/icons/social-media/pinterest.svg', url: '#' },
    { name: 'TikTok', icon: '/assets/icons/social-media/tiktok.svg', url: '#' },
    { name: 'Twitter', icon: '/assets/icons/social-media/twitter.svg', url: '#' }
  ];

  const aboutUs = [
    { text: 'Quem Somos', url: '#' },
    { text: 'Fale Conosco', url: '#' }
  ];

  const policies = [
    { text: 'Política de privacidade', url: '#' },
    { text: 'Termos de uso', url: '#' },
    { text: 'Política de entrega', url: '#' },
    { text: 'Política de cupom e descontos', url: '#' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/assets/img/logo-bege.svg" alt="Logo Bebecê" />
        </div>

        <div className="footer-column">
          <h3 className="footer-title"></h3>
          <div className="social-media">
            {socialMedia.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Sobre nós</h3>
          <ul className="footer-list">
            {aboutUs.map((item, index) => (
              <li key={index}>
                <a href={item.url}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Políticas</h3>
          <ul className="footer-list">
            {policies.map((item, index) => (
              <li key={index}>
                <a href={item.url}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}