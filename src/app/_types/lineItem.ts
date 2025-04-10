import { Product } from './product';
import { Review } from './review';
import { Variant } from './variant';

export interface LineItem {
  product: Product | string;
  variant: string | Variant;
  quantity: number;
  unitPrice?: number;
  review?: Review;
}
