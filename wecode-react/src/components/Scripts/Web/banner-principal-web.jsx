import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useBannerPrincipal } from '../../Main/useBannerPrincipal';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../Styles/Web/banner-principal-web.scss';

export default function BannerPrincipalWeb() {
  const { banners, swiperConfig } = useBannerPrincipal(false);

  return (
    <section className="banner banner-web">
      <Swiper
        modules={[Autoplay, Pagination]}
        {...swiperConfig}
        className="banner-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="banner-slide">
              <img src={banner} alt={`Banner ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="banner-overlay">
        <button className="banner-button">Conheça agora!</button>
        <div className="banner-pagination"></div>
      </div>
    </section>
  );
}