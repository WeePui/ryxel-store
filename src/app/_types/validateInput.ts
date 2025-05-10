import { City, District, Ward } from './address';

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  gender: string;
  dob: string;
  terms: boolean;
}

export interface UpdateProfileInput {
  name?: string;
  photo?: File;
}

export interface UpdatePasswordInput {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

export interface AddressFormInput {
  fullname: string;
  phoneNumber: string;
  city: City;
  district: District;
  ward: Ward;
  address: string;
  isDefault: boolean;
}

export interface AddressSelectInput {
  [key: string]: { code: string | number; name: string } | string;
}

export interface ReviewInput {
  review: string;
  rating: number;
  images: File[];
  video?: File | null;
  productId: string;
  variantId: string;
}

export interface ReviewUpdateInput {
  _id: string;
  review: string;
  rating: number;
  images: Array<File | string>;
  video?: string | File | null;
}

export interface CategoryInput {
  name: string;
  description: string;
  image: File | string | null;
  slug?: string;
  id?: string;
}
