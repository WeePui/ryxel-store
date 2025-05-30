"use client";

import { useState } from "react";
import AddAddress from "../Address/AddAddress";
import AddressCard from "../Address/AddressCard";
import { Address } from "@/app/_types/address";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface CheckoutAddressListProps {
  addresses: Address[];
  onSelect: (address: Address) => void;
  selected: Address | null;
}

function CheckoutAddressList({
  addresses,
  onSelect,
  selected,
}: CheckoutAddressListProps) {
  const { t } = useLanguage();
  const [selectedAddress, setSelectedAddress] = useState(selected);

  const sortedAddresses = addresses?.sort(
    (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0),
  );

  const handleAddressChange = (address: Address) => {
    setSelectedAddress(address);
    onSelect(address);
  };

  return (
    <>
      <div className="mb-10 flex items-center justify-between md:flex-col md:items-start md:gap-4">
        <h2 className="text-xl font-bold">{t("checkout.addressList.title")}</h2>
        <AddAddress />
      </div>
      <div className="flex flex-col divide-y">
        {sortedAddresses.map((address) => (
          <label
            key={address._id}
            className="flex cursor-pointer items-center gap-4 p-4 lg:flex-col lg:items-start lg:gap-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="address"
                checked={selectedAddress?._id === address._id}
                onChange={() => handleAddressChange(address)}
                className="h-4 w-4 cursor-pointer"
              />
              <span className="hidden lg:block">
                {t("checkout.addressList.selectAddress")}
              </span>
            </div>
            <AddressCard address={address} />
          </label>
        ))}
      </div>
    </>
  );
}

export default CheckoutAddressList;
