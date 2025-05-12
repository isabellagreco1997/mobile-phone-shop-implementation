export interface Phone {
  deviceName: string;
  brand: string;
  colourOptions: ColorOption[];
  dataOptions: DataOption[];
  pricing: {
    monthly: number;
  };
  stock: number;
  isFiveG: boolean;
}

export interface ColorOption {
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface DataOption {
  name: string;
  price: number;
}

export type StockStatus = 'In stock' | 'Limited stock' | 'Out of stock';