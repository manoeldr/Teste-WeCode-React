import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './blog-web.scss';
import './blog-mobile.scss';

export default function Blog() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'Fique por dentro: Tendências em Calçados Femininos para 2024',
      image: '/assets/banners/blog/blog-1.svg',
      link: '#'
    },
    {
      id: 2,
      title: 'Descubra o Calçado Perfeito: Guia Completo de Estilos',
      image: '/assets/banners/blog/blog-2.svg',
      link: '#'
    },
    {
      id: 3,
      title: 'Cuidados Essenciais: Como Prolongar a Vida dos Seus Calçados',
      image: '/assets/banners/blog/blog-3.svg',
      link: '#'
    }
  ];

  if (isMobile) {
    return (
      <section className="blog">
        <h2 className="blog-title">Conheça Mais</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: '.blog-pagination',
            bulletClass: 'blog-bullet',
            bulletActiveClass: 'blog-bullet-active',
          }}
          className="blog-swiper"
        >
          {blogPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <a href={post.link} className="blog-card">
                <img src={post.image} alt={post.title} />
                <div className="blog-card-content">
                  <h3>{post.title}</h3>
                  <span className="blog-link">Leia mais</span>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="blog-pagination"></div>
      </section>
    );
  }

  return (
    <section className="blog">
      <h2 className="blog-title">Conheça Mais</h2>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <a key={post.id} href={post.link} className="blog-card">
            <img src={post.image} alt={post.title} />
            <div className="blog-card-content">
              <h3>{post.title}</h3>
              <span className="blog-link">Leia mais</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}