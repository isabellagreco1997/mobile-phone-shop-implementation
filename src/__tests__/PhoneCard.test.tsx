import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhoneCard from '../components/PhoneCard';
import { Phone } from '../types';

const mockPhone: Phone = {
  id: 'test-phone',
  brand: 'Test Brand',
  model: 'Test Model',
  description: 'Test description',
  price: 799,
  monthly: 33,
  imageUrl: '/test-image.png',
  colors: [
    { name: 'Black', hex: '#000000', imageUrl: '/test-black.png' }
  ],
  capacities: [
    { size: '128GB', price: 799 }
  ],
  has5G: true,
  stock: 'In stock'
};

describe('PhoneCard', () => {
  it('renders phone details correctly', () => {
    render(
      <BrowserRouter>
        <PhoneCard phone={mockPhone} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Model')).toBeInTheDocument();
    expect(screen.getByText('£33')).toBeInTheDocument();
    expect(screen.getByText('per month')).toBeInTheDocument();
    expect(screen.getByText('5G')).toBeInTheDocument();
    expect(screen.getByText('See more details')).toBeInTheDocument();
  });
  
  it('does not show 5G indicator when phone does not have 5G', () => {
    const nonFiveGPhone = { ...mockPhone, has5G: false };
    
    render(
      <BrowserRouter>
        <PhoneCard phone={nonFiveGPhone} />
      </BrowserRouter>
    );
    
    expect(screen.queryByText('5G')).not.toBeInTheDocument();
  });
  
  it('links to the correct phone detail page', () => {
    render(
      <BrowserRouter>
        <PhoneCard phone={mockPhone} />
      </BrowserRouter>
    );
    
    const detailsLink = screen.getByText('See more details');
    expect(detailsLink.closest('a')).toHaveAttribute('href', '/phones/test-phone');
  });
});