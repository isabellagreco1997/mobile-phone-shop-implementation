import React from 'react';
import { FiveGIconProps } from './FiveGIcon.types';

const FiveGIcon: React.FC<FiveGIconProps> = ({ className = '' }) => {
  return (
    <img 
      src="https://cdn.vodafone.co.uk/mobile/phones/pay-monthly-contracts/assets//ws10/icons/UkBrandIcons/5g-ultra.svg"
      alt="5G Ultra"
      className={`h-6 ${className}`}
    />
  );
};

export default FiveGIcon;