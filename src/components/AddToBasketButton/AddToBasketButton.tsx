import React from 'react';
import { AddToBasketButtonProps } from './AddToBasketButton.types';

const AddToBasketButton: React.FC<AddToBasketButtonProps> = ({ inBasket, onClick, disabled }) => {
  return (
    <button
      className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
        disabled 
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : inBasket 
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
            : 'bg-red-600 text-white hover:bg-red-700'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {inBasket ? 'Remove from basket' : 'Add to basket'}
    </button>
  );
};

export default AddToBasketButton;