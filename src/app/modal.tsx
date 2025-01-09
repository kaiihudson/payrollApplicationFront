import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
      onClick={onClose} // Cerrar el modal al hacer clic fuera
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative transform transition-transform duration-300 ease-out scale-95"
        onClick={(e) => e.stopPropagation()} // Prevenir cierre al hacer clic dentro del modal
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;