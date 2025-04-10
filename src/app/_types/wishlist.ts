import { Product } from './product';

export interface Wishlist {
  products: Product[];
  shareCode?: string;
  createdAt?: Date;
}
