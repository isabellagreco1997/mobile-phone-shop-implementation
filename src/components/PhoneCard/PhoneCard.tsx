import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCardProps } from './PhoneCard.types';
import FiveGIcon from '../FiveGIcon';
import { getPhoneImagePath } from '../../utils/imageUtils';

const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-teal-700 text-white py-2 px-4">
        Offers Available
      </div>
      
      <div className="p-6 flex flex-col h-[400px]">
        <div className="flex items-center flex-grow">
          {/* Phone Image */}
          <div className="w-1/2 pr-6">
            <img 
              src={getPhoneImagePath(phone.deviceName)}
              alt={`${phone.brand} ${phone.deviceName}`}
              className="h-64 object-contain"
            />
          </div>
          
          {/* Phone Details */}
          <div className="w-1/2">
            {/* 5G Icon */}
            {phone.isFiveG && (
              <div className="flex justify-end mb-4">
                <FiveGIcon />
              </div>
            )}
            
            <div className="space-y-1">
              <p className="text-gray-600">{phone.brand}</p>
              <h2 className="text-2xl font-bold">{phone.deviceName}</h2>
              <p className="text-sm text-gray-600 mt-4">From</p>
              <p className="text-2xl font-bold">£{phone.pricing.monthly}</p>
              <p className="text-sm text-gray-600">per month</p>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <Link 
          to={`/phones/${phone.deviceName.toLowerCase().replace(/\s+/g, '-')}`}
          className="mt-auto block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-md transition-colors"
        >
          See more details
        </Link>
      </div>
    </div>
  );
};

export default PhoneCard;