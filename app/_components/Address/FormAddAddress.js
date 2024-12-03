'use client';

import { addAddressAction } from '../../_libs/actions';
import Input from '../UI/Input';
import LocationSelector from './LocationSelector';
import { useActionState, useEffect, useState } from 'react';
import Spinner from '../UI/Spinner';
import Button from '../UI/Button';
import { FaCircleExclamation } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import Loader from '../UI/Loader';

function FormAddAddress({ onSubmit }) {
  const [state, action, isPending] = useActionState(addAddressAction, {
    success: false,
    errors: {
      message: '',
    },
  });

  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast.success('Address added successfully');
      onSubmit();
    } else if (state.errors.message) toast.error(state.errors.message);
  }, [state.success, state.errors]);

  if (isPending) return <Loader />;

  return (
    <form className="flex w-[600px] flex-col gap-6" action={action}>
      <h1 className="mb-2 text-xl font-semibold">New address</h1>
      <div className="flex items-center gap-6">
        <div className="w-full">
          {state?.errors?.fullname && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state.errors.fullname}
            </p>
          )}
          <Input
            label="Full name"
            name="fullname"
            type="text"
            id="fullname"
            error={state?.errors?.fullname}
          />
        </div>
        <div className="w-full">
          {state?.errors?.phoneNumber && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state.errors.phoneNumber}
            </p>
          )}
          <Input
            label="Phone no."
            name="phoneNumber"
            type="text"
            id="phoneNumber"
            error={state?.errors?.phoneNumber}
          />
        </div>
      </div>
      <div className="w-full">
        {(state?.errors?.city ||
          state?.errors?.district ||
          state?.errors?.ward) && (
          <p className="flex items-center gap-2 p-2 text-xs text-red-500">
            <FaCircleExclamation />
            {state?.errors?.city ||
              state?.errors?.district ||
              state?.errors?.ward}
          </p>
        )}
        <LocationSelector />
      </div>
      <div className="w-full">
        {state?.errors?.address && (
          <p className="flex items-center gap-2 p-2 text-xs text-red-500">
            <FaCircleExclamation />
            {state.errors.address}
          </p>
        )}
        <Input
          label="Address (street and number)"
          name="address"
          type="textarea"
          id="address"
          error={state?.errors?.address}
        />
      </div>
      <Input
        label="Address details (optional)"
        name="addressInfo"
        type="text"
        id="addressInfo"
      />
      <Input
        type="checkbox"
        label="Set as default address"
        id="isDefault"
        name="isDefault"
        checked={isDefault}
        onChange={(e) => setIsDefault(e.target.checked)}
      />
      <input type="hidden" name="isDefault" value={isDefault} />
      <Button role="submit">Submit</Button>
    </form>
  );
}

export default FormAddAddress;
