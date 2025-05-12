import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BasketSummary from './BasketSummary';
import { BasketProvider } from '../../context/BasketContext';

const mockItems = [
  { id: 'iPhone 16 Pro', colorName: 'Black', capacitySize: '128GB', price: 999 },
  { id: 'Galaxy S25', colorName: 'Blue', capacitySize: '256GB', price: 899 }
];

jest.mock('../../context/BasketContext', () => ({
  useBasket: () => ({
    items: mockItems,
    itemCount: mockItems.length
  }),
  BasketProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('BasketSummary', () => {
  it('displays empty basket message when no items', () => {
    jest.spyOn(require('../../context/BasketContext'), 'useBasket').mockImplementation(() => ({
      items: [],
      itemCount: 0
    }));

    render(
      <BrowserRouter>
        <BasketSummary />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Your basket is empty')).toBeInTheDocument();
    expect(screen.getByText('Continue shopping')).toBeInTheDocument();
  });

  it('displays basket items and total when items exist', () => {
    render(
      <BrowserRouter>
        <BasketSummary />
      </BrowserRouter>
    );
    
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S25')).toBeInTheDocument();
    expect(screen.getByText('£1898')).toBeInTheDocument();
  });
});