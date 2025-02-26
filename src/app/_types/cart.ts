import { Product } from './product';

export interface Cart {
  products: CartItem[];
}

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
}
