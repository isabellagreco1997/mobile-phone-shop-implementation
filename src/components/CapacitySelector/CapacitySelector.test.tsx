import { render, screen, fireEvent } from '@testing-library/react';
import CapacitySelector from './CapacitySelector';
import { DataOption } from '../../types';

const mockCapacities: DataOption[] = [
  { name: '128GB', price: 899 },
  { name: '256GB', price: 999 },
  { name: '512GB', price: 1199 }
];

describe('CapacitySelector', () => {
  it('renders all capacity options', () => {
    const handleSelect = jest.fn();
    
    render(
      <CapacitySelector 
        capacities={mockCapacities}
        selectedCapacity={mockCapacities[0]}
        onSelectCapacity={handleSelect}
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    mockCapacities.forEach(capacity => {
      expect(screen.getByText(capacity.name)).toBeInTheDocument();
    });
  });
  
  it('calls onSelectCapacity when a new capacity is selected', () => {
    const handleSelect = jest.fn();
    
    render(
      <CapacitySelector 
        capacities={mockCapacities}
        selectedCapacity={mockCapacities[0]}
        onSelectCapacity={handleSelect}
      />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '256GB' } });
    
    expect(handleSelect).toHaveBeenCalledWith(mockCapacities[1]);
  });
});