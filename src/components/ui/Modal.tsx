import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  size = "md",
  className = "",
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Tamanhos do modal
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Foco no modal quando aberto
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  // Render usando portal para melhor semântica
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay com animação */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal container - adicionado foco e animação */}
      <div
        ref={modalRef}
        className={`relative bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto ${sizeClasses[size]} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header com ícone personalizado */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          {title && (
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              {title}
            </h2>
          )}
          <button
            type="button"
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
