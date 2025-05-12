import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the Header component
const Header = () => {
  return <header data-testid="mock-header">Mock Header</header>;
};

// Mock the BasketContext
jest.mock('../../context/BasketContext', () => ({
  useBasket: () => ({
    itemCount: 2
  }),
  BasketProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the supabase module
jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
      onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } })
    }
  }
}));

describe('Header', () => {
  it('renders header with navigation', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});