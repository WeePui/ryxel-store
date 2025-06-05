import { z } from "zod";
import validator from "validator";
import { checkEmailAvailability } from "@libs/apiServices";
import {
  AddressFormInput,
  CategoryInput,
  DiscountInput,
  LoginInput,
  ProductInput,
  SignupInput,
  UpdatePasswordInput,
  UpdateProfileInput,
} from "../_types/validateInput";
import calcYearDiff from "../_utils/calcYearDiff";

interface IValidation {
  success: boolean;
  errors: Record<string, string>;
}

export function validateLoginForm(data: LoginInput) {
  const validation: IValidation = {
    success: true,
    errors: {
      email: "",
      password: "",
    },
  };

  const emailSchema = z.string().email("Địa chỉ email không hợp lệ");
  const passwordSchema = z
    .string()
    .min(1, { message: "Xin hãy nhập mật khẩu" });

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
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      gender: "",
      dob: "",
      terms: "",
    },
  };

  const emailSchema = z
    .string()
    .email("Địa chỉ email không hợp lệ")
    .refine(
      async (email) => {
        const { valid } = await checkEmailAvailability(email);
        return valid;
      },
      { message: "Địa chỉ email đã được sử dụng" },
    );
  const passwordSchema = z
    .string()
    .min(1, { message: "Xin hãy nhập mật khẩu" });
  const passwordConfirmSchema = z
    .string()
    .min(1, { message: "Xin hãy xác nhận mật khẩu" })
    .refine((passwordConfirm) => passwordConfirm === data.password, {
      message: "Mật khẩu không khớp",
    });
  const nameSchema = z
    .string()
    .min(1, { message: "Xin hãy nhập tên tài khoản" });
  const genderSchema = z.string({ message: "Bạn chưa điền hết thông tin" });
  const dobSchema = z.string({ message: "Xin hãy nhập ngày sinh" }).refine(
    (dob) => {
      const date = new Date(dob);
      if (isNaN(date.getTime())) return false;

      const today = new Date();
      const age = calcYearDiff(date, today);

      return age >= 13 && age <= 120;
    },
    { message: "Hãy nhập ngày sinh hợp lệ" },
  );
  const termsSchema = z.boolean({
    message: "Xin hãy đồng ý với các điều khoản và điều kiện",
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
    data.passwordConfirm,
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
      name: "",
      photo: "",
    },
  };

  const nameSchema = z
    .string()
    .min(1, { message: "Xin hãy nhập tên tài khoản" });

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
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
  };

  const passwordCurrentSchema = z.string().min(1, {
    message: "Xin hãy nhập mật khẩu hiện tại",
  });
  const passwordSchema = z
    .string()
    .min(1, { message: "Xin hãy nhập mật khẩu mới" });
  const passwordConfirmSchema = z
    .string()
    .min(1, { message: "Xin hãy xác nhận mật khẩu mới" })
    .refine((passwordConfirm) => passwordConfirm === data.password, {
      message: "Mật khẩu không khớp",
    });

  const passwordCurrentValidation = passwordCurrentSchema.safeParse(
    data.passwordCurrent,
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
    data.passwordConfirm,
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
      fullname: "",
      phoneNumber: "",
      city: "",
      district: "",
      ward: "",
      address: "",
    },
  };

  const fullnameSchema = z
    .string()
    .min(1, { message: "Xin hãy nhập họ và tên" });
  const phoneNumberSchema = z
    .string()
    .min(1, { message: "Xin hãy nhập số điện thoại" })
    .refine((phoneNumber) => validator.isMobilePhone(phoneNumber, "vi-VN"), {
      message: "Số điện thoại không hợp lệ",
    });
  const citySchema = z.object({ name: z.string(), code: z.number() });
  const districtSchema = z.object({ name: z.string(), code: z.number() });
  const wardSchema = z.object({ name: z.string(), code: z.string() });
  const addressSchema = z.string({ message: "Xin hãy nhập địa chỉ" });

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
    validation.errors.city = "Xin hãy chọn thành phố";
  }

  const districtValidation = districtSchema.safeParse(data.district);
  if (!districtValidation.success) {
    validation.success = false;
    validation.errors.district = "Xin hãy chọn quận/huyện";
  }

  const wardValidation = wardSchema.safeParse(data.ward);
  if (!wardValidation.success) {
    validation.success = false;
    validation.errors.ward = "Xin hãy chọn phường/xã";
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
      name: "",
      slug: "",
      description: "",
      image: "",
    },
  };

  const nameSchema = z
    .string()
    .min(1, { message: "Xin hãy nhập tên danh mục" });
  const slugSchema = z.string().optional();
  const descriptionSchema = z.string().optional();

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

  return validation;
}

export function validateDiscountForm(data: DiscountInput) {
  const validation = {
    success: true,
    errors: {
      code: "",
      name: "",
      startDate: "",
      endDate: "",
      maxUse: "",
      minOrderValue: "",
      discountPercentage: "",
      discountMaxValue: "",
      maxUsePerUser: "",
    },
  };

  // Định nghĩa các schema
  const codeSchema = z
    .string()
    .min(1, { message: "Vui lòng nhập mã giảm giá" });

  const nameSchema = z
    .string()
    .min(1, { message: "Vui lòng nhập tên mã giảm giá" });

  const startDateSchema = z
    .string()
    .min(1, { message: "Vui lòng chọn ngày bắt đầu" });

  const endDateSchema = z
    .string()
    .min(1, { message: "Vui lòng chọn ngày kết thúc" })
    .refine((date) => new Date(date) > new Date(), {
      message: "Ngày kết thúc phải trong tương lai",
    });

  const maxUseSchema = z
    .number()
    .min(1, { message: "Số lượt sử dụng tối đa phải lớn hơn 0" });

  const minOrderValueSchema = z
    .number()
    .min(0, { message: "Giá trị đơn hàng tối thiểu không được âm" });

  const discountPercentageSchema = z
    .number()
    .min(1, { message: "Phần trăm giảm giá phải từ 1% đến 100%" })
    .max(100, { message: "Phần trăm giảm giá phải từ 1% đến 100%" });

  const discountMaxValueSchema = z
    .number()
    .min(1, { message: "Giá trị giảm giá tối đa phải lớn hơn 0" });

  const maxUsePerUserSchema = z.number().min(1, {
    message: "Số lượt sử dụng tối đa cho mỗi người dùng phải lớn hơn 0",
  });

  // Kiểm tra startDate và endDate
  const datesSchema = z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .refine((obj) => new Date(obj.startDate) < new Date(obj.endDate), {
      message: "Ngày kết thúc phải sau ngày bắt đầu",
      path: ["endDate"],
    });

  // Validate từng trường
  const codeValidation = codeSchema.safeParse(data.code);
  if (!codeValidation.success) {
    validation.success = false;
    validation.errors.code = codeValidation.error.format()._errors[0];
  }

  const nameValidation = nameSchema.safeParse(data.name);
  if (!nameValidation.success) {
    validation.success = false;
    validation.errors.name = nameValidation.error.format()._errors[0];
  }

  const startDateValidation = startDateSchema.safeParse(data.startDate);
  if (!startDateValidation.success) {
    validation.success = false;
    validation.errors.startDate = startDateValidation.error.format()._errors[0];
  }

  const endDateValidation = endDateSchema.safeParse(data.endDate);
  if (!endDateValidation.success) {
    validation.success = false;
    validation.errors.endDate = endDateValidation.error.format()._errors[0];
  }

  // Validate cặp ngày startDate và endDate
  if (data.startDate && data.endDate) {
    const datesValidation = datesSchema.safeParse({
      startDate: data.startDate,
      endDate: data.endDate,
    });
    if (!datesValidation.success) {
      validation.success = false;
      validation.errors.endDate =
        datesValidation.error.format().endDate?._errors[0] ||
        "Ngày không hợp lệ";
    }
  }

  const maxUseValidation = maxUseSchema.safeParse(data.maxUse);
  if (!maxUseValidation.success) {
    validation.success = false;
    validation.errors.maxUse = maxUseValidation.error.format()._errors[0];
  }

  const minOrderValueValidation = minOrderValueSchema.safeParse(
    data.minOrderValue,
  );
  if (!minOrderValueValidation.success) {
    validation.success = false;
    validation.errors.minOrderValue =
      minOrderValueValidation.error.format()._errors[0];
  }

  const discountPercentageValidation = discountPercentageSchema.safeParse(
    data.discountPercentage,
  );
  if (!discountPercentageValidation.success) {
    validation.success = false;
    validation.errors.discountPercentage =
      discountPercentageValidation.error.format()._errors[0];
  }

  const discountMaxValueValidation = discountMaxValueSchema.safeParse(
    data.discountMaxValue,
  );
  if (!discountMaxValueValidation.success) {
    validation.success = false;
    validation.errors.discountMaxValue =
      discountMaxValueValidation.error.format()._errors[0];
  }

  const maxUsePerUserValidation = maxUsePerUserSchema.safeParse(
    data.maxUsePerUser,
  );
  if (!maxUsePerUserValidation.success) {
    validation.success = false;
    validation.errors.maxUsePerUser =
      maxUsePerUserValidation.error.format()._errors[0];
  }

  return validation;
}

export function validateProductForm(data: ProductInput) {
  const validation = {
    success: true,
    errors: {
      name: "",
      slug: "",
      brand: "",
      category: "",
      description: "",
      imageCover: "",
      variants: "",
    },
  };

  // Define validation schemas
  const nameSchema = z
    .string()
    .min(1, { message: "Vui lòng nhập tên sản phẩm" })
    .min(3, { message: "Tên sản phẩm phải có ít nhất 3 ký tự" })
    .max(200, { message: "Tên sản phẩm không được vượt quá 200 ký tự" });

  const slugSchema = z
    .string()
    .min(1, { message: "Vui lòng nhập slug sản phẩm" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug chỉ được chứa chữ cái thường, số và dấu gạch ngang",
    });

  const brandSchema = z
    .string()
    .min(1, { message: "Vui lòng nhập thương hiệu sản phẩm" })
    .min(2, { message: "Thương hiệu phải có ít nhất 2 ký tự" })
    .max(100, { message: "Thương hiệu không được vượt quá 100 ký tự" });

  const categorySchema = z
    .string()
    .min(1, { message: "Vui lòng chọn danh mục sản phẩm" });

  const descriptionSchema = z
    .string()
    .min(1, { message: "Vui lòng nhập mô tả sản phẩm" })
    .min(10, { message: "Mô tả sản phẩm phải có ít nhất 10 ký tự" })
    .max(2000, { message: "Mô tả sản phẩm không được vượt quá 2000 ký tự" });

  const imageCoverSchema = z
    .union([z.string().min(1), z.instanceof(File)])
    .refine(
      (value) => {
        if (typeof value === "string") return value.length > 0;
        if (value instanceof File) return value.size > 0;
        return false;
      },
      { message: "Vui lòng chọn ảnh đại diện cho sản phẩm" },
    );  // Variant schema validation
  const variantSchema = z.object({
    name: z.string().min(1, { message: "Tên biến thể không được để trống" }),
    sku: z.string().min(1, { message: "SKU không được để trống" }),
    price: z.number().nonnegative({ message: "Giá bán phải lớn hơn hoặc bằng 0" })
      .or(z.string().transform(val => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      })),
    cost: z.number().nonnegative({ message: "Giá gốc phải lớn hơn hoặc bằng 0" })
      .or(z.string().transform(val => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      })),
    stock: z.number().nonnegative({ message: "Số lượng tồn kho phải lớn hơn hoặc bằng 0" })
      .or(z.string().transform(val => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      })),
    weight: z.number().nonnegative({ message: "Trọng lượng phải lớn hơn hoặc bằng 0" })
      .or(z.string().transform(val => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      })),
    dimensions: z.object({
        length: z.number().nonnegative({ message: "Chiều dài phải lớn hơn hoặc bằng 0" })
          .or(z.string().transform(val => {
            const num = Number(val);
            return isNaN(num) ? 0 : num;
          })),
        width: z.number().nonnegative({ message: "Chiều rộng phải lớn hơn hoặc bằng 0" })
          .or(z.string().transform(val => {
            const num = Number(val);
            return isNaN(num) ? 0 : num;
          })),
        height: z.number().nonnegative({ message: "Chiều cao phải lớn hơn hoặc bằng 0" })
          .or(z.string().transform(val => {
            const num = Number(val);
            return isNaN(num) ? 0 : num;
          }))
      })
      .optional()
      .default({ length: 0, width: 0, height: 0 }),
    sold: z.number().nonnegative({ message: "Số lượng đã bán phải lớn hơn hoặc bằng 0" })
      .or(z.string().transform(val => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      })),
    images: z
      .array(z.union([z.string(), z.instanceof(File)]))
      .min(1, { message: "Biến thể phải có ít nhất 1 hình ảnh" }),
    specifications: z.record(z.string()),
    saleOff: z
      .object({
        startDate: z.string(),
        endDate: z.string(),
        percentage: z.number().min(0).max(100),
      })
      .optional(),
  });

  const variantsSchema = z
    .array(variantSchema)
    .min(1, { message: "Sản phẩm phải có ít nhất 1 biến thể" });

  // Validate each field
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

  const brandValidation = brandSchema.safeParse(data.brand);
  if (!brandValidation.success) {
    validation.success = false;
    validation.errors.brand = brandValidation.error.format()._errors[0];
  }

  const categoryValidation = categorySchema.safeParse(data.category);
  if (!categoryValidation.success) {
    validation.success = false;
    validation.errors.category = categoryValidation.error.format()._errors[0];
  }

  const descriptionValidation = descriptionSchema.safeParse(data.description);
  if (!descriptionValidation.success) {
    validation.success = false;
    validation.errors.description =
      descriptionValidation.error.format()._errors[0];
  }

  const imageCoverValidation = imageCoverSchema.safeParse(data.imageCover);
  if (!imageCoverValidation.success) {
    validation.success = false;
    validation.errors.imageCover =
      imageCoverValidation.error.format()._errors[0];
  }
  const variantsValidation = variantsSchema.safeParse(data.variants);
  if (!variantsValidation.success) {
    validation.success = false;
    
    // Try to get more specific error information
    const errorFormat = variantsValidation.error.format();
    
    if (errorFormat._errors?.length > 0) {
      validation.errors.variants = errorFormat._errors[0];
    } else {
      // Look for nested errors
      try {
        let errorDetails = [];
        
        // Check for variant-specific errors
        for (let i = 0; i < data.variants.length; i++) {
          if (errorFormat[i]) {
            const variantErrors = errorFormat[i];
            
            // Extract field-specific errors
            for (const [field, fieldError] of Object.entries(variantErrors)) {
              if (field !== '_errors' && fieldError._errors?.length > 0) {
                errorDetails.push(`Variant ${i+1}, ${field}: ${fieldError._errors[0]}`);
              }
            }
            
            // Check for errors in dimensions
            if (variantErrors.dimensions?._errors?.length > 0) {
              errorDetails.push(`Variant ${i+1}, dimensions: ${variantErrors.dimensions._errors[0]}`);
            }
            
            // Check for errors in dimensions fields
            for (const dimField of ['length', 'width', 'height']) {
              if (variantErrors.dimensions?.[dimField]?._errors?.length > 0) {
                errorDetails.push(`Variant ${i+1}, dimensions.${dimField}: ${variantErrors.dimensions[dimField]._errors[0]}`);
              }
            }
          }
        }
        
        if (errorDetails.length > 0) {
          validation.errors.variants = errorDetails.join('; ');
        } else {
          validation.errors.variants = "Dữ liệu biến thể không hợp lệ";
        }
      } catch (e) {
        console.error("Error parsing validation errors:", e);
        validation.errors.variants = "Dữ liệu biến thể không hợp lệ";
      }
    }
  }

  return validation;
}
