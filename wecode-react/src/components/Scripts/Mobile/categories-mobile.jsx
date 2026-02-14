import { Swiper, SwiperSlide } from 'swiper/react';
import { useCategories } from '../../Main/useCategories';
import 'swiper/css';
import '../../Styles/Mobile/categories-mobile.scss';

export default function CategoriesMobile() {
  const { categories } = useCategories();

  return (
    <section className="categories categories-mobile">
      <h2 className="categories-title">Categorias</h2>
      <Swiper
        spaceBetween={8}
        slidesPerView={2}
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
    </section>
  );
}