import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhoneCard from './PhoneCard';
import { Phone } from '../../types';

const mockPhone: Phone = {
  deviceName: 'Test Phone',
  brand: 'Test Brand',
  colourOptions: [
    { name: 'Black', hex: '000000' }
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
    expect(screen.getByText('Test Phone')).toBeInTheDocument();
    expect(screen.getByText('£33')).toBeInTheDocument();
    expect(screen.getByText('per month')).toBeInTheDocument();
    expect(screen.getByText('See more details')).toBeInTheDocument();
  });

  it('shows 5G icon when phone has 5G', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PhoneCard phone={mockPhone} />
      </BrowserRouter>
    );
    
    expect(screen.getByAltText('5G Ultra')).toBeInTheDocument();
  });

  it('does not show 5G icon when phone does not have 5G', () => {
    const nonFiveGPhone = { ...mockPhone, isFiveG: false };
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PhoneCard phone={nonFiveGPhone} />
      </BrowserRouter>
    );
    
    expect(screen.queryByAltText('5G Ultra')).not.toBeInTheDocument();
  });
});