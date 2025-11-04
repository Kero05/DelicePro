import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Order } from '../types';

export function Orders() {
  const { isDarkMode } = useTheme();
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

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
        <h1 className="text-3xl font-bold mb-8">Мои заказы</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Заказ #{order.id}</h3>
                  <p className="text-sm opacity-75">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm`}>
                  {getStatusText(order.status)}
                </div>
              </div>
              
              <div className="mb-4">
                <p><strong>Имя:</strong> {order.customerName}</p>
                <p><strong>Адрес:</strong> {order.address}</p>
                <p><strong>Сумма заказа:</strong> {order.totalPrice} ₽</p>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl">У вас пока нет заказов</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}