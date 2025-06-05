"use client";

import { Address } from "@/app/_types/address";
import AddressCard from "./AddressCard";

interface AddressesListProps {
  addresses: Address[];
}

function AddressesList({ addresses }: AddressesListProps) {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>No addresses found. Add your first address to get started.</p>
      </div>
    );
  }

  // Sort addresses to ensure the default address appears first
  const sortedAddresses = addresses.sort(
    (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0),
  );

  return (
    <div className="flex flex-col divide-y">
      {sortedAddresses.map((address) => (
        <AddressCard key={address._id} address={address} />
      ))}
    </div>
  );
}

export default AddressesList;
