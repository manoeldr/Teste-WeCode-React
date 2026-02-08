import './blog.scss';

export default function Blog() {
  const posts = [
    {
      id: 1,
      image: '/assets/banners/blog/blog-1.svg',
      title: 'É AMANHÃ',
      description: 'SIMPLE and TRUE: lançamento da nova coleção Outono Inverno 2024 da Bebecê ❤️'
    },
    {
      id: 2,
      image: '/assets/banners/blog/blog-2.svg',
      title: 'NOVO LOGO, MESMA ESSÊNCIA.',
      description: 'Trazendo conforto através das linhas finas e grossas + uma paleta de cores vibrante e cheia de atitude, o resultado é um visual que traduz nossa essência: autêntica e surpreendente!'
    },
    {
      id: 3,
      image: '/assets/banners/blog/blog-3.svg',
      title: 'Descubra o glamour em cada passo.',
      description: 'Quer brilhar ainda mais neste inverno sem abrir mão do conforto? Esta mule é perfeita para você. ✨'
    }
  ];

  return (
    <section className="blog">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-section-title">Conheça Mais</h2>
          <p className="blog-subtitle">Fique por dentro de tudo que acontece na Bebecê.</p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <img 
                src={post.image} 
                alt={post.title}
                className="blog-image"
              />
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-description">{post.description}</p>
                <a href="#" className="blog-link">Saiba mais!</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}