import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useBannerPrincipal } from '../../Main/useBannerPrincipal';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../Styles/Mobile/banner-principal-mobile.scss';

export default function BannerPrincipalMobile() {
  const { banners, swiperConfig } = useBannerPrincipal(true);

  return (
    <section className="banner banner-mobile">
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