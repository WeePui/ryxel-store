"use client";

import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import { useOutsideClick } from "../../_hooks/useOutsideClick";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
  transparent?: boolean;
  closeOnOutsideClick?: boolean;
  captureClick?: boolean;
}

function Modal({
  children,
  onClose,
  showCloseButton = true,
  transparent = false,
  closeOnOutsideClick = true,
  captureClick = true,
}: ModalProps) {
  const ref = useOutsideClick<HTMLDivElement>(onClose, captureClick);
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-grey-400 bg-opacity-30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {closeOnOutsideClick ? (
          <motion.div
            className={`relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl scrollbar-hide ${
              transparent
                ? "bg-transparent-400 shadow-none"
                : "bg-white shadow-lg"
            } px-12 py-16 mx-4`}
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            {showCloseButton && (
              <motion.button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-sm border-none bg-none p-2 hover:bg-gray-100"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FaXmark />
              </motion.button>
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className={`relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl ${
              transparent
                ? "bg-transparent-400 shadow-none"
                : "bg-white shadow-lg"
            } px-12 py-16 mx-4 scrollbar-hide`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            {showCloseButton && (
              <motion.button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-sm border-none bg-none p-2 hover:bg-gray-100"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FaXmark />
              </motion.button>
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default Modal;
