export interface Variant {
  _id?: string;
  name: string;
  title?: string;
  price: number;
  finalPrice?: number;
  images: (string | File)[];
  specifications: {
    [key: string]: string;
  };
  stock: number;
  weight: number;
  createdAt?: string;
  updatedAt?: string;
  sku: string;
  sold: number;
  cost: number;
  dimension?: {
    length: number;
    width: number;
    height: number;
  };
  saleOff: {
    startDate: string;
    endDate: string;
    percentage: number;
  };
}
