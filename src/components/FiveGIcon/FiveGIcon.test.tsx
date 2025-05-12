import { render, screen } from '@testing-library/react';
import FiveGIcon from './FiveGIcon';

describe('FiveGIcon', () => {
  it('renders with default className', () => {
    render(<FiveGIcon />);
    const icon = screen.getByAltText('5G Ultra');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-6');
  });

  it('renders with custom className', () => {
    render(<FiveGIcon className="custom-class" />);
    const icon = screen.getByAltText('5G Ultra');
    expect(icon).toHaveClass('h-6 custom-class');
  });
});