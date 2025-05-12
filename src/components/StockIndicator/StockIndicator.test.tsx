import { render, screen } from '@testing-library/react';
import StockIndicator from './StockIndicator';

describe('StockIndicator', () => {
  it('renders In stock status with green color', () => {
    render(<StockIndicator stock={10} />);
    
    const statusElement = screen.getByText('In stock');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement.parentElement).toHaveClass('text-green-600');
  });
  
  it('renders Limited stock status with amber color', () => {
    render(<StockIndicator stock={3} />);
    
    const statusElement = screen.getByText('Limited stock');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement.parentElement).toHaveClass('text-amber-600');
  });
  
  it('renders Out of stock status with red color', () => {
    render(<StockIndicator stock={0} />);
    
    const statusElement = screen.getByText('Out of stock');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement.parentElement).toHaveClass('text-red-600');
  });
});