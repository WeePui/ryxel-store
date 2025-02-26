import Button from './Button';

interface ConfirmDialogueProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialogue({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogueProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-lg">{message}</p>
      <div className="flex gap-6">
        <Button type="secondary" onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button onClick={onConfirm}>Xác nhận</Button>
      </div>
    </div>
  );
}

export default ConfirmDialogue;
