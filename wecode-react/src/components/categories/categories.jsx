import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './categories-web.scss';
import './categories-mobile.scss';

export default function Categories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    { id: 1, name: 'Botas', image: '/assets/categories/categoria-1.svg' },
    { id: 2, name: 'Scarpins', image: '/assets/categories/categoria-2.svg' },
    { id: 3, name: 'Sapatilhas', image: '/assets/categories/categoria-3.svg' },
    { id: 4, name: 'Sandálias', image: '/assets/categories/categoria-4.svg' }
  ];

  if (isMobile) {
    return (
      <section className="categories">
        <h2 className="categories-title">Categorias</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={2}
          pagination={{
            clickable: true,
            el: '.categories-pagination',
            bulletClass: 'categories-bullet',
            bulletActiveClass: 'categories-bullet-active',
          }}
          className="categories-swiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="category-card">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="categories-pagination"></div>
      </section>
    );
  }

  return (
    <section className="categories">
      <h2 className="categories-title">Categorias</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}