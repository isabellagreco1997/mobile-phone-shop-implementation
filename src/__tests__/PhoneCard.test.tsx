import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhoneCard from '../components/PhoneCard';
import { Phone } from '../types';

const mockPhone: Phone = {
  deviceName: 'Test Model',
  brand: 'Test Brand',
  colourOptions: [
    { name: 'Black', hex: '#000000' }
  ],
  dataOptions: [
    { name: '128GB', price: 799 }
  ],
  pricing: {
    monthly: 33
  },
  stock: 10,
  isFiveG: true
};

describe('PhoneCard', () => {
  it('renders phone details correctly', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PhoneCard phone={mockPhone} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Model')).toBeInTheDocument();
    expect(screen.getByText('£33')).toBeInTheDocument();
    expect(screen.getByText('per month')).toBeInTheDocument();
    expect(screen.getByAltText('5G Ultra')).toBeInTheDocument();
    expect(screen.getByText('See more details')).toBeInTheDocument();
  });
  
  it('does not show 5G indicator when phone does not have 5G', () => {
    const nonFiveGPhone = { ...mockPhone, isFiveG: false };
    
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PhoneCard phone={nonFiveGPhone} />
      </BrowserRouter>
    );
    
    expect(screen.queryByAltText('5G Ultra')).not.toBeInTheDocument();
  });
  
  it('links to the correct phone detail page', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PhoneCard phone={mockPhone} />
      </BrowserRouter>
    );
    
    const detailsLink = screen.getByText('See more details');
    expect(detailsLink.closest('a')).toHaveAttribute('href', '/phones/test-model');
  });
});