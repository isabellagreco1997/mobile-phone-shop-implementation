import React, { useState } from 'react';
import { PhonesListProps } from './PhonesList.types';
import PhoneCard from '../PhoneCard';
import { SlidersHorizontal } from 'lucide-react';

const PhonesList: React.FC<PhonesListProps> = ({ phones }) => {
  const [sortBy, setSortBy] = useState<string>('default');
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  
  const sortedPhones = [...phones].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.pricing.monthly - b.pricing.monthly;
      case 'price-high':
        return b.pricing.monthly - a.pricing.monthly;
      case 'name-asc':
        return `${a.brand} ${a.deviceName}`.localeCompare(`${b.brand} ${b.deviceName}`);
      case 'name-desc':
        return `${b.brand} ${b.deviceName}`.localeCompare(`${a.brand} ${a.deviceName}`);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <button className="flex items-center px-6 py-3 bg-black text-white font-medium rounded mb-4 md:mb-0">
          <SlidersHorizontal size={20} className="mr-2" />
          Filters
        </button>
        
        <div className="flex items-center justify-between w-full md:w-auto">
          <span className="mr-4 font-medium">{phones.length} items</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none border border-gray-300 rounded-md pl-4 pr-10 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPhones.map(phone => (
          <PhoneCard key={phone.deviceName} phone={phone} />
        ))}
      </div>
    </div>
  );
};

export default PhonesList;