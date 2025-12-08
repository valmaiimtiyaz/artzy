import React from "react";
import { MessageCircleX, AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Artwork?",
  message = "This artwork will be permanently deleted. Are you sure?",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white/85 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <MessageCircleX className="w-7 h-7" />
        </button>

        <div className="pt-10 pb-8 px-8 text-center">
          {/* Icon warning pink */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-200 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          {/* Teks */}
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
        </div>

        <div className="flex border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 py-4 text-gray-600 font-semibold hover:bg-gray-300 transition rounded-bl-2xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-4 bg-red-600 text-white font-semibold hover:bg-red-700 transition rounded-br-2xl cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
