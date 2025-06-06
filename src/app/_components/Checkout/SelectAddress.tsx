"use client";

import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import ConfirmDialogue from "../UI/ConfirmDialogue";
import Modal from "../UI/Modal";
import { useRouter } from "next/navigation";
import FormAddAddress from "../Address/FormAddAddress";
import Button from "../UI/Button";
import CheckoutAddressList from "./CheckoutAddressList";
import { Address } from "@/app/_types/address";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface SelectAddressProps {
  addresses: Address[];
  onSelect: (address: Address) => void;
}

function SelectAddress({ addresses, onSelect }: SelectAddressProps) {
  const { t } = useLanguage();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isModalAddAddressVisible, setIsModalAddAddressVisible] =
    useState(false);
  const [
    isModalConfirmAddFirstAddressVisible,
    setIsModalConfirmAddFirstAddressVisible,
  ] = useState(false);
  const [isModalSelectAddressVisible, setIsModalSelectAddressVisible] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    if (addresses.length === 0) {
      setIsModalConfirmAddFirstAddressVisible(true);
      return;
    }

    const defaultAddress = addresses.find((address) => address.isDefault);
    if (!defaultAddress) {
      setSelectedAddress(null);
      return;
    } else {
      handleSelectAddress(defaultAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  function handleCancelAddFirstAddress() {
    if (addresses.length === 0 && !isModalAddAddressVisible)
      router.replace("/cart");
  }

  function handleSelectAddress(address: Address) {
    setSelectedAddress(address);
    onSelect(address);
  }

  return (
    <>
      {isModalConfirmAddFirstAddressVisible && (
        <Modal onClose={handleCancelAddFirstAddress}>
          <ConfirmDialogue
            message={t("checkout.selectAddress.confirmDialog")}
            onCancel={handleCancelAddFirstAddress}
            onConfirm={() => setIsModalAddAddressVisible(true)}
          />
        </Modal>
      )}

      <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-8 shadow-md">
        <h2 className="flex items-center text-xl font-bold">
          <FaMapLocationDot />
          <span className="ml-2">{t("checkout.selectAddress.title")}</span>
        </h2>
        <div className="flex items-center gap-2 lg:flex-col lg:items-start">
          {selectedAddress && (
            <>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-semibold">
                  {selectedAddress.fullname}
                </span>
                <span className="text-xl font-thin text-grey-default">
                  &#x2758;
                </span>
                <span className="font-semibold">
                  {selectedAddress.phoneNumber}
                </span>
              </div>
              <div className="pl-6 lg:pl-0">
                <p className="text-grey-default">
                  {selectedAddress.address}, {selectedAddress.ward?.name},{" "}
                  {selectedAddress.district?.name}, {selectedAddress.city?.name}
                </p>
                {selectedAddress.isDefault && (
                  <span className="mt-2 inline-block w-auto rounded-xl border-2 border-primary-default px-2 text-center lg:text-sm">
                    {t("account.addresses.defaultLabel")}
                  </span>
                )}
              </div>
            </>
          )}
          <div className="ml-10 lg:ml-0 lg:mt-4 lg:w-full">
            <Button
              variant="tertiary"
              onClick={() => setIsModalSelectAddressVisible(true)}
            >
              {t("checkout.selectAddress.change")}
            </Button>
          </div>
        </div>
      </div>

      {isModalAddAddressVisible && (
        <Modal onClose={() => setIsModalAddAddressVisible(false)}>
          <FormAddAddress
            onSubmit={() => {
              setIsModalAddAddressVisible(false);
              setIsModalConfirmAddFirstAddressVisible(false);
            }}
          />
        </Modal>
      )}

      {isModalSelectAddressVisible && (
        <Modal
          onClose={() => setIsModalSelectAddressVisible(false)}
          closeOnOutsideClick={false}
        >
          <CheckoutAddressList
            addresses={addresses}
            onSelect={handleSelectAddress}
            selected={selectedAddress}
          />
        </Modal>
      )}
    </>
  );
}

export default SelectAddress;
