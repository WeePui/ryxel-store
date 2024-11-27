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
