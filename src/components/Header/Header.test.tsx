import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { BasketProvider } from '../../context/BasketContext';

describe('Header', () => {
  const renderHeader = () => {
    render(
      <BrowserRouter>
        <BasketProvider>
          <Header />
        </BasketProvider>
      </BrowserRouter>
    );
  };

  it('renders logo and navigation links', () => {
    renderHeader();
    
    expect(screen.getByText('PhoneShop')).toBeInTheDocument();
    expect(screen.getByText('Phones')).toBeInTheDocument();
    expect(screen.getByText('Accessories')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    renderHeader();
    
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    expect(screen.getAllByText('Phones')).toHaveLength(2); // Desktop + Mobile
    
    fireEvent.click(menuButton);
    expect(screen.getAllByText('Phones')).toHaveLength(1); // Desktop only
  });
});