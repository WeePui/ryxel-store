"use client";

import { addAddressAction } from "../../_libs/actions";
import Input from "../UI/Input";
import LocationSelector from "./LocationSelector";
import { useActionState, useEffect, useState } from "react";
import Button from "../UI/Button";
import { FaCircleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";
import { hasFormError } from "@/app/_helpers/hasFormError";
import { FormError } from "@/app/_types/formError";
import AssistiveText from "../UI/AssistiveText";

interface FormAddAddressProps {
  onSubmit: () => void;
}

function FormAddAddress({ onSubmit }: FormAddAddressProps) {
  const [state, action, isPending] = useActionState(addAddressAction, {
    success: false,
    errors: {
      message: "",
      fullname: "",
      phoneNumber: "",
      city: "",
      district: "",
      ward: "",
      address: "",
    } as FormError,
  });

  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast.success("Address added successfully");
      onSubmit();
    } else if ("message" in state.errors! && state.errors.message) {
      toast.error(state.errors.message);
    }
  }, [state.success, state.errors, onSubmit]);

  if (isPending) return <Loader />;

  return (
    <form className="flex w-[600px] max-w-full flex-col gap-6" action={action}>
      <h1 className="mb-2 text-xl font-semibold">Địa chỉ mới</h1>
      <div className="flex items-center gap-6">
        <Input
          label="Họ và tên"
          name="fullname"
          type="text"
          id="fullname"
          error={hasFormError("fullname", state.errors)}
          errorMessage={state.errors.fullname}
        />
        <Input
          label="Số điện thoại"
          name="phoneNumber"
          type="text"
          id="phoneNumber"
          error={hasFormError("phoneNumber", state.errors)}
          errorMessage={state.errors.phoneNumber}
        />
      </div>
      <div className="w-full">
        {(hasFormError("city", state.errors) ||
          hasFormError("district", state.errors) ||
          hasFormError("ward", state.errors)) && (
          <AssistiveText
            icon={<FaCircleExclamation />}
            text={
              state.errors.city || state.errors.district || state.errors.ward
            }
            className="mb-1"
          />
        )}
        <LocationSelector />
      </div>
      <Input
        label="Địa chỉ (số nhà & tên đường)"
        name="address"
        type="textarea"
        id="address"
        error={hasFormError("address", state.errors)}
        errorMessage={state.errors.address}
      />
      <Input
        label="Địa chỉ chi tiết (tuỳ chọn)"
        name="addressInfo"
        type="text"
        id="addressInfo"
      />
      <Input
        type="checkbox"
        label="Đặt mặc định"
        id="isDefault"
        name="isDefault"
        checked={isDefault}
        onChange={(e) => setIsDefault((e.target as HTMLInputElement).checked)}
      />
      <input type="hidden" name="isDefault" value={isDefault.toString()} />
      <Button role="submit">Thêm</Button>
    </form>
  );
}

export default FormAddAddress;
