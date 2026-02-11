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
      title: 'É AMANHÃ',
      text: 'SIMPLE and TRUE: lançamento da nova coleção Outono Inverno 2024 da Bebecê ❤️',
      image: '/assets/banners/blog/blog-1.svg',
      link: '#'
    },
    {
      id: 2,
      title: 'NOVO LOGO, MESMA ESSÊNCIA.',
      text: 'Trazendo conforto através das linhas finas e grossas + uma paleta de cores vibrante e cheia de atitude, o resultado é um visual que traduz nossa essência: autêntica e surpreendente!',
      image: '/assets/banners/blog/blog-2.svg',
      link: '#'
    },
    {
      id: 3,
      title: 'Descubra o glamour em cada passo.',
      text: 'Quer brilhar ainda mais neste inverno sem abrir mão do conforto? Esta mule é perfeita para você. ✨',
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
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-text">{post.text}</p>
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
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-text">{post.text}</p>
              <span className="blog-link">Leia mais</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}