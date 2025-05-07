import { z } from 'zod';
import validator from 'validator';
import { checkEmailAvailability } from '@libs/apiServices';
import {
  AddressFormInput,
  CategoryInput,
  LoginInput,
  SignupInput,
  UpdatePasswordInput,
  UpdateProfileInput,
} from '../_types/validateInput';
import calcYearDiff from '../_utils/calcYearDiff';

interface IValidation {
  success: boolean;
  errors: Record<string, string>;
}

export function validateLoginForm(data: LoginInput) {
  const validation: IValidation = {
    success: true,
    errors: {
      email: '',
      password: '',
    },
  };

  const emailSchema = z.string().email('Địa chỉ email không hợp lệ');
  const passwordSchema = z
    .string()
    .min(1, { message: 'Xin hãy nhập mật khẩu' });

  const emailValidation = emailSchema.safeParse(data.email);
  if (!emailValidation.success) {
    validation.success = false;
    validation.errors.email = emailValidation.error.format()._errors[0];
  }

  const passwordValidation = passwordSchema.safeParse(data.password);
  if (!passwordValidation.success) {
    validation.success = false;
    validation.errors.password = passwordValidation.error.format()._errors[0];
  }

  return validation;
}

export async function validateSignupForm(data: SignupInput) {
  const validation: IValidation = {
    success: true,
    errors: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      gender: '',
      dob: '',
      terms: '',
    },
  };

  const emailSchema = z
    .string()
    .email('Địa chỉ email không hợp lệ')
    .refine(
      async (email) => {
        const { valid } = await checkEmailAvailability(email);
        return valid;
      },
      { message: 'Địa chỉ email đã được sử dụng' }
    );
  const passwordSchema = z
    .string()
    .min(1, { message: 'Xin hãy nhập mật khẩu' });
  const passwordConfirmSchema = z
    .string()
    .min(1, { message: 'Xin hãy xác nhận mật khẩu' })
    .refine((passwordConfirm) => passwordConfirm === data.password, {
      message: 'Mật khẩu không khớp',
    });
  const nameSchema = z
    .string()
    .min(1, { message: 'Xin hãy nhập tên tài khoản' });
  const genderSchema = z.string({ message: 'Bạn chưa điền hết thông tin' });
  const dobSchema = z.string({ message: 'Xin hãy nhập ngày sinh' }).refine(
    (dob) => {
      const date = new Date(dob);
      if (isNaN(date.getTime())) return false;

      const today = new Date();
      const age = calcYearDiff(date, today);

      return age >= 13 && age <= 120;
    },
    { message: 'Hãy nhập ngày sinh hợp lệ' }
  );
  const termsSchema = z.boolean({
    message: 'Xin hãy đồng ý với các điều khoản và điều kiện',
  });

  const emailValidation = await emailSchema.safeParseAsync(data.email);
  if (!emailValidation.success) {
    validation.success = false;
    validation.errors.email = emailValidation.error.format()._errors[0];
  }

  const passwordValidation = passwordSchema.safeParse(data.password);
  if (!passwordValidation.success) {
    validation.success = false;
    validation.errors.password = passwordValidation.error.format()._errors[0];
  }

  const passwordConfirmValidation = passwordConfirmSchema.safeParse(
    data.passwordConfirm
  );
  if (!passwordConfirmValidation.success) {
    validation.success = false;
    validation.errors.passwordConfirm =
      passwordConfirmValidation.error.format()._errors[0];
  }

  const nameValidation = nameSchema.safeParse(data.name);
  if (!nameValidation.success) {
    validation.success = false;
    validation.errors.name = nameValidation.error.format()._errors[0];
  }

  const genderValidation = genderSchema.safeParse(data.gender);
  if (!genderValidation.success) {
    validation.success = false;
    validation.errors.gender = genderValidation.error.format()._errors[0];
  }

  const dobValidation = dobSchema.safeParse(data.dob);
  if (!dobValidation.success) {
    validation.success = false;
    validation.errors.dob = dobValidation.error.format()._errors[0];
  }

  const termsValidation = termsSchema.safeParse(data.terms);
  if (!termsValidation.success) {
    validation.success = false;
    validation.errors.terms = termsValidation.error.format()._errors[0];
  }

  return validation;
}

export function validateUpdateProfileForm(data: UpdateProfileInput) {
  const validation = {
    success: true,
    errors: {
      name: '',
      photo: '',
    },
  };

  const nameSchema = z
    .string()
    .min(1, { message: 'Xin hãy nhập tên tài khoản' });

  const nameValidation = nameSchema.safeParse(data.name);
  if (!nameValidation.success) {
    validation.success = false;
    validation.errors.name = nameValidation.error.format()._errors[0];
  }

  if (data.photo?.size === 0) delete data.photo;

  return validation;
}

