import { checkEmailAvailability } from '@libs/apiServices';

export function validateLoginForm(data) {
  const validation = {
    success: true,
    errors: {},
  };

  if (!data.email) {
    validation.success = false;
    validation.errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    validation.success = false;
    validation.errors.email = 'Email address is invalid';
  }
  if (!data.password) {
    validation.success = false;
    validation.errors.password = 'Password is required';
  }

  return validation;
}

export async function validateSignupForm(data) {
  const validation = {
    success: true,
    errors: {},
  };

  if (!data.email) {
    validation.success = false;
    validation.errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    validation.success = false;
    validation.errors.email = 'Email address is invalid';
  } else {
    const { valid } = await checkEmailAvailability(data.email);

    if (!valid) {
      validation.success = false;
      validation.errors.email = 'Email is already in use';
    }
  }

  if (!data.password) {
    validation.success = false;
    validation.errors.password = 'Password is required';
  }

  if (!data.passwordConfirm) {
    validation.success = false;
    validation.errors.passwordConfirm = 'Confirm password is required';
  } else if (data.password !== data.passwordConfirm) {
    validation.success = false;
    validation.errors.password = 'Passwords do not match';
  }

  if (!data.name || !data.name.trim()) {
    validation.success = false;
    validation.errors.name = 'Name is required';
  }

  if (!data.gender) {
    validation.success = false;
    validation.errors.gender = 'Not all the fields are filled';
  }

  if (!data.dob) {
    validation.success = false;
    validation.errors.dob = 'Date of birth is required';
  } else {
    const dob = new Date(data.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (isNaN(dob.getTime())) {
      validation.success = false;
      validation.errors.dob = 'Invalid date of birth';
    } else if (
      age < 13 ||
      (age === 13 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      validation.success = false;
      validation.errors.dob = 'You must be at least 13 years old';
    } else if (
      age > 120 ||
      (age === 120 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)))
    ) {
      validation.success = false;
      validation.errors.dob = 'You must be at most 120 years old';
    }
  }

  if (!data.terms) {
    validation.success = false;
    validation.errors.terms = 'You must agree to the terms';
  }

  return validation;
}
