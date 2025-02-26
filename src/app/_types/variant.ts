export interface Variant {
  _id: string;
  name: string;
  title: string;
  price: number;
  images: string[];
  specifications: {
    [key: string]: string;
  };
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
