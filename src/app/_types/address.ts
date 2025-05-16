export interface Address {
  _id: string;
  fullname: string;
  phoneNumber: string;
  isDefault: boolean;
  city: {
    name: string;
    code: number;
  };
  district: {
    name: string;
    code: number;
  };
  ward: {
    name: string;
    code: string;
  };
  country?: string;
  address: string;
  addressInfo?: string;
}

export interface City {
  name: string;
  code: number;
}

export interface District {
  name: string;
  code: number;
}

export interface Ward {
  name: string;
  code: string;
}
