import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { User, Package, LogOut, LogIn, Mail, Phone, MapPin, Settings, Heart, Edit2, Save, X } from 'lucide-react';
import { Order } from '../types';

export const Profile: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [userName, setUserName] = useState<string>('Пользователь');
  const [userEmail, setUserEmail] = useState<string>('user@example.com');
  const [userPhone, setUserPhone] = useState<string>('+7 (999) 123-45-67');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Get user data from localStorage or use default
    const savedName = localStorage.getItem('userName') || 'Пользователь';
    const savedEmail = localStorage.getItem('userEmail') || 'user@example.com';
    const savedPhone = localStorage.getItem('userPhone') || '+7 (999) 123-45-67';
    
    setUserName(savedName);
    setUserEmail(savedEmail);
    setUserPhone(savedPhone);
    
    // Get orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const handleSave = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userPhone', userPhone);
    setIsEditing(false);
    alert('Профиль успешно обновлен!');
  };

  const handleCancel = () => {
    // Restore original values
    const savedName = localStorage.getItem('userName') || 'Пользователь';
    const savedEmail = localStorage.getItem('userEmail') || 'user@example.com';
    const savedPhone = localStorage.getItem('userPhone') || '+7 (999) 123-45-67';
    
    setUserName(savedName);
    setUserEmail(savedEmail);
    setUserPhone(savedPhone);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userName');
    setUserName('Пользователь');
    alert('Вы вышли из аккаунта');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'preparing':
        return 'bg-blue-500';
      case 'ready':
        return 'bg-green-500';
      case 'delivered':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Ожидает обработки';
      case 'preparing':
        return 'Готовится';
      case 'ready':
        return 'Готов к доставке';
      case 'delivered':
        return 'Доставлен';
      default:
        return status;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} pt-20`}>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-8`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className={`w-32 h-32 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-pink-100'} flex items-center justify-center`}>
              <User className="w-16 h-16 text-pink-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-500">Имя</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-800'
                      } focus:outline-none focus:border-pink-500 transition-colors`}
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-500">Email</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-800'
                      } focus:outline-none focus:border-pink-500 transition-colors`}
                      placeholder="Введите ваш email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-500">Телефон</label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-800'
                      } focus:outline-none focus:border-pink-500 transition-colors`}
                      placeholder="Введите ваш телефон"
                    />
                  </div>
                  <div className="flex gap-3 justify-center md:justify-start">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition-colors font-semibold"
                    >
                      <Save className="w-5 h-5" />
                      Сохранить
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition-colors font-semibold"
                    >
                      <X className="w-5 h-5" />
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{userName}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Редактировать профиль"
                    >
                      <Edit2 className="w-5 h-5 text-pink-500" />
                    </button>
                  </div>
                  <p className="text-gray-500 mb-4">Добро пожаловать в ваш профиль Delice</p>
                  <div className="flex flex-col gap-3 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-pink-500" />
                      <span>{userEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-pink-500" />
                      <span>{userPhone}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            {!isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                  Выйти
                </button>
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors font-semibold"
                >
                  <LogIn className="w-5 h-5" />
                  Войти
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Всего заказов</p>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
              <Package className="w-12 h-12 text-pink-500" />
            </div>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Активные заказы</p>
                <p className="text-3xl font-bold">{orders.filter(o => o.status !== 'delivered').length}</p>
              </div>
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Общая сумма</p>
                <p className="text-3xl font-bold">{orders.reduce((sum, o) => sum + o.totalPrice, 0)} ₽</p>
              </div>
              <Settings className="w-12 h-12 text-pink-500" />
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Package className="w-6 h-6" />
              Мои заказы
            </h2>
            <Link
              to="/orders"
              className="text-pink-500 hover:text-pink-600 font-semibold"
            >
              Посмотреть все →
            </Link>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">Заказ #{order.id.slice(0, 8)}</h3>
                        <span className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {new Date(order.createdAt).toLocaleString('ru-RU')}
                      </p>
                      <p className="text-sm">
                        <strong>Адрес:</strong> {order.address}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-pink-500">{order.totalPrice} ₽</p>
                      <p className="text-sm text-gray-500">{order.items.length} товаров</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-500">У вас пока нет заказов</p>
              <Link
                to="/menu"
                className="inline-block mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition-colors font-semibold"
              >
                Перейти в меню
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 