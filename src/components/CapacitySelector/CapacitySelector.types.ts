import { DataOption } from '../../types';

export interface CapacitySelectorProps {
  capacities: DataOption[];
  selectedCapacity: DataOption;
  onSelectCapacity: (capacity: DataOption) => void;
}