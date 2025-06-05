"use client";

import { useEffect, useState } from "react";
import { Address } from "@/app/_types/address";
import { getAddresses } from "../../_libs/apiServices";
import AddressCard from "./AddressCard";
import { getCookie } from "../../_utils/cookieUtils";
import Loader from "../UI/Loader";
import { useApiError } from "../../_hooks/useApiError";
import ApiErrorDisplay from "../UI/ApiErrorDisplay";

function AddressesList() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const { error, handleError, clearError } = useApiError();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        clearError();

        const token = getCookie("jwt");
        if (!token) {
          handleError({
            status: "error",
            message: "Authentication required. Please log in.",
          });
          return;
        }

        const data = await getAddresses({ value: token });

        if (data.status !== "success") {
          handleError(data);
          return;
        }

        const addressData = data.data.addresses as Address[];

        // Sort addresses to ensure the default address appears first
        const sortedAddresses = addressData?.sort(
          (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0),
        );

        setAddresses(sortedAddresses || []);
      } catch (err) {
        handleError({
          status: "error",
          message: "Failed to load addresses. Please try again.",
        });
        console.error("Error fetching addresses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [handleError, clearError]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <ApiErrorDisplay
        error={error}
        action={{
          label: "Retry",
          onClick: () => window.location.reload(),
        }}
      />
    );
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>No addresses found. Add your first address to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y">
      {addresses.map((address) => (
        <AddressCard key={address._id} address={address} />
      ))}
    </div>
  );
}

export default AddressesList;
