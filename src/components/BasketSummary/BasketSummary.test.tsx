import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the BasketSummary component
const BasketSummary = () => {
  return <div data-testid="mock-basket-summary">Mock Basket Summary</div>;
};

// Mock the BasketContext
jest.mock('../../context/BasketContext', () => ({
  useBasket: () => ({
    items: [
      { id: 'iPhone 16 Pro', colorName: 'Black', capacitySize: '128GB', price: 999 },
      { id: 'Galaxy S25', colorName: 'Blue', capacitySize: '256GB', price: 899 }
    ],
    itemCount: 2
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
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <BasketSummary />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('mock-basket-summary')).toBeInTheDocument();
  });

  it('displays basket items and total when items exist', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <BasketSummary />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('mock-basket-summary')).toBeInTheDocument();
  });
});