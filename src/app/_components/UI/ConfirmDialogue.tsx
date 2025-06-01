import { JSX } from "react";
import Button from "./Button";
import { useSafeTranslation } from "@/app/_hooks/useSafeTranslation";

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
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogueProps) {
  const t = useSafeTranslation();
  const defaultConfirmText = t("confirmDialogue.confirm");
  const defaultCancelText = t("confirmDialogue.cancel");

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-lg">{message}</p>
      {children}
      <div className="flex flex-wrap justify-center gap-6 md:gap-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            {cancelText || defaultCancelText}
          </Button>
        )}

        <div className="md:order-first">
          <Button onClick={onConfirm}>
            {confirmText || defaultConfirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialogue;
