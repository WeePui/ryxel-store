"use client";

import { updateAddressAction } from "../../_libs/actions";
import Input from "../UI/Input";
import LocationSelector from "./LocationSelector";
import { useActionState, useEffect, useState } from "react";
import Button from "../UI/Button";
import { FaCircleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";
import { FormError } from "@/app/_types/formError";
import { Address } from "@/app/_types/address";
import { hasFormError } from "@/app/_helpers/hasFormError";
import AssistiveText from "../UI/AssistiveText";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface FormUpdateAddressProps {
  onSubmit: () => void;
  address: Address;
}

function FormUpdateAddress({ onSubmit, address }: FormUpdateAddressProps) {
  const { t } = useLanguage();
  const [state, action, isPending] = useActionState(
    updateAddressAction.bind(null, address._id),
    {
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
    },
  );

  const [isDefault, setIsDefault] = useState(address.isDefault);

  useEffect(() => {
    if (state.success) {
      toast.success(t("account.addresses.success.updated"));
      onSubmit();
    } else if (state.errors.message) toast.error(state.errors.message);
  }, [state.success, state.errors, onSubmit, t]);

  if (isPending) return <Loader />;
  return (
    <form className="flex w-[600px] max-w-full flex-col gap-6" action={action}>
      <h1 className="mb-2 text-xl font-semibold">
        {t("account.addresses.updateTitle")}
      </h1>
      <div className="flex items-center gap-6">
        <Input
          label={t("account.addresses.form.fullname")}
          name="fullname"
          type="text"
          id="fullname"
          error={hasFormError("fullname", state.errors)}
          errorMessage={state.errors.fullname}
          defaultValue={address.fullname}
        />
        <Input
          label={t("account.addresses.form.phoneNumber")}
          name="phoneNumber"
          type="text"
          id="phoneNumber"
          defaultValue={address.phoneNumber}
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
        <LocationSelector address={address} />
      </div>
      <Input
        label={t("account.addresses.form.address")}
        name="address"
        type="textarea"
        id="address"
        defaultValue={address.address}
        error={hasFormError("address", state.errors)}
        errorMessage={state.errors.address}
      />
      <Input
        label={t("account.addresses.form.addressDetail")}
        name="addressInfo"
        type="text"
        id="addressInfo"
        defaultValue={address.addressInfo}
      />
      <Input
        type="checkbox"
        label={t("account.addresses.form.setDefaultLabel")}
        id="isDefault"
        name="isDefault"
        checked={isDefault}
        onChange={(e) => setIsDefault((e.target as HTMLInputElement).checked)}
        disabled={address.isDefault}
      />
      <input type="hidden" name="isDefault" value={isDefault.toString()} />
      <Button role="submit">{t("account.addresses.form.updateButton")}</Button>
    </form>
  );
}

export default FormUpdateAddress;
