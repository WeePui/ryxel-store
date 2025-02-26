'use client';

import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { useOutsideClick } from '../../_hooks/useOutsideClick';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
  transparent?: boolean;
  closeOnOutsideClick?: boolean;
}

function Modal({
  children,
  onClose,
  showCloseButton = true,
  transparent = false,
  closeOnOutsideClick = true,
}: ModalProps) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  return createPortal(
    <div className="fixed left-0 top-0 z-[100] h-screen w-full bg-grey-400 bg-opacity-30 backdrop-blur-sm transition-all duration-500">
      {closeOnOutsideClick ? (
        <div
          className={`fixed left-1/2 top-1/2 max-h-[90vh] max-w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl ${
            transparent
              ? 'bg-transparent-400 shadow-none'
              : 'bg-white shadow-lg'
          } px-12 py-16 transition-all duration-500`}
          ref={ref}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute right-8 top-5 translate-x-3 rounded-sm border-none bg-none p-2 transition-all duration-500"
            >
              <FaXmark />
            </button>
          )}
          <div>{children}</div>
        </div>
      ) : (
        <div
          className={`fixed left-1/2 top-1/2 max-h-[90vh] max-w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl ${
            transparent ? 'bg-tranparent-400 shadow-none' : 'bg-white shadow-lg'
          } px-12 py-16 transition-all duration-500`}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute right-8 top-5 translate-x-3 rounded-sm border-none bg-none p-2 transition-all duration-500"
            >
              <FaXmark />
            </button>
          )}
          <div>{children}</div>
        </div>
      )}
    </div>,
    document.body
  );
}

export default Modal;
