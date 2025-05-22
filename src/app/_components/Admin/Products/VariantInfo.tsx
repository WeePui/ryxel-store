"use client";

import { Variant } from "@/app/_types/variant";
import Card from "../../UI/Card";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Input from "../../UI/Input";
import Image from "next/image";
import Button from "../../UI/Button";
import { mappingSpecsName } from "@/app/_utils/mappingSpecs";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import Modal from "../../UI/Modal";
import TextConfirmDialogue from "../../UI/TextConfirmDialogue";

// Helper function to format dates for input fields
const formatDateForInput = (
  dateValue: string | Date | undefined | null
): string => {
  if (!dateValue) return "";
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return ""; // Invalid date
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

interface VariantInfoProps {
  variants: Variant[];
  onSave: () => void;
}

interface VariantInfoHandle {
  getData: () => Variant[];
}

const VariantInfo = forwardRef<VariantInfoHandle, VariantInfoProps>(
  ({ variants, onSave }, ref) => {
    const [variantList, setVariantList] = useState(variants);
    useImperativeHandle(ref, () => ({
      getData() {
        return variantList;
      },
    }));

    const [currentVariant, setCurrentVariant] = useState<Variant>(variants[0]);
    const [images, setImages] = useState<(string | File)[]>(
      currentVariant.images?.slice(0, 4) || []
    );
    const [newSpecs, setNewSpecs] = useState<{ key: string; value: string }[]>(
      []
    );
    const [confirmDelete, setConfirmDelete] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const variantOptions = variants.map((variant) => ({
      value: variant._id!,
      label: variant.name,
    }));

    const handleVariantChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const selectedVariant = variants.find(
        (variant) => variant._id === e.target.value
      );
      if (selectedVariant) {
        setCurrentVariant(selectedVariant);
        setImages(selectedVariant.images?.slice(0, 4) || []);
      }
    };

    const handleImageChange = (index: number, file: File) => {
      const newImages = [...images];

      const emptyIndex = newImages.findIndex((img) => !img || img === "");

      if (emptyIndex !== -1) {
        newImages[emptyIndex] = file;
      } else if (newImages.length < 4) {
        newImages.push(file);
      } else {
        newImages[index] = file;
      }

      setImages(newImages);

      // Update the currentVariant with new images
      const updatedVariant = {
        ...currentVariant,
        images: newImages,
      };

      setVariantList((prevList) =>
        prevList.map((v) => (v._id === updatedVariant._id ? updatedVariant : v))
      );
    };

    const handleImageDelete = (index: number, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering the file input click

      // Create a compact array by removing the deleted image and shifting others up
      const filteredImages = images.filter(
        (img, i) => i !== index && img !== ""
      );

      // Create a new array of length 4, filled with remaining images followed by empty strings
      const newImages: (string | File)[] = Array(4).fill("");

      // Copy the filtered images to the beginning of the new array
      filteredImages.forEach((img, i) => {
        if (i < 4) newImages[i] = img;
      });

      setImages(newImages);

      // Update the currentVariant with the modified images
      const updatedVariant = {
        ...currentVariant,
        images: newImages,
      };

      setVariantList((prevList) =>
        prevList.map((v) => (v._id === updatedVariant._id ? updatedVariant : v))
      );
    };

    const handleFieldChange = (field: keyof Variant, value: string) => {
      const updatedVariant = { ...currentVariant, [field]: value };
      setCurrentVariant(updatedVariant);
      setVariantList((prevList) =>
        prevList.map((v) => (v._id === updatedVariant._id ? updatedVariant : v))
      );
    };

    const handleSpecificationChange = (specKey: string, value: string) => {
      const updatedSpecifications = {
        ...currentVariant.specifications,
        [specKey]: value,
      };
      const updatedVariant = {
        ...currentVariant,
        specifications: updatedSpecifications,
      };
      setCurrentVariant(updatedVariant);
      setVariantList((prevList) =>
        prevList.map((v) => (v._id === updatedVariant._id ? updatedVariant : v))
      );
    };

    const handleSpecificationKeyChange = (oldKey: string, newKey: string) => {
      const valueOfOldKey = currentVariant.specifications[oldKey];
      const updatedSpecifications = { ...currentVariant.specifications };

      delete updatedSpecifications[oldKey];
      updatedSpecifications[newKey] = valueOfOldKey;

      const updatedVariant = {
        ...currentVariant,
        specifications: updatedSpecifications,
      };

      setCurrentVariant(updatedVariant);
      setVariantList((prevList) =>
        prevList.map((v) => (v._id === updatedVariant._id ? updatedVariant : v))
      );
    };

    const handleSave = () => {
      const mergedSpecs = { ...currentVariant.specifications };
      newSpecs.forEach((spec) => {
        if (spec.key && spec.value) {
          mergedSpecs[spec.key] = spec.value;
        }
      });

      const updatedVariant = {
        ...currentVariant,
        specifications: mergedSpecs,
      };

      // Cập nhật luôn variantList trực tiếp
      setVariantList((prevList) =>
        prevList.map((v) => (v._id === updatedVariant._id ? updatedVariant : v))
      );

      // Đồng bộ currentVariant luôn (optional — cho UI cập nhật spec mới)
      setCurrentVariant(updatedVariant);

      // Clear form thêm spec
      setNewSpecs([]);

      // Gọi onSave
      onSave();
    };
    const handleChangeSaleOff = (
      field: "percentage" | "startDate" | "endDate",
      value: string
    ) => {
      // For percentage, convert to number; for dates, keep as string
      const updatedVariant = {
        ...currentVariant,
        saleOff: {
          ...currentVariant.saleOff,
          [field]: field === "percentage" ? Number(value) : value,
        },
      };
      setCurrentVariant(updatedVariant);
      setVariantList((prevList) =>
        prevList.map((v) => (v._id === updatedVariant._id ? updatedVariant : v))
      );
    };

    const handleDeleteVariant = () => {
      // Remove current variant from list
      const newVariantList = variantList.filter(
        (v) => v._id !== currentVariant._id
      );
      setVariantList(newVariantList);

      // Select first variant in the updated list
      setCurrentVariant(newVariantList[0]);
      setImages(newVariantList[0].images?.slice(0, 4) || []);

      // Close the confirmation modal
      setConfirmDelete(false);

      // Show success message
      toast.success(`Đã xoá phân loại "${currentVariant.name}"`);

      // Automatically save changes to parent component
      onSave();
    };

    const handleReset = () => {
      const originalVariant =
        variants.find((v) => v._id === currentVariant._id) || variants[0];
      setCurrentVariant(originalVariant);
      setImages(originalVariant.images?.slice(0, 4) || []);
      setNewSpecs([]);
    };

    const removeNewSpec = (index: number) => {
      setNewSpecs((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <Card
        title="Thông tin phân loại"
        className="w-full grid grid-cols-4 xl:grid-cols-3 gap-4 h-fit"
        titleAction={
          <div className="flex items-center gap-2">
            <Input
              type="select"
              options={variantOptions}
              id="currentVariant"
              name="currentVariant"
              label="Phân loại đang chọn"
              defaultValue={currentVariant._id}
              onChange={(e) =>
                handleVariantChange(e as React.ChangeEvent<HTMLSelectElement>)
              }
              variant="small"
            />
            {variantList.length > 1 && (
              <Button
                size="small"
                type="danger"
                className="whitespace-nowrap"
                onClick={() => {
                  if (variantList.length <= 1) {
                    toast.error("Sản phẩm phải có ít nhất một phân loại");
                    return;
                  }

                  setConfirmDelete(true);
                }}
              >
                Xoá phân loại
              </Button>
            )}
          </div>
        }
      >
        <Input
          type="text"
          name="name"
          id="name"
          value={currentVariant.name}
          label="Tên phân loại"
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        <Input
          type="text"
          name="sku"
          id="sku"
          value={currentVariant.sku}
          label="SKU"
          className="col-span-2"
          onChange={(e) => handleFieldChange("sku", e.target.value)}
        />
        <Input
          type="text"
          name="price"
          id="price"
          value={currentVariant.price + ""}
          label="Giá bán"
          onChange={(e) => handleFieldChange("price", e.target.value)}
        />
        <Input
          type="text"
          name="cost"
          id="cost"
          value={currentVariant.cost + ""}
          label="Giá vốn"
          onChange={(e) => handleFieldChange("cost", e.target.value)}
        />
        <Input
          type="text"
          name="weight"
          id="weight"
          value={currentVariant.weight + ""}
          label="Trọng lượng"
          onChange={(e) => handleFieldChange("weight", e.target.value)}
        />
        <Input
          type="text"
          name="stock"
          id="stock"
          value={currentVariant.stock + ""}
          label="Tồn kho"
          onChange={(e) => handleFieldChange("stock", e.target.value)}
        />
        <Input
          type="text"
          name="sold"
          id="sold"
          value={currentVariant.sold + ""}
          label="Đã bán"
          onChange={(e) => handleFieldChange("sold", e.target.value)}
        />
        <div className="flex gap-4 col-span-full xl:flex-col lg:flex-row md:flex-col">
          <Input
            type="text"
            name="saleOffPercentage"
            id="saleOffPercentage"
            value={currentVariant.saleOff?.percentage + ""}
            onChange={(e) => handleChangeSaleOff("percentage", e.target.value)}
            label="Giảm giá (%)"
          />{" "}
          <Input
            type="date"
            name="saleOffStartDate"
            id="saleOffStartDate"
            value={formatDateForInput(currentVariant.saleOff?.startDate)}
            onChange={(e) => handleChangeSaleOff("startDate", e.target.value)}
            label="Ngày bắt đầu giảm giá"
          />
          <Input
            type="date"
            name="saleOffEndDate"
            id="saleOffEndDate"
            value={formatDateForInput(currentVariant.saleOff?.endDate)}
            onChange={(e) => handleChangeSaleOff("endDate", e.target.value)}
            label="Ngày kết thúc giảm giá"
          />
        </div>
        <div className="col-span-full flex justify-between items-center mt-4">
          <p className="font-medium text-sm text-grey-300 pl-2">
            Thông số kỹ thuật
          </p>
          <Button
            size="small"
            onClick={() =>
              setNewSpecs((prev) => [...prev, { key: "", value: "" }])
            }
          >
            Thêm thông số
          </Button>
        </div>
        <div className="col-span-full flex flex-col gap-4">
          {Object.entries(currentVariant.specifications).map(
            ([key, value], index) => {
              return (
                <div className="flex gap-2 items-center w-full" key={key}>
                  <div className="flex flex-1 gap-2 md:flex-col xl:flex-col lg:flex-row md:relative md:mb-2">
                    <Input
                      type="select"
                      name={`spec-key-${index}`}
                      id={`spec-key-${index}`}
                      value={key}
                      label={`Thông số ${index + 1}`}
                      options={Object.entries(mappingSpecsName).map(
                        ([specKey, specName]) => ({
                          value: specKey,
                          label: specName,
                          disabled:
                            specKey !== key &&
                            Object.keys(currentVariant.specifications).includes(
                              specKey
                            ),
                        })
                      )}
                      className="w-1/3"
                      onChange={(e) =>
                        handleSpecificationKeyChange(key, e.target.value)
                      }
                    />
                    <Input
                      type="text"
                      name={`spec-value-${index}`}
                      id={`spec-value-${index}`}
                      value={value}
                      label={`Mô tả ${index + 1}`}
                      className="w-2/3"
                      onChange={(e) =>
                        handleSpecificationChange(key, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="self-center w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-xs shrink-0 md:absolute md:top-0 md:right-0 md:w-6 md:h-6 md:translate-x-1/2 md:-translate-y-1/2"
                      onClick={() => {
                        const updatedSpecs = {
                          ...currentVariant.specifications,
                        };
                        delete updatedSpecs[key];
                        const updatedVariant = {
                          ...currentVariant,
                          specifications: updatedSpecs,
                        };
                        setCurrentVariant(updatedVariant);
                        setVariantList((prevList) =>
                          prevList.map((v) =>
                            v._id === updatedVariant._id ? updatedVariant : v
                          )
                        );
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            }
          )}

          {newSpecs.map((spec, index) => {
            const specIndex =
              Object.keys(currentVariant.specifications).length + index;
            const usedKeys = [
              ...Object.keys(currentVariant.specifications),
              ...newSpecs.map((s) => s.key),
            ];

            return (
              <div className="flex gap-2 items-center w-full" key={index}>
                <div className="flex flex-1 gap-2">
                  <Input
                    type="select"
                    name={`new-spec-key-${index}`}
                    id={`new-spec-key-${index}`}
                    value={spec.key}
                    label={`Thông số ${specIndex + 1}`}
                    options={Object.entries(mappingSpecsName).map(
                      ([specKey, specName]) => ({
                        value: specKey,
                        label: specName,
                        disabled:
                          usedKeys.includes(specKey) && specKey !== spec.key,
                      })
                    )}
                    className="w-1/3"
                    onChange={(e) => {
                      const updated = [...newSpecs];
                      updated[index].key = e.target.value;
                      setNewSpecs(updated);
                    }}
                  />
                  <Input
                    type="text"
                    name={`new-spec-value-${index}`}
                    id={`new-spec-value-${index}`}
                    value={spec.value}
                    label={`Mô tả ${specIndex + 1}`}
                    className="w-2/3"
                    onChange={(e) => {
                      const updated = [...newSpecs];
                      updated[index].value = e.target.value;
                      setNewSpecs(updated);
                    }}
                  />
                  <button
                    type="button"
                    className="self-center w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-xs shrink-0"
                    onClick={() => removeNewSpec(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p className="col-span-full font-medium text-sm text-grey-300 pl-2">
          Ảnh sản phẩm
        </p>
        <div className="grid grid-cols-4 gap-4 col-span-full">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer border rounded"
              onClick={() => inputRefs.current[index]?.click()}
            >
              <Image
                src={
                  typeof images[index] === "string" && images[index]
                    ? (images[index] as string)
                    : images[index] instanceof File
                    ? URL.createObjectURL(images[index])
                    : "/no-image-placeholder.jpg rounded"
                }
                alt={`Ảnh ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* Delete button overlay - only show if there's an image */}
              {images[index] && images[index] !== "" && (
                <div
                  className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 z-10"
                  onClick={(e) => handleImageDelete(index, e)}
                >
                  <FaTrash size={12} />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageChange(index, e.target.files[0]);
                  }
                }}
              />
            </div>
          ))}
        </div>

        <div className="col-span-full flex items-center justify-end gap-4">
          <Button
            size="small"
            type="secondary"
            onClick={handleReset}
            className=" w-fit"
          >
            Đặt lại
          </Button>
          <Button size="small" onClick={handleSave} className=" w-fit">
            Lưu thay đổi
          </Button>
        </div>

        {confirmDelete && (
          <Modal onClose={() => setConfirmDelete(false)}>
            <TextConfirmDialogue
              onConfirm={handleDeleteVariant}
              confirmText={currentVariant.sku}
              message={`Nhập mã SKU của phân loại để xác nhận xoá`}
              noticeText="Bạn phải lưu thay đổi để áp dụng"
              errorText="Phân loại không chính xác"
            />
          </Modal>
        )}
      </Card>
    );
  }
);

VariantInfo.displayName = "VariantInfo";

export default VariantInfo;
