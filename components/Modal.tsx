"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => {
        if (closeOnOutsideClick) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
