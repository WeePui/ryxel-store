"use client";

import { FaPlus } from "react-icons/fa6";
import Button from "@components/UI/Button";
import Modal from "@components/UI/Modal";
import { useState } from "react";
import FormAddAddress from "@components/Address/FormAddAddress";
import { useLanguage } from "@/app/_contexts/LanguageContext";

function AddAddress() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} size="small" icon={<FaPlus />}>
        {language === "vi" ? "Thêm địa chỉ" : "Add Address"}
      </Button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <FormAddAddress onSubmit={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddAddress;
