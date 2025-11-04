import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { IceCream } from 'lucide-react';

export function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} pt-20`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center py-20">
          <IceCream className="h-20 w-20 text-pink-500 mb-6" />
          <h1 className="text-5xl font-bold mb-6">Добро пожаловать в Delice</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Откройте для себя непревзойденный вкус нашего премиального мороженого,
            созданного с любовью и заботой о каждой детали
          </p>
          <Link
            to="/menu"
            className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors"
          >
            Посмотреть меню
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg text-center`}>
            <h3 className="text-xl font-semibold mb-4">Натуральные ингредиенты</h3>
            <p>Мы используем только свежие и качественные продукты</p>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg text-center`}>
            <h3 className="text-xl font-semibold mb-4">Быстрая доставка</h3>
            <p>Доставляем ваши любимые десерты прямо к вашей двери</p>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg text-center`}>
            <h3 className="text-xl font-semibold mb-4">Уникальные вкусы</h3>
            <p>Попробуйте наши особые рецепты и сезонные новинки</p>
          </div>
        </div>
      </div>
    </div>
  );
}