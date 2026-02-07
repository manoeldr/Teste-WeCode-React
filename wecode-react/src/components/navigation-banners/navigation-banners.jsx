import './navigation-banners.scss';

export default function NavigationBanners() {
  return (
    <section className="navigation-banners">
      <div className="navigation-banners-container">
        <img 
          src="/assets/banners/navigation/banner-grande.svg" 
          alt="Banner grande"
          className="banner-grande"
        />
        <img 
          src="/assets/banners/navigation/banner-pequeno.svg" 
          alt="Banner pequeno"
          className="banner-pequeno"
        />
      </div>
    </section>
  );
}