import { useState, useEffect } from 'react';

export function useHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('user_location') || 'Uberlândia, MG';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('sapatos');
  const [activeNav, setActiveNav] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const products = [
    { id: 'sapatos', name: 'Sapatos', image: '/assets/menu-products/menu-products-1.svg' },
    { id: 'scarpins', name: 'Scarpins', image: '/assets/menu-products/menu-products-2.svg' },
    { id: 'sandalias', name: 'Sandálias', image: '/assets/menu-products/menu-products-3.svg' },
    { id: 'botas', name: 'Botas', image: '/assets/menu-products/menu-products-4.svg' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProductsOpen && !e.target.closest('.nav-item.dropdown') && !e.target.closest('.dropdown-menu')) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProductsOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('user_location', newLocation);
  };

  const handleProductsToggle = () => {
    setIsProductsOpen(!isProductsOpen);
    setActiveNav(isProductsOpen ? '' : 'produtos');
  };

  const handleProductHover = (productId) => {
    setSelectedProduct(productId);
  };

  const handleNavClick = (e, navId) => {
    e.preventDefault();
    setActiveNav(navId);
    if (navId !== 'produtos') {
      setIsProductsOpen(false);
    }
  };

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return {
    scrolled,
    location,
    isModalOpen,
    isProductsOpen,
    selectedProduct,
    activeNav,
    isMobileMenuOpen,
    products,
    handleOpenModal,
    handleCloseModal,
    handleSaveLocation,
    handleProductsToggle,
    handleProductHover,
    handleNavClick,
    handleOpenMobileMenu,
    handleCloseMobileMenu
  };
}