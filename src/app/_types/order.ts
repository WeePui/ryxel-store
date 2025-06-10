import { Address } from './address';
import { LineItem } from './lineItem';
import { User } from './user';

export interface Order {
  _id: string;
  code?: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  lineItems: LineItem[];
  shippingAddress: string | Address;
  paymentMethod: string;  shippingFee: number;
  discountAmount: number;
  discount?: string;
  subtotal: number;
  reviewCount: number;
  orderCode: string;
  shippingTracking?: {
    ghnOrderCode: string;
    trackingStatus: string;
    statusHistory: {
      _id: string;
      status: string;
      description: string;
      timestamp: string;
    }[];
    expectedDeliveryDate?: string;
  };
  user?: User;
  adminNotes: string;
}
