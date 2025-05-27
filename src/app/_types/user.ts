export interface User {
  _id: string;
  name: string;
  email: string;
  photo: {
    url: string;
  };
  gender: string;
  phoneNo: string;
  dob: string;
  emailVerified: boolean;
  active: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}
