import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './banner-principal.scss';

export default function BannerPrincipal() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopBanners = [
    '/assets/banners/banner-principal/banner-principal-1.svg',
    '/assets/banners/banner-principal/banner-principal-2.svg'
  ];

  const mobileBanners = [
    '/assets/banners/banner-principal/banner-principal-3.svg',
    '/assets/banners/banner-principal/banner-principal-4.svg',
    '/assets/banners/banner-principal/banner-principal-5.svg'
  ];

  const banners = isMobile ? mobileBanners : desktopBanners;

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
          bulletClass: 'banner-bullet',
          bulletActiveClass: 'banner-bullet-active',
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