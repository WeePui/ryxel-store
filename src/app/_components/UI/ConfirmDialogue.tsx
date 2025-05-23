import { JSX } from "react";
import Button from "./Button";

interface ConfirmDialogueProps {
  message: string | JSX.Element;
  confirmText?: string;
  cancelText?: string;
  children?: JSX.Element;
  onConfirm: () => void;
  onCancel?: () => void;
}

function ConfirmDialogue({
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogueProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-lg">{message}</p>
      {children}
      <div className="flex flex-wrap justify-center gap-6 md:gap-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
        )}

        <div className="md:order-first">
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialogue;
