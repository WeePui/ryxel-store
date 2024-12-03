import { checkEmailAvailability } from '@libs/apiServices';
import validator from 'validator';

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

export function validateUpdateProfileForm(data) {
  const validation = {
    success: true,
    errors: {},
  };

  if (!data.name || !data.name.trim()) {
    validation.success = false;
    validation.errors.name = 'Name is required';
  }

  if (!data.gender) {
    validation.success = false;
    validation.errors.gender = 'Not all the fields are filled';
  }

  if (data.photo.size === 0) delete data.photo;

  return validation;
}

export function validateUpdatePasswordForm(data) {
  const validation = {
    success: true,
    errors: {},
  };

  if (!data.passwordCurrent) {
    validation.success = false;
    validation.errors.passwordCurrent = 'Current password is required';
  }

  if (!data.password) {
    validation.success = false;
    validation.errors.password = 'New password is required';
  }

  if (!data.passwordConfirm) {
    validation.success = false;
    validation.errors.passwordConfirm = 'Confirm password is required';
  } else if (data.password !== data.passwordConfirm) {
    validation.success = false;
    validation.errors.password = 'Passwords do not match';
  }

  return validation;
}

export function validateAddAddressForm(data) {
  const validation = {
    success: true,
    errors: {},
  };

  if (!data.fullname) {
    validation.success = false;
    validation.errors.fullname = 'Full name is required';
  }

  if (!data.phoneNumber) {
    validation.success = false;
    validation.errors.phoneNumber = 'Phone number is required';
  } else if (!validator.isMobilePhone(data.phoneNumber, 'vi-VN')) {
    validation.success = false;
    validation.errors.phoneNumber = 'Phone number is invalid';
  }

  if (!data.city) {
    validation.success = false;
    validation.errors.city = 'City is required';
  }
  if (!data.district) {
    validation.success = false;
    validation.errors.district = 'District is required';
  }
  if (!data.ward) {
    validation.success = false;
    validation.errors.ward = 'Ward is required';
  }

  if (!data.address) {
    validation.success = false;
    validation.errors.address = 'Address is required';
  }

  return validation;
}
