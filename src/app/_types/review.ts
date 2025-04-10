export interface ReviewProduct {
  name: string;
  variants: {
    _id: string;
    name: string;
  }[];
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  user: {
    name: string;
    photo: {
      url: string;
      public_id: string;
    };
  };
  images: string[];
  video: string;
  variant: string;
  createdAt: string;
  updatedAt: string;
}
