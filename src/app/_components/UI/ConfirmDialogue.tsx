import { JSX } from 'react';
import Button from './Button';

interface ConfirmDialogueProps {
  message: string | JSX.Element;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

function ConfirmDialogue({
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  onConfirm,
  onCancel,
}: ConfirmDialogueProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-lg">{message}</p>
      <div className="flex gap-6">
        {onCancel && (
          <Button type="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
        )}

        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </div>
  );
}

export default ConfirmDialogue;
