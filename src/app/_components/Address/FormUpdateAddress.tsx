'use client';

import { updateAddressAction } from '../../_libs/actions';
import Input from '../UI/Input';
import LocationSelector from './LocationSelector';
import { useActionState, useEffect, useState } from 'react';
import Button from '../UI/Button';
import { FaCircleExclamation } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import Loader from '../UI/Loader';
import { FormError } from '@/app/_types/formError';
import { Address } from '@/app/_types/address';
import { hasFormError } from '@/app/_helpers/hasFormError';

interface FormUpdateAddressProps {
  onSubmit: () => void;
  address: Address;
}

function FormUpdateAddress({ onSubmit, address }: FormUpdateAddressProps) {
  const [state, action, isPending] = useActionState(
    updateAddressAction.bind(null, address._id),
    {
      success: false,
      errors: {
        message: '',
        fullname: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        address: '',
      } as FormError,
    }
  );

  const [isDefault, setIsDefault] = useState(address.isDefault);

  useEffect(() => {
    if (state.success) {
      toast.success('Address updated successfully');
      onSubmit();
    } else if (state.errors.message) toast.error(state.errors.message);
  }, [state.success, state.errors, onSubmit]);

  if (isPending) return <Loader />;

  return (
    <form className="flex w-[600px] flex-col gap-6" action={action}>
      <h1 className="mb-2 text-xl font-semibold">Cập nhật địa chỉ</h1>
      <div className="flex items-center gap-6">
        <div className="w-full">
          {hasFormError('fullname', state.errors) && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state.errors.fullname}
            </p>
          )}
          <Input
            label="Họ và tên"
            name="fullname"
            type="text"
            id="fullname"
            error={hasFormError('fullname', state.errors)}
            defaultValue={address.fullname}
          />
        </div>
        <div className="w-full">
          {hasFormError('phoneNumber', state.errors) && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state.errors.phoneNumber}
            </p>
          )}
          <Input
            label="Số điện thoại"
            name="phoneNumber"
            type="text"
            id="phoneNumber"
            defaultValue={address.phoneNumber}
            error={hasFormError('phoneNumber', state.errors)}
          />
        </div>
      </div>
      <div className="w-full">
        {(hasFormError('city', state.errors) ||
          hasFormError('district', state.errors) ||
          hasFormError('ward', state.errors)) && (
          <p className="flex items-center gap-2 p-2 text-xs text-red-500">
            <FaCircleExclamation />
            {state?.errors?.city ||
              state?.errors?.district ||
              state?.errors?.ward}
          </p>
        )}
        <LocationSelector address={address} />
      </div>
      <div className="w-full">
        {state?.errors?.address && (
          <p className="flex items-center gap-2 p-2 text-xs text-red-500">
            <FaCircleExclamation />
            {state.errors.address}
          </p>
        )}
        <Input
          label="Địa chỉ (số nhà & tên đường)"
          name="address"
          type="textarea"
          id="address"
          defaultValue={address.address}
          error={hasFormError('address', state.errors)}
        />
      </div>
      <Input
        label="Địa chỉ chi tiết (tuỳ chọn)"
        name="addressInfo"
        type="text"
        id="addressInfo"
        defaultValue={address.addressInfo}
      />
      <Input
        type="checkbox"
        label="Đặt mặc định"
        id="isDefault"
        name="isDefault"
        checked={isDefault}
        onChange={(e) => setIsDefault((e.target as HTMLInputElement).checked)}
        disabled={address.isDefault}
      />
      <input type="hidden" name="isDefault" value={isDefault.toString()} />
      <Button role="submit">Cập nhật</Button>
    </form>
  );
}

export default FormUpdateAddress;
