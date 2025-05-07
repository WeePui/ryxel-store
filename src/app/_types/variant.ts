export interface Variant {
  _id?: string;
  name: string;
  title?: string;
  price: number;
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
  saleOff: {
    startDate: Date;
    endDate: Date;
    percentage: number;
  };
}
