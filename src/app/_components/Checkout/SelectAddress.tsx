'use client';

import { useEffect, useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import ConfirmDialogue from '../UI/ConfirmDialogue';
import Modal from '../UI/Modal';
import { useRouter } from 'next/navigation';
import FormAddAddress from '../Address/FormAddAddress';
import Button from '../UI/Button';
import CheckoutAddressList from './CheckoutAddressList';
import { Address } from '@/app/_types/address';

interface SelectAddressProps {
  addresses: Address[];
}

function SelectAddress({ addresses }: SelectAddressProps) {
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
      setSelectedAddress(defaultAddress);
    }
  }, [addresses]);

  function handleCancelAddFirstAddress() {
    if (addresses.length === 0 && !isModalAddAddressVisible)
      router.replace('/cart');
  }

  return (
    <>
      {isModalConfirmAddFirstAddressVisible && (
        <Modal onClose={handleCancelAddFirstAddress}>
          <ConfirmDialogue
            message="Bạn chưa có địa chỉ giao hàng nào được thêm. Bạn có muốn thêm địa chỉ mới"
            onCancel={handleCancelAddFirstAddress}
            onConfirm={() => setIsModalAddAddressVisible(true)}
          />
        </Modal>
      )}

      <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-8 shadow-md">
        <h2 className="flex items-center text-xl font-bold">
          <FaMapLocationDot />
          <span className="ml-2">Địa chỉ nhận hàng</span>
        </h2>
        <div className="flex items-center gap-2">
          {selectedAddress && (
            <>
              <span className="font-semibold">{selectedAddress.fullname}</span>
              <span className="text-xl font-thin text-grey-default">
                &#x2758;
              </span>
              <span className="font-semibold">
                {selectedAddress.phoneNumber}
              </span>
              <div className="pl-6">
                <p className="text-grey-default">
                  {selectedAddress.address}, {selectedAddress.ward?.name},{' '}
                  {selectedAddress.district?.name}, {selectedAddress.city?.name}
                </p>
                {selectedAddress.isDefault && (
                  <span className="mt-2 inline-block w-auto rounded-xl border-2 border-primary-default px-2 text-center">
                    Mặc định
                  </span>
                )}
              </div>
            </>
          )}
          <div className="ml-10">
            <Button
              type="tertiary"
              onClick={() => setIsModalSelectAddressVisible(true)}
            >
              Thay đổi
            </Button>
          </div>
        </div>
      </div>

      {isModalAddAddressVisible && (
        <Modal onClose={() => setIsModalAddAddressVisible(false)}>
          <FormAddAddress onSubmit={() => setIsModalAddAddressVisible(false)} />
        </Modal>
      )}

      {isModalSelectAddressVisible && (
        <Modal
          onClose={() => setIsModalSelectAddressVisible(false)}
          closeOnOutsideClick={false}
        >
          <CheckoutAddressList
            addresses={addresses}
            onSelect={setSelectedAddress}
            selected={selectedAddress}
          />
        </Modal>
      )}
    </>
  );
}

export default SelectAddress;
