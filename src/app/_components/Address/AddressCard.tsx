'use client';

import Button from '@components/UI/Button';
import Modal from '../UI/Modal';
import ConfirmDialogue from '../UI/ConfirmDialogue';
import { useState } from 'react';
import {
  deleteAddressAction,
  setDefaultAddressAction,
} from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import FormUpdateAddress from './FormUpdateAddress';
import { Address } from '@/app/_types/address';

interface AddressCardProps {
  address: Address;
}

function AddressCard({ address }: AddressCardProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  async function handleDeleteAddress() {
    const result = await deleteAddressAction(address._id);

    if (result.success) {
      toast.success('Address deleted successfully');
      setOpenDeleteModal(false);
    } else {
      toast.error(result?.errors?.message);
    }
  }

  async function handleSetDefaultAddress() {
    const result = await setDefaultAddressAction(address._id);

    if (result.success) {
      toast.success('Address set as default successfully');
    } else {
      toast.error(result?.errors?.message);
    }
  }

  return (
    <div className="flex w-full justify-between gap-6 py-4">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg">{address.fullname}</h3>
          <span className="text-xl font-thin text-grey-default">&#x2758;</span>
          <p className="text-grey-300">{address.phoneNumber}</p>
        </div>
        <p className="text-grey-300">{address.address}</p>
        <p className="text-grey-300">
          {address.ward.name}, {address.district.name}, {address.city.name}
        </p>
        {address.isDefault && (
          <span className="mt-2 inline-block rounded-xl border-2 border-primary-default px-2 text-center">
            Mặc định
          </span>
        )}
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <button
            className="text-primary-default"
            onClick={() => setOpenEditModal(true)}
          >
            Cập nhật
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
              className="text-red-500"
              onClick={() => setOpenDeleteModal(true)}
            >
              Xoá
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
                message="Bạn chắc muốn xoá địa chỉ giao hàng này?"
              />
            </Modal>
          )}
        </div>
        <Button
          type="tertiary"
          disabled={address.isDefault}
          onClick={handleSetDefaultAddress}
          size="small"
        >
          Đặt mặc định
        </Button>
      </div>
    </div>
  );
}

export default AddressCard;
