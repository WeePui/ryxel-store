import { FormError } from '../_types/formError';

function hasAnyErrors(errors: FormError): boolean {
  return Object.values(errors).some((value) => !!value);
}

function hasFormError(field: keyof FormError, errors: FormError): boolean {
  return field in errors && errors[field] !== '';
}

function hasFieldErrors(
  fields: (keyof FormError)[],
  errors: FormError
): boolean {
  return fields.some((field) => hasFormError(field, errors));
}

export { hasFormError, hasAnyErrors, hasFieldErrors };
