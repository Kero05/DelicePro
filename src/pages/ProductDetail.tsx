import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import { IceCreamProduct, ProductExtra } from '../types';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';

const availableExtras: ProductExtra[] = [
  { id: 'choc-chips', name: 'Шоколадная крошка', price: 50, category: 'topping' },
  { id: 'nuts', name: 'Орехи', price: 60, category: 'topping' },
  { id: 'caramel', name: 'Карамель', price: 40, category: 'syrup' },
  { id: 'choc-syrup', name: 'Шоколадный сироп', price: 45, category: 'syrup' },
  { id: 'strawberry', name: 'Клубника', price: 55, category: 'topping' },
  { id: 'whip', name: 'Взбитые сливки', price: 50, category: 'topping' },
];

const sizes = [
  { name: 'small', label: 'Маленькая', price: 0 },
  { name: 'medium', label: 'Средняя', price: 50 },
  { name: 'large', label: 'Большая', price: 100 },
];

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const product = products.find(p => p.id === parseInt(id || '0'));
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} pt-20 flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <button
            onClick={() => navigate('/menu')}
            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors"
          >
            Вернуться в меню
          </button>
        </div>
      </div>
    );
  }

  const toggleExtra = (extra: ProductExtra) => {
    if (selectedExtras.find(e => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const calculateTotal = () => {
    const basePrice = product.price;
    const sizePrice = sizes.find(s => s.name === selectedSize)?.price || 0;
    const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    return (basePrice + sizePrice + extrasPrice) * quantity;
  };

  const handleAddToCart = () => {
    // Create cart item with all customizations
    const cartItem = {
      product,
      extras: selectedExtras,
      size: selectedSize,
      quantity,
      totalPrice: calculateTotal(),
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    alert('Товар добавлен в корзину!');
    navigate('/menu');
  };

  const toppings = availableExtras.filter(e => e.category === 'topping');
  const syrups = availableExtras.filter(e => e.category === 'syrup');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} pt-20`}>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-2 mb-6 text-pink-500 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад к меню
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-pink-500 mb-8">{product.price} ₽</p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Размер</h3>
              <div className="flex gap-4">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name as 'small' | 'medium' | 'large')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      selectedSize === size.name
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-500'
                        : isDarkMode
                        ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold">{size.label}</div>
                    {size.price > 0 && (
                      <div className="text-sm text-gray-500">+{size.price} ₽</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Количество</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } transition-colors`}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } transition-colors`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Toppings */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Добавки</h3>
              <div className="grid grid-cols-2 gap-3">
                {toppings.map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedExtras.find(e => e.id === extra.id)
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : isDarkMode
                        ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold">{extra.name}</div>
                    <div className="text-sm text-gray-500">+{extra.price} ₽</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Syrups */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Сиропы</h3>
              <div className="grid grid-cols-2 gap-3">
                {syrups.map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedExtras.find(e => e.id === extra.id)
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : isDarkMode
                        ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold">{extra.name}</div>
                    <div className="text-sm text-gray-500">+{extra.price} ₽</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total and Add to Cart */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-6 mb-6`}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Итого:</span>
                <span className="text-3xl font-bold text-pink-500">{calculateTotal()} ₽</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

