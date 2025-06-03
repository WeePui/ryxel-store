import { City, District, Ward } from "../_types/address";
import { AddressFormInput, AddressSelectInput } from "../_types/validateInput";

export function transformAddressFormData(data: AddressSelectInput) {
  const transformedCity = {
    code: parseInt(data.cityCode as string, 10),
    name: data.cityName as string,
  } as City;
  const transformedDistrict = {
    code: parseInt(data.districtCode as string, 10),
    name: data.districtName as string,
  } as District;
  const transformedWard = {
    code: data.wardCode as string,
    name: data.wardName as string,
  } as Ward;

  const addressData: AddressFormInput = {
    fullname: data.fullname as string,
    phoneNumber: data.phoneNumber as string,
    city: transformedCity,
    district: transformedDistrict,
    ward: transformedWard,
    address: data.address as string,
    isDefault: data.isDefault === "true",
  };

  return addressData;
}
