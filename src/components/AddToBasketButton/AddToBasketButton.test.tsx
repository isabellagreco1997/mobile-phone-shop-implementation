import { render, screen, fireEvent } from '@testing-library/react';
import AddToBasketButton from './AddToBasketButton';

describe('AddToBasketButton', () => {
  it('displays "Add to basket" when not in basket', () => {
    const handleClick = jest.fn();
    render(<AddToBasketButton inBasket={false} onClick={handleClick} />);
    
    const button = screen.getByText('Add to basket');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-600');
  });
  
  it('displays "Remove from basket" when in basket', () => {
    const handleClick = jest.fn();
    render(<AddToBasketButton inBasket={true} onClick={handleClick} />);
    
    const button = screen.getByText('Remove from basket');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-gray-200');
  });
  
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<AddToBasketButton inBasket={false} onClick={handleClick} />);
    
    const button = screen.getByText('Add to basket');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});