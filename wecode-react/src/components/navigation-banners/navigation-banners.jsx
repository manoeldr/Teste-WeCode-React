import { useState, useEffect } from 'react';
import './navigation-banners-web.scss';
import './navigation-banners-mobile.scss';

export default function NavigationBanners() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <section className="navigation-banners">
        <div className="navigation-banners-container">
          <img className="banner-pequeno" src="/assets/banners/navigation/mobile/banner-pequeno.svg" alt="Banner Pequeno" />
          <img className="banner-grande" src="/assets/banners/navigation/mobile/banner-grande.svg" alt="Banner Grande" />
        </div>
      </section>
    );
  }

  return (
    <section className="navigation-banners">
      <div className="navigation-banners-container">
        <img className="banner-grande" src="/assets/banners/navigation/banner-grande.svg" alt="Banner Grande" />
        <img className="banner-pequeno" src="/assets/banners/navigation/banner-pequeno.svg" alt="Banner Pequeno" />
      </div>
    </section>
  );
}