import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ColorSelectorProps } from './ColorSelector.types';

const ColorSelector: React.FC<ColorSelectorProps> = ({ 
  colors, 
  selectedColor, 
  onSelectColor 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleColorSelect = (color: ColorOption) => {
    onSelectColor(color);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium mb-3">Select colour</h3>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between border border-gray-300 rounded-md p-3 bg-white hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center">
            <div 
              className="w-6 h-6 rounded-full mr-3 border border-gray-200" 
              style={{ backgroundColor: `#${selectedColor.hex}` }}
            />
            <span>{selectedColor.name}</span>
          </div>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
            {colors.map(color => (
              <button 
                key={color.name}
                className={`w-full flex items-center p-3 hover:bg-gray-50 ${
                  selectedColor.name === color.name ? 'bg-gray-50' : ''
                }`}
                onClick={() => handleColorSelect(color)}
              >
                <div 
                  className="w-6 h-6 rounded-full mr-3 border border-gray-200" 
                  style={{ backgroundColor: `#${color.hex}` }}
                />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSelector