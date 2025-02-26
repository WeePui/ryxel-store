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
