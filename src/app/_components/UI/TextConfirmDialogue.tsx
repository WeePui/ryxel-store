'use client';

import { useState } from 'react';
import ConfirmDialogue from './ConfirmDialogue';
import { toast } from 'react-toastify';
import { FaCircleInfo } from 'react-icons/fa6';

interface TextConfirmDialogueProps {
  onConfirm: () => void;
  confirmText: string;
  message?: string;
  errorText?: string;
  noticeText?: string;
}

export default function TextConfirmDialogue({
  onConfirm,
  message,
  errorText,
  confirmText,
  noticeText,
}: TextConfirmDialogueProps) {
  const [input, setInput] = useState('');

  const handleConfirm = () => {
    if (input === confirmText) {
      onConfirm();
    } else {
      toast.error(errorText || 'Không chính xác');
    }
  };

  return (
    <>
      <ConfirmDialogue
        message={message || 'Nhập lại từ để xác nhận'}
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={handleConfirm}
      >
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded-md px-3 py-2 font-bold text-center text-sm focus:outline-none focus:ring-primary-500  w-full"
          />
          {noticeText ? (
            <p className="text-xs text-grey-300 flex items-center gap-2 mt-2">
              <FaCircleInfo /> {noticeText}
            </p>
          ) : null}
        </div>
      </ConfirmDialogue>
    </>
  );
}
