import { ColorOption } from '../../types';

export interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
}