"use client";

import { useActionState } from "react";
import { signupAction } from "@libs/actions";
import Input from "@components/UI/Input";
import Button from "@components/UI/Button";
import { FaCircleInfo, FaCircleExclamation } from "react-icons/fa6";
import { FormError } from "@/app/_types/formError";
import { SignupInput } from "@/app/_types/validateInput";
import { useLanguage } from "@/app/_contexts/LanguageContext";

function FormSignup() {
  const { t } = useLanguage();
  const [state, action, isPending] = useActionState(signupAction, {
    success: false,
    inputData: {} as SignupInput,
    errors: {} as FormError,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    if (state?.errors?.[name]) {
      state.errors[name] = "";
    }

    if (state?.inputData)
      state.inputData = { ...state.inputData, [name]: value };
  };

  return (
    <div className="w-full max-w-xl gap-2 rounded-lg bg-white px-16 py-8 shadow-sm lg:px-8">
      <h3 className="mb-8 text-center text-primary-500">
        {t("auth.signup.title")}
      </h3>
      <form className="flex w-full flex-col items-center gap-6" action={action}>
        {state?.errors?.message && (
          <p className="text-sm text-red-500">{state?.errors?.message}</p>
        )}
        <div className="w-full">
          <Input
            id="name"
            type="text"
            name="name"
            label={t("auth.form.fullName.label")}
            placeholder={t("auth.form.fullName.placeholder")}
            error={!!state?.errors?.name}
            errorMessage={state?.errors?.name}
            defaultValue={state?.inputData?.name}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            {t("auth.signup.publicInfo")}
          </p>
        </div>
        <div className="w-full">
          <Input
            id="dob"
            type="date"
            name="dob"
            label={t("auth.signup.dob")}
            error={!!state?.errors?.dob}
            defaultValue={state?.inputData?.dob}
            errorMessage={state?.errors?.dob}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            {t("auth.signup.dobWarning")}
          </p>
        </div>{" "}
        <Input
          id="gender"
          type="select"
          name="gender"
          label={t("auth.signup.gender")}
          options={[
            { label: t("auth.signup.male"), value: "male" },
            { label: t("auth.signup.female"), value: "female" },
            { label: t("auth.signup.other"), value: "other" },
          ]}
          error={!!state?.errors?.gender}
          errorMessage={state?.errors?.gender}
          defaultValue={state?.inputData?.gender}
          onChange={handleInputChange}
        />
        <hr className="my-1 w-full border-t border-grey-100" />
        <div className="w-full">
          <Input
            name="email"
            id="email"
            label={t("auth.form.email.label")}
            placeholder={t("auth.form.email.placeholder")}
            type="email"
            error={!!state?.errors?.email}
            defaultValue={state?.inputData?.email}
            errorMessage={state?.errors?.email}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            {t("auth.signup.emailAccount")}
          </p>
        </div>
        <Input
          id="password"
          type="password"
          name="password"
          label={t("auth.form.password.label")}
          placeholder={t("auth.form.password.placeholder")}
          error={!!state?.errors?.password}
          errorMessage={state?.errors?.password}
          onChange={handleInputChange}
        />
        <Input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          label={t("auth.form.confirmPassword.label")}
          placeholder={t("auth.form.confirmPassword.placeholder")}
          error={!!state?.errors?.passwordConfirm}
          errorMessage={state?.errors?.passwordConfirm}
          onChange={handleInputChange}
        />
        <hr className="my-1 w-full border-t border-grey-100" />
        <div className="w-full">
          {state?.errors?.terms && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.terms}
            </p>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="mr-2 h-5 w-5 rounded-md border border-grey-300 checked:bg-primary-500 focus:ring-1 focus:ring-primary-500 focus:ring-offset-primary-500"
            />
            <p className="text-sm text-grey-300">
              {t("auth.signup.termsAgreement")}
            </p>
          </div>
        </div>
        <hr className="my-1 w-full border-t border-grey-100" />
        <Button loading={isPending} role="submit">
          {t("auth.form.submit.signup")}
        </Button>
      </form>
    </div>
  );
}

export default FormSignup;
