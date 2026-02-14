export function useBannerPrincipal(isMobile) {
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

  const swiperConfig = {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      el: '.banner-pagination',
      bulletClass: 'banner-bullet',
      bulletActiveClass: 'banner-bullet-active',
    }
  };

  return {
    banners,
    swiperConfig
  };
}