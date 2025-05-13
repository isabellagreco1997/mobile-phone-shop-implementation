import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, ColorOption, DataOption } from '../types';
import ColorSelector from '../components/ColorSelector';
import CapacitySelector from '../components/CapacitySelector';
import StockIndicator from '../components/StockIndicator';
import AddToBasketButton from '../components/AddToBasketButton';
import ErrorMessage from '../components/ErrorMessage';
import { useBasket } from '../context/BasketContext';
import { Truck } from 'lucide-react';
import FiveGIcon from '../components/FiveGIcon';
import { getPhoneByName } from '../services/phoneService';
import { isAppError } from '../utils/errorHandler';
import { getPhoneImagePath } from '../utils/imageUtils';

const PhoneDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<DataOption | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [basketError, setBasketError] = useState<string | null>(null);
  
  const { addToBasket, removeFromBasket, isInBasket } = useBasket();

  const fetchPhone = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const normalizedId = id?.replace(/-/g, ' ');
      if (!normalizedId) throw new Error('Invalid phone ID');

      const phoneData = await getPhoneByName(normalizedId);
      if (!phoneData) {
        navigate('/');
        return;
      }

      setPhone(phoneData);
      setSelectedColor(phoneData.colourOptions[0]);
      setSelectedCapacity(phoneData.dataOptions[0]);
    } catch (err) {
      const message = isAppError(err) ? err.message : 'Failed to load phone details';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhone();
  }, [id, navigate]);

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
  };

  const handleCapacitySelect = (capacity: DataOption) => {
    setSelectedCapacity(capacity);
  };

  const handleBasketAction = async () => {
    try {
      setBasketError(null);
      if (!phone || !selectedColor || !selectedCapacity || phone.stock === 0) return;

      const basketItem = {
        id: phone.deviceName,
        colorName: selectedColor.name,
        capacitySize: selectedCapacity.name,
        price: selectedCapacity.price
      };

      if (isInBasket(phone.deviceName)) {
        await removeFromBasket(phone.deviceName);
      } else {
        await addToBasket(basketItem);
      }
    } catch (err) {
      const message = isAppError(err) ? err.message : 'Failed to update basket';
      setBasketError(message);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={fetchPhone} />
      </div>
    );
  }

  if (!phone || !selectedColor || !selectedCapacity) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-start">
          {/* Left column - Product image */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="flex flex-col">
              <div className="mb-2">
                <h1 className="text-2xl font-medium">{phone.brand}</h1>
                <h2 className="text-4xl font-bold mb-8">{phone.deviceName}</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg flex justify-center items-center mb-6">
                <img 
                  src={getPhoneImagePath(phone.deviceName)}
                  alt={`${phone.brand} ${phone.deviceName} in ${selectedColor.name}`} 
                  className="max-w-full h-auto"
                />
              </div>
              
              <div className="prose max-w-none">
                <p>{phone.description}</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Product details and actions */}
          <div className="lg:w-1/2 lg:pl-12">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              {/* 5G indicator */}
              {phone.isFiveG && (
                <div className="flex justify-end mb-4">
                  <FiveGIcon />
                </div>
              )}
              
              {/* Color selector */}
              <ColorSelector 
                colors={phone.colourOptions}
                selectedColor={selectedColor}
                onSelectColor={handleColorSelect}
              />
              
              {/* Capacity selector */}
              <CapacitySelector 
                capacities={phone.dataOptions}
                selectedCapacity={selectedCapacity}
                onSelectCapacity={handleCapacitySelect}
              />
              
              {/* Stock indicator */}
              <StockIndicator stock={phone.stock} />
              
              {/* Delivery options */}
              <div className="mb-8">
                <div className="flex items-start mb-2">
                  <Truck className="mr-2 mt-1 flex-shrink-0" size={20} />
                  <p>Free home delivery. Order before 10:00pm today and get it tomorrow. Premium delivery slots available. Exclusions apply</p>
                </div>
                <p className="ml-8">Or click and collect in store</p>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <h3 className="text-xl font-bold">Total device cost: £{selectedCapacity.price}</h3>
              </div>
              
              {/* Basket error message */}
              {basketError && (
                <div className="mb-4">
                  <ErrorMessage message={basketError} onRetry={handleBasketAction} />
                </div>
              )}
              
              {/* Add to basket button */}
              <AddToBasketButton 
                inBasket={isInBasket(phone.deviceName)} 
                onClick={handleBasketAction}
                disabled={phone.stock === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetailsPage;