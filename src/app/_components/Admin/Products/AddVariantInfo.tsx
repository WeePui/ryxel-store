'use client';

import Card from '../../UI/Card';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Input from '../../UI/Input';
import Image from 'next/image';
import { Variant } from '@/app/_types/variant';
import { mappingSpecsName } from '@/app/_utils/mappingSpecs';
import { FaTrash, FaPlus } from 'react-icons/fa6';
import Button from '../../UI/Button';

interface VariantInfoHandle {
  getData: () => Variant[];
}

const emptyVariant = (): Variant => ({
  name: '',
  price: 0,
  weight: 0,
  sku: '',
  stock: 0,
  sold: 0,
  specifications: {},
  images: [],
  saleOff: {
    startDate: new Date(),
    endDate: new Date(),
    percentage: 0,
  },
});

const AddVariantInfo = forwardRef<VariantInfoHandle>((_, ref) => {
  const [variants, setVariants] = useState<Variant[]>([emptyVariant()]);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useImperativeHandle(ref, () => ({
    getData() {
      return variants;
    },
  }));

  const handleFieldChange = (
    index: number,
    field: keyof Variant,
    value: string
  ) => {
    const updated = [...variants];
    updated[index] = {
      ...updated[index],
      [field]:
        field === 'price' ||
        field === 'weight' ||
        field === 'stock' ||
        field === 'sold'
          ? Number(value)
          : value,
    };
    setVariants(updated);
  };

  const handleImageChange = (
    variantIndex: number,
    imageIndex: number,
    file: File
  ) => {
    const updated = [...variants];
    const images = [...(updated[variantIndex].images || [])];
    images[imageIndex] = file;
    updated[variantIndex].images = images;
    setVariants(updated);
  };

  const handleSpecChange = (
    variantIndex: number,
    specKey: string,
    value: string
  ) => {
    const updated = [...variants];
    updated[variantIndex].specifications = {
      ...updated[variantIndex].specifications,
      [specKey]: value,
    };
    setVariants(updated);
  };

  const removeVariant = (index: number) => {
    if (variants.length === 1) return; // Không cho xoá cái đầu tiên
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
  };

  return (
    <Card
      className="w-full grid gap-6 sm:grid-cols-1 grid-cols-2 h-fit"
      title="Phân loại sản phẩm"
    >
      {variants.map((variant, index) => (
        <div
          key={index}
          className="w-full border rounded p-4 relative bg-white flex flex-col gap-4"
        >
          {variants.length > 1 && (
            <button
              type="button"
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-xs"
              onClick={() => removeVariant(index)}
            >
              <FaTrash />
            </button>
          )}

          <Input
            type="text"
            label="Tên phân loại"
            value={variant.name}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
            id="variant-name"
            name="variant-name"
          />
          <Input
            type="text"
            label="Giá bán"
            value={variant.price}
            onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
            id="variant-price"
            name="variant-price"
          />
          <Input
            type="text"
            label="Trọng lượng (gram)"
            value={variant.weight}
            onChange={(e) => handleFieldChange(index, 'weight', e.target.value)}
            id="variant-weight"
            name="variant-weight"
          />
          <Input
            type="text"
            label="SKU"
            value={variant.sku}
            onChange={(e) => handleFieldChange(index, 'sku', e.target.value)}
            id="variant-sku"
            name="variant-sku"
          />

          <p className="font-medium text-sm text-grey-300 pl-1 mt-4">
            Ảnh sản phẩm
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((imgIdx) => (
              <div
                key={imgIdx}
                className="relative aspect-square cursor-pointer border rounded overflow-hidden"
                onClick={() => inputRefs.current[index]?.[imgIdx]?.click()}
              >
                <Image
                  src={
                    typeof variant.images?.[imgIdx] === 'string'
                      ? (variant.images[imgIdx] as string)
                      : variant.images?.[imgIdx] instanceof File
                      ? URL.createObjectURL(variant.images[imgIdx] as File)
                      : '/no-image-placeholder.jpg'
                  }
                  alt={`Ảnh ${imgIdx + 1}`}
                  fill
                  className="object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => {
                    if (!inputRefs.current[index]) {
                      inputRefs.current[index] = [];
                    }
                    inputRefs.current[index][imgIdx] = el;
                  }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageChange(index, imgIdx, e.target.files[0]);
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 sm:flex-col gap-2 sm:items-start mb-2">
            <p className="font-medium text-sm text-grey-300 pl-1">
              Thông số kỹ thuật
            </p>

            <div className="flex justify-between items-center">
              <Button
                size="small"
                onClick={() => {
                  const updated = [...variants];
                  const specs = { ...(updated[index].specifications || {}) };
                  specs[''] = ''; // Thêm spec rỗng
                  updated[index].specifications = specs;
                  setVariants(updated);
                }}
              >
                Thêm thông số
              </Button>
            </div>
          </div>

          {Object.entries(variant.specifications || {}).map(
            ([specKey, specValue], specIndex) => (
              <div
                className="flex gap-2 items-center mb-2"
                key={`${index}-${specKey}-${specIndex}`}
              >
                <Input
                  type="select"
                  label={`Thông số ${specIndex + 1}`}
                  value={specKey}
                  optionPlaceholder="Bấm chọn"
                  options={Object.entries(mappingSpecsName).map(([k, v]) => ({
                    value: k,
                    label: v,
                  }))}
                  onChange={(e) => {
                    const updated = [...variants];
                    const specs = { ...updated[index].specifications };
                    const valueOfOldKey = specs[specKey];
                    delete specs[specKey];
                    specs[e.target.value] = valueOfOldKey;
                    updated[index].specifications = specs;
                    setVariants(updated);
                  }}
                  className="flex-1"
                  id={`spec-key-${index}-${specIndex}`}
                  name={`spec-key-${index}-${specIndex}`}
                />
                <Input
                  type="text"
                  label="Giá trị"
                  value={specValue}
                  onChange={(e) =>
                    handleSpecChange(index, specKey, e.target.value)
                  }
                  className="flex-1"
                  id={`spec-value-${index}-${specIndex}`}
                  name={`spec-value-${index}-${specIndex}`}
                />
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    const updated = [...variants];
                    const specs = { ...updated[index].specifications };
                    delete specs[specKey];
                    updated[index].specifications = specs;
                    setVariants(updated);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            )
          )}
        </div>
      ))}

      <button
        type="button"
        className="w-full aspect-video border-2 border-dashed rounded flex flex-col items-center justify-center text-grey-400 hover:bg-grey-50"
        onClick={() => setVariants((prev) => [...prev, emptyVariant()])}
      >
        <FaPlus className="mb-1" />
        <span>Thêm phân loại</span>
      </button>
    </Card>
  );
});

AddVariantInfo.displayName = 'AddVariantInfo';

export default AddVariantInfo;
