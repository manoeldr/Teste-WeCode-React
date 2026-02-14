import { useCategories } from '../../Main/useCategories';
import '../../Styles/Web/categories-web.scss';

export default function CategoriesWeb() {
  const { categories } = useCategories();

  return (
    <section className="categories categories-web">
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