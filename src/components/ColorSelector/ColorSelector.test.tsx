import { render, screen, fireEvent } from '@testing-library/react';
import ColorSelector from './ColorSelector';
import { ColorOption } from '../../types';

const mockColors: ColorOption[] = [
  { name: 'Black', hex: '000000', imageUrl: '/black.png' },
  { name: 'White', hex: 'FFFFFF', imageUrl: '/white.png' },
  { name: 'Blue', hex: '0000FF', imageUrl: '/blue.png' }
];

describe('ColorSelector', () => {
  it('renders the selected color', () => {
    const handleSelect = jest.fn();
    
    render(
      <ColorSelector 
        colors={mockColors} 
        selectedColor={mockColors[0]} 
        onSelectColor={handleSelect} 
      />
    );
    
    expect(screen.getByText('Black')).toBeInTheDocument();
  });
  
  it('opens dropdown when clicked', () => {
    const handleSelect = jest.fn();
    
    render(
      <ColorSelector 
        colors={mockColors} 
        selectedColor={mockColors[0]} 
        onSelectColor={handleSelect} 
      />
    );
    
    const button = screen.getByRole('button', { name: /Black/i });
    fireEvent.click(button);
    
    mockColors.forEach(color => {
      expect(screen.getByText(color.name)).toBeInTheDocument();
    });
  });
  
  it('calls onSelectColor when a color is selected', () => {
    const handleSelect = jest.fn();
    
    render(
      <ColorSelector 
        colors={mockColors} 
        selectedColor={mockColors[0]} 
        onSelectColor={handleSelect} 
      />
    );
    
    const button = screen.getByRole('button', { name: /Black/i });
    fireEvent.click(button);
    
    const whiteOption = screen.getByText('White');
    fireEvent.click(whiteOption);
    
    expect(handleSelect).toHaveBeenCalledWith(mockColors[1]);
  });
});