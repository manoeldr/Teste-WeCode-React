export function useNavigationBanners(isMobile) {
  const banners = {
    web: {
      grande: '/assets/banners/navigation/banner-grande.svg',
      pequeno: '/assets/banners/navigation/banner-pequeno.svg'
    },
    mobile: {
      grande: '/assets/banners/navigation/mobile/banner-grande.svg',
      pequeno: '/assets/banners/navigation/mobile/banner-pequeno.svg'
    }
  };

  const currentBanners = isMobile ? banners.mobile : banners.web;

  return {
    bannerGrande: currentBanners.grande,
    bannerPequeno: currentBanners.pequeno
  };
}