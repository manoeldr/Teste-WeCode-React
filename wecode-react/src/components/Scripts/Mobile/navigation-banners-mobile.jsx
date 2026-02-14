import { useNavigationBanners } from '../../Main/useNavigationBanners';
import '../../Styles/Mobile/navigation-banners-mobile.scss';

export default function NavigationBannersMobile() {
  const { bannerGrande, bannerPequeno } = useNavigationBanners(true);

  return (
    <section className="navigation-banners navigation-banners-mobile">
      <div className="navigation-banners-container">
        <img className="banner-pequeno" src={bannerPequeno} alt="Banner Pequeno" />
        <img className="banner-grande" src={bannerGrande} alt="Banner Grande" />
      </div>
    </section>
  );
}