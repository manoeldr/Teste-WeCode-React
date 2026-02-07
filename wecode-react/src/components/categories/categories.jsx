import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './categories.scss';

export default function Categories() {
  const categories = [
    { id: 1, name: 'Botas', image: '/assets/categories/categoria-1.svg' },
    { id: 2, name: 'Scarpins', image: '/assets/categories/categoria-2.svg' },
    { id: 3, name: 'Sapatilhas', image: '/assets/categories/categoria-3.svg' },
    { id: 4, name: 'Sandálias', image: '/assets/categories/categoria-4.svg' }
  ];

  return (
    <section className="categories">
      <div className="categories-container">
        <h2 className="categories-title">Categorias</h2>

        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <img src={category.image} alt={category.name} />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>

        <div className="categories-swiper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="category-item">
                  <img src={category.image} alt={category.name} />
                  <p className="category-name">{category.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}