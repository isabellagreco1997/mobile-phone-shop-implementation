import React from 'react';
import { StockIndicatorProps } from './StockIndicator.types';

const StockIndicator: React.FC<StockIndicatorProps> = ({ stock }) => {
  let status: string;
  let color: string;
  let dotColor: string;
  
  if (stock === 0) {
    status = 'Out of stock';
    color = 'text-red-600';
    dotColor = 'bg-red-600';
  } else if (stock <= 5) {
    status = 'Limited stock';
    color = 'text-amber-600';
    dotColor = 'bg-amber-600';
  } else {
    status = 'In stock';
    color = 'text-green-600';
    dotColor = 'bg-green-600';
  }
  
  return (
    <div className={`flex items-center ${color} mb-6`}>
      <div className={`w-2 h-2 rounded-full ${dotColor} mr-2`}></div>
      <span>{status}</span>
    </div>
  );
};

export default StockIndicator;