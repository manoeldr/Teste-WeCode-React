import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './banner-principal.scss';

export default function BannerPrincipal() {
  const banners = [
    '/assets/banners/banner-principal/banner-principal-1.svg',
    '/assets/banners/banner-principal/banner-principal-2.svg'
  ];

  return (
    <section className="banner">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.banner-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
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