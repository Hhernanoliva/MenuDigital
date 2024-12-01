export interface ProcessedVariant {
  value: string;
  price: number | null;
  ofertaPrecio: number | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: boolean;
  image: string;
  marca?: string;
  variants: {
    sizes?: ProcessedVariant[];
    colors?: ProcessedVariant[];
    flavors?: ProcessedVariant[];
  };
  basePrice: number;
  baseOfertaPrecio: number | null;
  ofertaPorcentaje: number | null;
}

export interface Category {
  name: string;
  image: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedVariants: Record<string, string>;
}