import React from 'react';
import { CheckCircle } from 'lucide-react';
import { CheckoutModalProps } from './CheckoutModal.types';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Thank you for your purchase!</h2>
          <p className="mt-2 text-gray-600">
            Your order has been successfully processed. You will receive a confirmation email shortly.
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;