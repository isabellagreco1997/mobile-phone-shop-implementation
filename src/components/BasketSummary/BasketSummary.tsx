import React from 'react';
import { useBasket } from '../../context/BasketContext';
import { Link } from 'react-router-dom';
import { BasketSummaryProps } from './BasketSummary.types';

const BasketSummary: React.FC<BasketSummaryProps> = () => {
  const { items, itemCount } = useBasket();
  
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  if (itemCount === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Your Basket</h2>
        <p className="text-gray-600">Your basket is empty</p>
        <Link 
          to="/" 
          className="mt-4 inline-block text-red-600 hover:text-red-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Your Basket</h2>
      <div className="space-y-4 mb-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.id}</p>
              <p className="text-sm text-gray-600">{item.colorName}, {item.capacitySize}</p>
            </div>
            <p className="font-medium">£{item.price}</p>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center font-bold mb-4">
          <span>Total</span>
          <span>£{total}</span>
        </div>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
};