export function validateUpdatePasswordForm(data: UpdatePasswordInput) {
  const validation = {
    success: true,
    errors: {
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    },
  };

  const passwordCurrentSchema = z.string().min(1, {
    message: 'Xin hãy nhập mật khẩu hiện tại',
  });
  const passwordSchema = z
    .string()
    .min(1, { message: 'Xin hãy nhập mật khẩu mới' });
  const passwordConfirmSchema = z
    .string()
    .min(1, { message: 'Xin hãy xác nhận mật khẩu mới' })
    .refine((passwordConfirm) => passwordConfirm === data.password, {
      message: 'Mật khẩu không khớp',
    });

  const passwordCurrentValidation = passwordCurrentSchema.safeParse(
    data.passwordCurrent
  );
  if (!passwordCurrentValidation.success) {
    validation.success = false;
    validation.errors.passwordCurrent =
      passwordCurrentValidation.error.format()._errors[0];
  }

  const passwordValidation = passwordSchema.safeParse(data.password);
  if (!passwordValidation.success) {
    validation.success = false;
    validation.errors.password = passwordValidation.error.format()._errors[0];
  }

  const passwordConfirmValidation = passwordConfirmSchema.safeParse(
    data.passwordConfirm
  );
  if (!passwordConfirmValidation.success) {
    validation.success = false;
    validation.errors.passwordConfirm =
      passwordConfirmValidation.error.format()._errors[0];
  }

  return validation;
}

export function validateAddressForm(data: AddressFormInput) {
  const validation = {
    success: true,
    errors: {
      fullname: '',
      phoneNumber: '',
      city: '',
      district: '',
      ward: '',
      address: '',
    },
  };

  const fullnameSchema = z
    .string()
    .min(1, { message: 'Xin hãy nhập họ và tên' });
  const phoneNumberSchema = z
    .string()
    .min(1, { message: 'Xin hãy nhập số điện thoại' })
    .refine((phoneNumber) => validator.isMobilePhone(phoneNumber, 'vi-VN'), {
      message: 'Số điện thoại không hợp lệ',
    });
  const citySchema = z.object({ name: z.string(), code: z.number() });
  const districtSchema = z.object({ name: z.string(), code: z.number() });
  const wardSchema = z.object({ name: z.string(), code: z.string() });
  const addressSchema = z.string({ message: 'Xin hãy nhập địa chỉ' });

  const fullnameValidation = fullnameSchema.safeParse(data.fullname);
  if (!fullnameValidation.success) {
    validation.success = false;
    validation.errors.fullname = fullnameValidation.error.format()._errors[0];
  }

  const phoneNumberValidation = phoneNumberSchema.safeParse(data.phoneNumber);
  if (!phoneNumberValidation.success) {
    validation.success = false;
    validation.errors.phoneNumber =
      phoneNumberValidation.error.format()._errors[0];
  }

  const cityValidation = citySchema.safeParse(data.city);
  if (!cityValidation.success) {
    validation.success = false;
    validation.errors.city = 'Xin hãy chọn thành phố';
  }

  const districtValidation = districtSchema.safeParse(data.district);
  if (!districtValidation.success) {
    validation.success = false;
    validation.errors.district = 'Xin hãy chọn quận/huyện';
  }

  const wardValidation = wardSchema.safeParse(data.ward);
  if (!wardValidation.success) {
    validation.success = false;
    validation.errors.ward = 'Xin hãy chọn phường/xã';
  }

  const addressValidation = addressSchema.safeParse(data.address);
  if (!addressValidation.success) {
    validation.success = false;
    validation.errors.address = addressValidation.error.format()._errors[0];
  }

  return validation;
}

export function validateCategoryForm(data: CategoryInput) {
  const validation = {
    success: true,
    errors: {
      name: '',
      slug: '',
      description: '',
      image: '',
    },
  };

  const nameSchema = z
    .string()
    .min(1, { message: 'Xin hãy nhập tên danh mục' });
  const slugSchema = z.string().optional();
  const descriptionSchema = z.string().optional();
  const imageSchema = z
    .instanceof(File, { message: 'Xin hãy chọn ảnh danh mục' })
    .refine((file) => file.size > 0, {
      message: 'Xin hãy chọn ảnh danh mục',
    });

  const nameValidation = nameSchema.safeParse(data.name);
  if (!nameValidation.success) {
    validation.success = false;
    validation.errors.name = nameValidation.error.format()._errors[0];
  }

  const slugValidation = slugSchema.safeParse(data.slug);
  if (!slugValidation.success) {
    validation.success = false;
    validation.errors.slug = slugValidation.error.format()._errors[0];
  }

  const descriptionValidation = descriptionSchema.safeParse(data.description);
  if (!descriptionValidation.success) {
    validation.success = false;
    validation.errors.description =
      descriptionValidation.error.format()._errors[0];
  }

  const imageValidation = imageSchema.safeParse(data.image);
  if (!imageValidation.success) {
    validation.success = false;
    validation.errors.image = imageValidation.error.format()._errors[0];
  }

  return validation;
}
