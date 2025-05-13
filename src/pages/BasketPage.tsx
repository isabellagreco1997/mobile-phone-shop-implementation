import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import { ShoppingBasket, Plus, ChevronDown, Info, Trash2 } from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';
import { supabase } from '../lib/supabase';
import { getPhoneImagePath } from '../utils/imageUtils';

const BasketPage: React.FC = () => {
  const { items, removeFromBasket } = useBasket();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  // Calculate totals
  const totalUpfront = items.reduce((sum, item) => sum + item.price, 0);
  const monthlyBase = 37; // Base monthly fee
  const firstYearIncrease = (monthlyBase * 1.05).toFixed(2); // 5% increase
  const secondYearIncrease = (monthlyBase * 1.10).toFixed(2); // 10% increase

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      setIsModalOpen(true);
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to process checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalClose = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      // Delete all basket items for the user
      const { error } = await supabase
        .from('basket_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      // Clear all items from local state
      items.forEach(item => removeFromBasket(item.id));
      
      setIsModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Error clearing basket:', err);
      alert('Failed to clear basket. Please try again.');
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <ShoppingBasket className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Your basket is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your basket to continue shopping</p>
          <Link 
            to="/" 
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Review your basket</h1>
          
          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="text-center mb-6">
              <p className="text-xl">
                Total cost: <span className="font-bold">£{totalUpfront}</span> upfront + 
                <span className="font-bold">£{monthlyBase}</span>
                <sup>*</sup> monthly
              </p>
              <p className="text-sm text-gray-600">
                Monthly price increases to £{firstYearIncrease} on 1 April 2026 and £{secondYearIncrease} on 1 April 2027
              </p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link 
                to="/"
                className="px-6 py-3 border-2 border-black rounded-md hover:bg-gray-100 transition-colors"
              >
                Continue shopping
              </Link>
              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Go to checkout'}
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your items</h2>
                <button 
                  onClick={() => items.forEach(item => removeFromBasket(item.id))}
                  className="text-gray-600 hover:text-red-600 flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Empty basket
                </button>
              </div>
            </div>
            {/* Debugging output */}
            <>{console.log(items)}</>
            {items.map((item) => (
              <div key={item.id} className="p-6 border-b">
                <div className="flex justify-between">
                  <div className="flex gap-6">
                    <img 
                      src={getPhoneImagePath(item.id)}
                      alt={item.id}
                      className="w-24 h-24 object-contain"
                    />
                    <div>
                      <h3 className="font-bold mb-2">{item.id}</h3>
                      <p className="text-gray-600">{item.colorName}, {item.capacitySize}</p>
                      <p className="mt-2">
                        <span className="font-bold">£{item.price}</span> upfront
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromBasket(item.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-md">
                    <span className="font-medium">See finance breakdown</span>
                    <ChevronDown size={18} />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-md">
                    <span className="font-medium">About your SIM</span>
                    <ChevronDown size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="p-6">
              <button className="w-full flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Plus size={18} />
                  <span className="font-medium">Add Ons</span>
                </div>
                <span className="text-red-600">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
      />
    </div>
  );
};