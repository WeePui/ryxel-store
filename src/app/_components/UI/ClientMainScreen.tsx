'use client';

import { useState } from 'react';
import Modal from './Modal';
import Chatbox from './Chatbox';
import { FaHeadset } from 'react-icons/fa6';
import Button from './Button';

interface ChatboxProps {
  children: React.ReactNode;
  authToken: string;
}

export default function ClientMainScreen({
  children,
  authToken,
}: ChatboxProps) {
  const [openChatbox, setOpenChatbox] = useState(false);

  return (
    <div className="flex w-full flex-col items-center">
      {children}
      <div className="fixed bottom-0 right-0 m-4 z-50">
        <Button
          size="small"
          onClick={() => setOpenChatbox(true)}
          className="!rounded-full"
        >
          <FaHeadset className="text-lg" /> Hỗ trợ
        </Button>
        {openChatbox && (
          <Modal onClose={() => setOpenChatbox(false)}>
            <Chatbox authToken={authToken} />
          </Modal>
        )}
      </div>
    </div>
  );
}
