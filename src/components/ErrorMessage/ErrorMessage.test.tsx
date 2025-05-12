import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('displays the error message', () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('shows retry button when onRetry prop is provided', () => {
    const handleRetry = jest.fn();
    render(<ErrorMessage message="Test error" onRetry={handleRetry} />);
    
    const retryButton = screen.getByText('Try again');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('does not show retry button when onRetry prop is not provided', () => {
    render(<ErrorMessage message="Test error" />);
    expect(screen.queryByText('Try again')).not.toBeInTheDocument();
  });
});