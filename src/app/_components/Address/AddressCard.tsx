"use client";

import Button from "@components/UI/Button";
import Modal from "../UI/Modal";
import ConfirmDialogue from "../UI/ConfirmDialogue";
import { useState } from "react";
import {
  deleteAddressAction,
  setDefaultAddressAction,
} from "@/app/_libs/actions";
import { toast } from "react-toastify";
import FormUpdateAddress from "./FormUpdateAddress";
import { Address } from "@/app/_types/address";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface AddressCardProps {
  address: Address;
}

function AddressCard({ address }: AddressCardProps) {
  const { t } = useLanguage();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  async function handleDeleteAddress() {
    const result = await deleteAddressAction(address._id);

    if (result.success) {
      toast.success(t("account.addresses.success.deleted"));
      setOpenDeleteModal(false);
    } else {
      toast.error(result?.errors?.message);
    }
  }

  async function handleSetDefaultAddress() {
    const result = await setDefaultAddressAction(address._id);

    if (result.success) {
      toast.success(t("account.addresses.success.setDefault"));
    } else {
      toast.error(result?.errors?.message);
    }
  }

  return (
    <div className="flex w-full justify-between gap-6 py-4 sm:flex-col sm:gap-4 sm:py-2">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="whitespace-nowrap text-lg">{address.fullname}</h3>
          <span className="text-xl font-thin text-grey-default">&#x2758;</span>
          <p className="text-grey-300">{address.phoneNumber}</p>
        </div>
        <p className="text-grey-300">{address.address}</p>
        <p className="text-grey-300">
          {address.ward.name}, {address.district.name}, {address.city.name}
        </p>
        {address.isDefault && (
          <span className="mt-2 inline-block rounded-xl border-2 border-primary-default px-2 text-center lg:text-sm">
            {t("account.addresses.defaultLabel")}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            className="truncate text-primary-default"
            onClick={() => setOpenEditModal(true)}
          >
            {t("account.addresses.update")}
          </button>
          {openEditModal && (
            <Modal onClose={() => setOpenEditModal(false)}>
              <FormUpdateAddress
                onSubmit={() => setOpenEditModal(false)}
                address={address}
              />
            </Modal>
          )}
          {!address.isDefault && (
            <button
              className="text-red-500 lg:mr-4"
              onClick={() => setOpenDeleteModal(true)}
            >
              {t("account.addresses.delete")}
            </button>
          )}
          {openDeleteModal && (
            <Modal
              onClose={() => setOpenDeleteModal(false)}
              showCloseButton={false}
            >
              <ConfirmDialogue
                onCancel={() => setOpenDeleteModal(false)}
                onConfirm={handleDeleteAddress}
                message={t("account.addresses.confirmDelete")}
              />
            </Modal>
          )}
        </div>
        <Button
          variant="tertiary"
          disabled={address.isDefault}
          onClick={handleSetDefaultAddress}
          size="small"
        >
          <span className="whitespace-nowrap">
            {t("account.addresses.setDefault")}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default AddressCard;
