'use client';

import { FaPlus } from 'react-icons/fa6';
import Button from '@components/UI/Button';
import Modal from '@components/UI/Modal';
import { useState } from 'react';
import FormAddAddress from '@components/Address/FormAddAddress';

function AddAddress() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        <FaPlus />
        Địa chỉ mới
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
