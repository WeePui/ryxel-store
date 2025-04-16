import { LineItem } from './lineItem';

export interface Order {
  _id: string;
  code?: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  lineItems: LineItem[];
  shippingAddress: string;
  paymentMethod: string;
  shippingFee: number;
  discountAmount: number;
  subtotal: number;
  reviewCount: number;
  orderCode: string;
}
