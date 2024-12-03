import Button from './Button';

function ConfirmDialogue({ message, onConfirm, onCancel }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-lg">{message}</p>
      <div className="flex gap-6">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  );
}

export default ConfirmDialogue;
