import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, IceCream } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`fixed w-full top-0 z-50 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <IceCream className="h-8 w-8" />
          <span>Delice</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-pink-500 transition-colors">Главная</Link>
          <Link to="/menu" className="hover:text-pink-500 transition-colors">Меню</Link>
          <Link to="/orders" className="hover:text-pink-500 transition-colors">Мои Заказы</Link>
          <Link to="/login" className="hover:text-pink-500 transition-colors">Войти</Link>
          <Link to="/signup" className="hover:text-pink-500 transition-colors">Регистрация</Link>
          <Link to="/profile" className="hover:text-pink-500 transition-colors">Мой профиль</Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>
      </div>
    </header>
  );
}