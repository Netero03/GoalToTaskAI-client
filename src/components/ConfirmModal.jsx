import React from "react";

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 animate-fadeIn" onClick={onCancel}></div>

      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm animate-scaleIn">
        <h2 className="text-lg font-bold mb-2">{title || "Confirm Action"}</h2>
        <p className="text-sm text-slate-600 mb-4">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border text-slate-700 bg-slate-200 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
