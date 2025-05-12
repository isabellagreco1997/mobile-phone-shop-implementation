import React from 'react';
import { CapacitySelectorProps } from './CapacitySelector.types';

const CapacitySelector: React.FC<CapacitySelectorProps> = ({ 
  capacities, 
  selectedCapacity, 
  onSelectCapacity 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium mb-3">Select capacity</h3>
      <div className="relative">
        <select
          value={selectedCapacity.name}
          onChange={(e) => {
            const capacity = capacities.find(c => c.name === e.target.value);
            if (capacity) onSelectCapacity(capacity);
          }}
          className="appearance-none border border-gray-300 rounded-md w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          {capacities.map(capacity => (
            <option key={capacity.name} value={capacity.name}>
              {capacity.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CapacitySelector;