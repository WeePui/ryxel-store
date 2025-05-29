import { Category } from "./category";
import { Review } from "./review";
import { Variant } from "./variant";

export interface Product {
  _id: string;
  name: string;
  imageCover: string;
  description: string;
  variants: Variant[];
  lowestPrice: number;
  percentageSaleOff: number;
  brand: string;
  sold: number;
  rating: number;
  ratingsQuantity: number;
  category: Category;
  updatedAt: string;
  createdAt: string;
  slug: string;
  reviews: Review[];
  totalStock: number;
}
