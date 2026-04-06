// components/ConfirmModal.jsx
"use client";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white !p-6 rounded-xl shadow-xl max-w-sm w-full !mx-4">
        <h3 className="text-lg font-bold text-gray-900">{title || "Are you sure?"}</h3>
        <p className="text-sm text-gray-500 mt-2">
          {message || "This action cannot be undone."}
        </p>
        
        <div className="flex justify-end gap-3 !mt-6">
          <button
            onClick={onClose}
            className="!px-4 !py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="!px-4 !py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}