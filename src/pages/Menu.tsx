import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { useTheme } from '../context/ThemeContext';
import { IceCreamProduct, Order, Customer, CartItem } from '../types';
import { ShoppingCart, Trash2 } from 'lucide-react';

export function Menu() {
  const { isDarkMode } = useTheme();
  const [cart, setCart] = useState<(IceCreamProduct | CartItem)[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: '',
  });

  // Load cart from localStorage on mount and when window gets focus
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(savedCart);
    };
    
    loadCart();
    
    // Refresh cart when window gets focus (user returns from ProductDetail)
    window.addEventListener('focus', loadCart);
    
    return () => {
      window.removeEventListener('focus', loadCart);
    };
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: IceCreamProduct) => {
    // Create a simple cart item for quick add
    const cartItem = {
      product,
      extras: [],
      quantity: 1,
      totalPrice: product.price,
    };
    setCart([...cart, cartItem]);
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getCartItemCount = (productId: number) => {
    return cart.filter(item => {
      if ('product' in item) {
        return item.product.id === productId;
      }
      return item.id === productId;
    }).length;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      if ('totalPrice' in item) {
        return total + item.totalPrice;
      }
      return total + item.price;
    }, 0);
  };

  const submitOrder = () => {
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: customer.name,
      address: customer.address,
      items: cart.map(item => {
        if ('product' in item) {
          return { productId: item.product.id, quantity: item.quantity };
        }
        return { productId: item.id, quantity: 1 };
      }),
      status: 'pending',
      totalPrice: getTotalPrice(),
      createdAt: new Date().toISOString(),
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...orders, order]));

    // Reset cart and form
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    setShowOrderForm(false);
    setCustomer({ name: '', address: '', phone: '' });
    alert('Заказ успешно оформлен!');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} pt-20`}>
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${cart.length > 0 ? 'mr-80' : ''} transition-all duration-300`}>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Меню</h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        {cart.length > 0 && (
          <div className={`fixed top-20 right-0 w-80 h-[calc(100vh-5rem)] ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl overflow-y-auto z-40`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6" />
                  Корзина
                </h2>
                <span className="bg-pink-500 text-white rounded-full px-3 py-1 text-sm font-bold">
                  {cart.length}
                </span>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => {
                  const product = 'product' in item ? item.product : item;
                  const price = 'totalPrice' in item ? item.totalPrice : item.price;
                  const extras = 'extras' in item ? item.extras : [];
                  const size = 'size' in item ? item.size : undefined;
                  const quantity = 'quantity' in item ? item.quantity : 1;

                  return (
                    <div key={`${product.id}-${index}`} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                      <div className="flex items-start gap-3 mb-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                          {size && (
                            <p className="text-xs text-gray-500 mb-1">
                              Размер: {size === 'small' ? 'Маленькая' : size === 'medium' ? 'Средняя' : 'Большая'}
                            </p>
                          )}
                          {extras.length > 0 && (
                            <p className="text-xs text-gray-500 mb-1">
                              Добавки: {extras.map(e => e.name).join(', ')}
                            </p>
                          )}
                          {quantity > 1 && (
                            <p className="text-xs text-gray-500 mb-1">Количество: {quantity}</p>
                          )}
                          <p className="text-sm font-bold text-pink-500 mb-2">{price} ₽</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                        Удалить
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4 mb-4`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Товаров:</span>
                  <span className="font-bold">{cart.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-xl font-bold text-pink-500">
                    {getTotalPrice()} ₽
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors font-semibold"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}

        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
              <h2 className="text-2xl font-bold mb-4">Оформление заказа</h2>
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full mb-4 p-2 rounded border"
                value={customer.name}
                onChange={e => setCustomer({ ...customer, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Адрес доставки"
                className="w-full mb-4 p-2 rounded border"
                value={customer.address}
                onChange={e => setCustomer({ ...customer, address: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full mb-4 p-2 rounded border"
                value={customer.phone}
                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="px-4 py-2 rounded"
                >
                  Отмена
                </button>
                <button
                  onClick={submitOrder}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                >
                  Подтвердить заказ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}