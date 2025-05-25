"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  createDiscountAction,
  deleteDiscountAction,
  updateDiscountAction,
} from "@/app/_libs/actions";
import TextConfirmDialogue from "../../UI/TextConfirmDialogue";
import Modal from "../../UI/Modal";

interface Discount {
  _id?: string;
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  maxUse: number;
  minOrderValue: number;
  discountPercentage: number;
  discountMaxValue: number;
  maxUsePerUser: number;
  isActive: boolean;
  usedUser?: string[];
}

interface AddVoucherFormProps {
  discount?: Discount;
}

const initialState = {
  success: undefined,
  input: {
    code: "",
    name: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    maxUse: 100,
    minOrderValue: 0,
    discountPercentage: 10,
    discountMaxValue: 100000,
    maxUsePerUser: 1,
    isActive: true,
  },
};

export default function AddVoucherForm({ discount }: AddVoucherFormProps) {
  const [state, action, isPending] = useActionState(
    discount ? updateDiscountAction : createDiscountAction,
    discount ? { success: undefined, input: { ...discount } } : initialState,
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (state?.errors?.message) {
      toast.error(state.errors.message);
    }
  }, [state?.errors?.message]);

  const handleDelete = () => {
    if (discount?._id) {
      startTransition(async () => {
        const result = await deleteDiscountAction(discount._id!);

        if (result.success) {
          toast.success("Xóa mã giảm giá thành công");
          setConfirmOpen(false);
          router.refresh();
        } else {
          toast.error(result.errors!.message);
        }
      });
    }
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(
        discount
          ? "Cập nhật mã giảm giá thành công"
          : "Tạo mã giảm giá thành công",
      );
      router.push("/admin/vouchers");
    }
  }, [state?.success, router, discount]);

  return (
    <form className="mt-4 grid grid-cols-2 gap-6" action={action}>
      {discount?._id && <input type="hidden" name="id" value={discount._id} />}
      <Input
        label="Mã giảm giá"
        defaultValue={state?.input.code}
        id="code"
        name="code"
        type="text"
        error={!!state?.errors?.code}
        disabled={isPending || !!discount}
        errorMessage={state?.errors?.code}
        className="md:col-span-full"
      />
      <Input
        label="Tên mô tả"
        defaultValue={state?.input.name}
        id="name"
        name="name"
        type="text"
        error={!!state?.errors?.name}
        disabled={isPending}
        className="md:col-span-full"
      />
      <Input
        label="Ngày bắt đầu"
        defaultValue={
          new Date(state?.input.startDate).toISOString().split("T")[0]
        }
        id="startDate"
        name="startDate"
        type="date"
        error={!!state?.errors?.startDate}
        disabled={isPending}
        className="md:col-span-full"
      />
      <Input
        label="Ngày kết thúc"
        defaultValue={
          new Date(state?.input.endDate).toISOString().split("T")[0]
        }
        id="endDate"
        name="endDate"
        type="date"
        error={!!state?.errors?.endDate}
        errorMessage={state?.errors?.endDate}
        disabled={isPending}
        className="md:col-span-full"
      />
      <Input
        type="number"
        label="Phần trăm giảm giá (%)"
        defaultValue={state?.input.discountPercentage?.toString()}
        id="discountPercentage"
        name="discountPercentage"
        error={!!state?.errors?.discountPercentage}
        errorMessage={state?.errors?.discountPercentage}
        disabled={isPending}
      />
      <Input
        type="number"
        label="Giảm giá tối đa (VND)"
        defaultValue={state?.input.discountMaxValue?.toString()}
        id="discountMaxValue"
        name="discountMaxValue"
        error={!!state?.errors?.discountMaxValue}
        errorMessage={state?.errors?.discountMaxValue}
        disabled={isPending}
      />
      <Input
        type="number"
        label="Giá trị đơn hàng tối thiểu (VND)"
        defaultValue={state?.input.minOrderValue?.toString()}
        id="minOrderValue"
        name="minOrderValue"
        error={!!state?.errors?.minOrderValue}
        errorMessage={state?.errors?.minOrderValue}
        disabled={isPending}
      />{" "}
      <Input
        type="number"
        label="Số lượt sử dụng tối đa"
        defaultValue={state?.input.maxUse?.toString()}
        id="maxUse"
        name="maxUse"
        error={!!state?.errors?.maxUse}
        errorMessage={state?.errors?.maxUse}
        disabled={isPending}
      />
      <Input
        label="Lượt sử dụng tối đa/người dùng"
        defaultValue={state?.input.maxUsePerUser?.toString()}
        id="maxUsePerUser"
        name="maxUsePerUser"
        type="text"
        error={!!state?.errors?.maxUsePerUser}
        errorMessage={state?.errors?.maxUsePerUser}
        disabled={isPending}
      />
      <div className="col-span-1">
        <Input
          label="Kích hoạt mã giảm giá"
          defaultChecked={state?.input.isActive}
          id="isActive"
          name="isActive"
          type="checkbox"
          disabled={isPending}
        />
      </div>
      <div className="col-span-2 flex items-center justify-end gap-4">
        {discount ? (
          <Button
            role="button"
            onClick={() => setConfirmOpen(true)}
            loading={pending}
            variant="danger"
          >
            Xóa
          </Button>
        ) : null}

        <Button loading={isPending} role="submit">
          {discount ? "Cập nhật" : "Thêm mới"}
        </Button>
      </div>
      {confirmOpen && (
        <Modal
          onClose={() => setConfirmOpen(false)}
          closeOnOutsideClick={false}
        >
          <TextConfirmDialogue
            confirmText={discount!.code}
            onConfirm={handleDelete}
            message="Nhập lại mã giảm giá để xác nhận xóa"
            errorText="Mã giảm giá không chính xác"
          />
        </Modal>
      )}
    </form>
  );
}
