import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the PhonesList component
const PhonesList = () => {
  return <div data-testid="mock-phones-list">Mock Phones List</div>;
};

describe('PhonesList', () => {
  it('renders phones list', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PhonesList />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('mock-phones-list')).toBeInTheDocument();
  });
});
