export function useCategories() {
  const categories = [
    { id: 1, name: 'Botas', image: '/assets/categories/categoria-1.svg' },
    { id: 2, name: 'Scarpins', image: '/assets/categories/categoria-2.svg' },
    { id: 3, name: 'Sapatilhas', image: '/assets/categories/categoria-3.svg' },
    { id: 4, name: 'Sandálias', image: '/assets/categories/categoria-4.svg' }
  ];

  return {
    categories
  };
}