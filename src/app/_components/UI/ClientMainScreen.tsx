"use client";

import { useState } from "react";
import Modal from "./Modal";
import Chatbox from "./Chatbox";
import { FaHeadset } from "react-icons/fa6";
import Button from "./Button";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { useFcmTokenRegistration } from "@/app/_hooks/useFcmTokenRegistration";

interface ChatboxProps {
  children: React.ReactNode;
  authToken?: string;
}

export default function ClientMainScreen({
  children,
  authToken,
}: ChatboxProps) {
  const [openChatbox, setOpenChatbox] = useState(false);
  const { language } = useLanguage();

  // Register FCM token for authenticated users
  useFcmTokenRegistration(authToken);

  const buttonText = language === "vi" ? "Hỗ trợ" : "Support";

  return (
    <div className="flex w-full flex-col items-center">
      {children}
      <div className="fixed bottom-0 right-0 z-50 m-4">
        <Button
          size="small"
          onClick={() => setOpenChatbox(true)}
          rounded="pill"
          icon={<FaHeadset className="text-lg" />}
        >
          {buttonText}
        </Button>
        {openChatbox && (
          <Modal onClose={() => setOpenChatbox(false)}>
            <Chatbox />
          </Modal>
        )}
      </div>
    </div>
  );
}
