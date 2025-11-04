import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IceCreamProduct } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  product: IceCreamProduct;
  onAddToCart: (product: IceCreamProduct) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
      onClick={handleCardClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{product.price} ₽</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}