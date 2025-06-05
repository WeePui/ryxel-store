"use client";

import Card from "../../UI/Card";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Input from "../../UI/Input";
import Image from "next/image";
import { Variant } from "@/app/_types/variant";
import { mappingSpecsName } from "@/app/_utils/mappingSpecs";
import { FaTrash, FaPlus } from "react-icons/fa6";
import Button from "../../UI/Button";
import AssistiveText from "../../UI/AssistiveText";
import { FaInfoCircle } from "react-icons/fa";

interface VariantInfoProps {
  validationErrors?: Record<string, string>;
}

interface VariantInfoHandle {
  getData: () => Variant[];
}

const emptyVariant = (): Variant => ({
  name: "",
  price: 0,
  weight: 0,
  sku: "",
  stock: 0,
  sold: 0,
  cost: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  specifications: {},
  images: [],
  saleOff: {
    startDate: "",
    endDate: "",
    percentage: 0,
  },
});

const AddVariantInfo = forwardRef<VariantInfoHandle, VariantInfoProps>(
  ({ validationErrors = {} }, ref) => {
    const [variants, setVariants] = useState<Variant[]>([emptyVariant()]);
    const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);
  useImperativeHandle(ref, () => ({
    getData() {
      // Ensure all numeric fields are properly converted to numbers
      return variants.map(variant => {
        // First create the normalized variant with all fields converted to proper types
        const normalizedVariant = {
          ...variant,
          price: Number(variant.price) || 0,
          cost: Number(variant.cost) || 0,
          stock: Number(variant.stock) || 0,
          weight: Number(variant.weight) || 0,
          sold: Number(variant.sold) || 0,
          dimensions: variant.dimensions ? {
            length: Number(variant.dimensions.length) || 0,
            width: Number(variant.dimensions.width) || 0,
            height: Number(variant.dimensions.height) || 0
          } : {
            length: 0,
            width: 0,
            height: 0
          },
          saleOff: {
            startDate: variant.saleOff?.startDate || '',
            endDate: variant.saleOff?.endDate || '',
            percentage: Number(variant.saleOff?.percentage) || 0
          }
        };
        
        // Log each variant for debugging
        console.log('Normalized variant:', {
          name: normalizedVariant.name,
          price: normalizedVariant.price, 
          priceType: typeof normalizedVariant.price,
          cost: normalizedVariant.cost, 
          costType: typeof normalizedVariant.cost,
          dimensions: normalizedVariant.dimensions,
          dimensionsType: typeof normalizedVariant.dimensions
        });
        
        return normalizedVariant;
      });
    },
  }));

  const handleFieldChange = (
    index: number,
    field: keyof Variant,
    value: string,
  ) => {
    const updated = [...variants];
    updated[index] = {
      ...updated[index],
      [field]:
        field === "price" ||
        field === "weight" ||
        field === "stock" ||
        field === "sold" ||
        field === "cost"
          ? Number(value)
          : value,
    };
    setVariants(updated);
    };

    const handleDimensionChange = (
      index: number,
      dimension: "length" | "width" | "height",
      value: string,
    ) => {
      const updated = [...variants];
      const currentDimensions = updated[index].dimensions || {
        length: 0,
        width: 0,
        height: 0,
      };

      updated[index] = {
        ...updated[index],
        dimensions: {
          ...currentDimensions,
          [dimension]: value ? Number(value) : 0,
        },
      };

      setVariants(updated);
    };

    const handleImageChange = (variantIndex: number, file: File) => {
      const updated = [...variants];
      const images = [...(updated[variantIndex].images || [])];

      if (images.length < 4) {
        images.push(file);
        updated[variantIndex].images = images;
        setVariants(updated);
      }
    };

    const handleSpecChange = (
      variantIndex: number,
      specKey: string,
      value: string,
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
        className="grid h-fit w-full grid-cols-2 gap-6 sm:grid-cols-1"
        title="Phân loại sản phẩm"
      >
        {validationErrors.variants && (
          <div className="col-span-full">
            <AssistiveText
              text={validationErrors.variants}
              icon={<FaInfoCircle />}
              error={true}
              className="mb-4"
            />
          </div>
        )}
        {variants.map((variant, index) => (
          <div
            key={index}
            className="relative flex w-full flex-col gap-4 rounded border bg-white p-4"
          >
            {variants.length > 1 && (
              <button
                type="button"
                className="absolute right-0 top-0 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                onClick={() => removeVariant(index)}
              >
                <FaTrash />
              </button>
            )}
            <Input
              type="text"
              label="Tên phân loại"
              value={variant.name}
              onChange={(e) => handleFieldChange(index, "name", e.target.value)}
              id="variant-name"
              name="variant-name"
            />
            <div className="flex gap-4 md:flex-col">
              <Input
                type="number"
                label="Giá bán"
                value={variant.price}
                onChange={(e) =>
                  handleFieldChange(index, "price", e.target.value)
                }
                id="variant-price"
                name="variant-price"
              />
              <Input
                type="number"
                label="Giá vốn"
                value={variant.cost}
                onChange={(e) =>
                  handleFieldChange(index, "cost", e.target.value)
                }
                id="variant-cost"
                name="variant-cost"
              />
            </div>
            <div className="flex gap-4 md:flex-col">
              <Input
                type="number"
                label="Tồn kho"
                value={variant.stock}
                onChange={(e) =>
                  handleFieldChange(index, "stock", e.target.value)
                }
                id="variant-stock"
                name="variant-stock"
              />
              <Input
                type="number"
                label="Trọng lượng (gram)"
                value={variant.weight}
                onChange={(e) =>
                  handleFieldChange(index, "weight", e.target.value)
                }
                id="variant-weight"
                name="variant-weight"
              />
            </div>
            <div className="mt-2 w-full">
              <p className="mb-2 text-sm font-medium text-grey-300">
                Kích thước (cm)
              </p>
              <div className="flex gap-4 md:flex-col">
                <Input
                  type="number"
                  label="Chiều dài"
                  value={variant.dimensions?.length || 0}
                  onChange={(e) =>
                    handleDimensionChange(index, "length", e.target.value)
                  }
                  id={`variant-length-${index}`}
                  name={`variant-length-${index}`}
                />
                <Input
                  type="number"
                  label="Chiều rộng"
                  value={variant.dimensions?.width || 0}
                  onChange={(e) =>
                    handleDimensionChange(index, "width", e.target.value)
                  }
                  id={`variant-width-${index}`}
                  name={`variant-width-${index}`}
                />
                <Input
                  type="number"
                  label="Chiều cao"
                  value={variant.dimensions?.height || 0}
                  onChange={(e) =>
                    handleDimensionChange(index, "height", e.target.value)
                  }
                  id={`variant-height-${index}`}
                  name={`variant-height-${index}`}
                />
              </div>
            </div>
            <Input
              type="text"
              label="SKU"
              value={variant.sku}
              onChange={(e) => handleFieldChange(index, "sku", e.target.value)}
              id="variant-sku"
              name="variant-sku"
            />
            <p className="mt-4 pl-1 text-sm font-medium text-grey-300">
              Ảnh sản phẩm
            </p>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, imgIdx) => {
                const image = variant.images?.[imgIdx];

                return (
                  <div
                    key={imgIdx}
                    className="relative aspect-square cursor-pointer overflow-hidden rounded border"
                    onClick={() => inputRefs.current[index]?.[imgIdx]?.click()}
                  >
                    <Image
                      src={
                        typeof image === "string"
                          ? image
                          : image instanceof File
                            ? URL.createObjectURL(image)
                            : "/no-image-placeholder.jpg"
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
                          handleImageChange(index, e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mb-2 mt-4 flex items-center justify-between gap-2 sm:flex-col sm:items-start">
              <p className="pl-1 text-sm font-medium text-grey-300">
                Thông số kỹ thuật
              </p>

              <div className="flex items-center justify-between">
                <Button
                  size="small"
                  onClick={() => {
                    const updated = [...variants];
                    const specs = { ...(updated[index].specifications || {}) };
                    specs[""] = ""; // Thêm spec rỗng
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
                  className="mb-2 flex items-center gap-2"
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
              ),
            )}
          </div>
        ))}

        <button
          type="button"
          className="flex aspect-video w-full flex-col items-center justify-center rounded border-2 border-dashed text-grey-400 hover:bg-grey-50"
          onClick={() => setVariants((prev) => [...prev, emptyVariant()])}
        >
          <FaPlus className="mb-1" />
          <span>Thêm phân loại</span>
        </button>
      </Card>
    );
  },
);

AddVariantInfo.displayName = "AddVariantInfo";

export default AddVariantInfo;
