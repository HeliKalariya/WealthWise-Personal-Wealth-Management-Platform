import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}