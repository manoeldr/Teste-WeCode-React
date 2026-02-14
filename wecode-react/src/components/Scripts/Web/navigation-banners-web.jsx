import { useNavigationBanners } from '../../Main/useNavigationBanners';
import '../../Styles/Web/navigation-banners-web.scss';

export default function NavigationBannersWeb() {
  const { bannerGrande, bannerPequeno } = useNavigationBanners(false);

  return (
    <section className="navigation-banners navigation-banners-web">
      <div className="navigation-banners-container">
        <img className="banner-grande" src={bannerGrande} alt="Banner Grande" />
        <img className="banner-pequeno" src={bannerPequeno} alt="Banner Pequeno" />
      </div>
    </section>
  );
}